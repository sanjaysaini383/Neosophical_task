# API Integration Guide

This guide explains how to replace mock data with real API calls.

## 📡 API Service Structure

Create `/src/services/api.ts` for API calls:

```typescript
import { Product, Order, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Product APIs
export const productAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getById: async (id: string): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found');
    return response.json();
  },

  search: async (query: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${query}`);
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },
};

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  },

  signup: async (userData: Omit<User, 'id' | 'createdAt'>): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Signup failed');
    return response.json();
  },

  verifyOTP: async (email: string, code: string): Promise<{ verified: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    if (!response.ok) throw new Error('OTP verification failed');
    return response.json();
  },
};

// Order APIs
export const orderAPI = {
  create: async (orderData: any, token: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Order creation failed');
    return response.json();
  },

  getById: async (orderId: string, token: string): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Order not found');
    return response.json();
  },

  getAll: async (token: string): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },
};
```

## 🔗 Update Stores to Use API

### Example: Update ProductStore

**Before (Mock Data):**
```typescript
useEffect(() => {
  setProducts(mockProducts);
}, []);
```

**After (Real API):**
```typescript
import { productAPI } from '../services/api';

useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Handle error (show error state)
    }
  };

  loadProducts();
}, []);
```

### Example: Update AuthStore

**Before (Mock):**
```typescript
const setUser = (user) => set({ user, isAuthenticated: true });
```

**After (Real API):**
```typescript
const login = async (email: string, password: string) => {
  try {
    const { user, token } = await authAPI.login(email, password);
    set({ user, token, isAuthenticated: true });
    localStorage.setItem('authToken', token);
  } catch (error) {
    throw new Error('Login failed');
  }
};
```

## 🔐 Authentication Header Handling

Create `/src/services/http.ts`:

```typescript
export const createAuthHeader = (token: string | null) => {
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const setStoredToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

export const clearStoredToken = () => {
  localStorage.removeItem('authToken');
};
```

## 🌐 Environment Variables

Create `.env.local`:

```env
# Development
VITE_API_URL=http://localhost:3000/api

# Staging
# VITE_API_URL=https://staging-api.example.com

# Production
# VITE_API_URL=https://api.example.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📝 Error Handling

Create `/src/services/errorHandler.ts`:

```typescript
export class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleAPIError = (error: any) => {
  if (error instanceof APIError) {
    // Handle specific API errors
    if (error.statusCode === 401) {
      // Unauthorized - redirect to login
      window.location.href = '/login';
    } else if (error.statusCode === 403) {
      // Forbidden - show permission error
      console.error('You do not have permission');
    }
  }
  throw error;
};
```

## 🔄 Retry Logic

Add to API service:

```typescript
const retryFetch = async (
  url: string,
  options: RequestInit = {},
  retries = 3
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      
      // Don't retry on 4xx errors
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait before retrying
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
};
```

## 🔄 Request/Response Interceptors

Create middleware for API calls:

```typescript
const createFetch = (baseURL: string) => {
  return async (url: string, options: RequestInit = {}) => {
    const token = getStoredToken();
    const headers = {
      'Content-Type': 'application/json',
      ...createAuthHeader(token),
      ...(options.headers || {}),
    };

    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized
        clearStoredToken();
        window.location.href = '/login';
      }
      throw new APIError(
        response.status,
        response.statusText,
        await response.json()
      );
    }

    return response.json();
  };
};

export const api = createFetch(API_BASE_URL);
```

## 📊 API Response Types

Define types for consistency:

```typescript
// /src/types/api.ts

export interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ErrorResponse {
  status: 'error';
  message: string;
  code: string;
  details?: Record<string, any>;
}
```

## ✅ Integration Checklist

When switching to real API:

1. **Create API service file** `/src/services/api.ts`
2. **Update environment variables** in `.env`
3. **Update stores** to use API instead of mock data
4. **Add error handling** for API failures
5. **Add loading states** in components
6. **Test authentication flow** end-to-end
7. **Test error scenarios** (timeouts, 404s, 500s)
8. **Add retry logic** for failed requests
9. **Implement caching** if needed
10. **Monitor in production** with analytics

## 🧪 Testing API Calls

Example test with mock API:

```typescript
// /src/__tests__/api.test.ts
import { productAPI } from '../services/api';

describe('Product API', () => {
  it('fetches products', async () => {
    const products = await productAPI.getAll();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
  });

  it('handles API errors', async () => {
    try {
      await productAPI.getById('invalid-id');
      fail('Should have thrown');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
```

## 🚀 Backend Example (Node.js/Express)

Quick backend to test against:

```typescript
// server.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mock products
const products = [
  { id: '1', name: 'Apple', price: 5.99, category: 'fruits' },
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({
      user: { id: '1', name: 'John', email },
      token: 'mock-token-123',
    });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

app.listen(3000, () => console.log('Server running on :3000'));
```

## 📚 Resources

- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [REST Best Practices](https://restfulapi.net/)
- [GraphQL Alternative](https://graphql.org/)

---

Your app is now ready to connect to a real backend! 🚀
