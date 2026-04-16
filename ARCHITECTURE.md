# Architecture & Code Style Guide

This document outlines the architecture, code organization, and style conventions used in the Nectar application.

## 📐 Architecture Overview

### Layered Architecture

```
Presentation Layer (UI Components)
           ↓
State Management Layer (Zustand Stores)
           ↓
Data Layer (Mock Data & Utils)
           ↓
Type Layer (TypeScript Interfaces)
```

## 🗂️ Directory Structure Explained

### `/src/components/`
Reusable UI components following atomic design principles:
- **Button.tsx** - Configurable button with variants
- **Input.tsx** - Form input with validation
- **Card.tsx** - Container component
- **ProductCard.tsx** - Product display component
- **Header.tsx** - App header/navigation
- **BottomNavigation.tsx** - Mobile bottom nav
- **UI.tsx** - Skeleton loaders, empty states, badges

### `/src/screens/`
Page-level components organized by feature:
- **auth/** - Authentication flow screens
- **app/** - Main application screens

### `/src/stores/`
Zustand store definitions for global state:
- **authStore.ts** - User auth state (login/logout)
- **cartStore.ts** - Shopping cart state
- **favoritesStore.ts** - Favorites list
- **productStore.ts** - Products and filters
- **locationStore.ts** - Delivery locations

### `/src/types/`
TypeScript type definitions:
- Interfaces for data models
- Enums for constants
- Type safety throughout the app

### `/src/utils/`
Utility functions:
- Date and currency formatting
- Debouncing
- Validation helpers
- API simulation

### `/src/data/`
Mock data for development:
- Mock products with realistic data
- Mock locations
- Replaceable with real API calls

## 🎨 Code Style & Conventions

### Component Structure

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { useAuthStore } from '../../stores/authStore';

interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export const MyComponent: React.FC<ComponentProps> = ({ prop1, prop2 = 0 }) => {
  // Hooks first
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [state, setState] = React.useState<Type>(initialValue);

  // Handlers
  const handleEvent = () => {
    // Implementation
  };

  // Effects
  React.useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### TypeScript Rules

1. **No `any` types** - Always use proper types
```typescript
// ❌ Bad
const data: any = fetchData();

// ✅ Good
const data: Product[] = fetchProducts();
```

2. **Use Interfaces** - For object types
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}
```

3. **Use Enums** - For constants
```typescript
enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}
```

4. **Generic Types** - For reusable components
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
```

### Tailwind CSS Class Organization

```typescript
// 1. Layout/Display
className="flex items-center justify-between"

// 2. Spacing
className="p-4 mb-3 space-y-2"

// 3. Sizing
className="w-full h-64"

// 4. Colors
className="bg-primary-600 text-white"

// 5. Borders/Radius
className="border border-gray-200 rounded-lg"

// 6. States
className="hover:bg-primary-700 disabled:cursor-not-allowed"

// 7. Responsive
className="md:grid-cols-4 lg:grid-cols-5"
```

### File Naming Conventions

```
✅ Correct:
- Components: PascalCase (Button.tsx)
- Utilities: camelCase (helpers.ts)
- Stores: camelCase (cartStore.ts)
- Types: lowercase with Index (index.ts)
- Screens: PascalCase (HomeScreen.tsx)

❌ Incorrect:
- button.tsx (component should be uppercase)
- GetHelper.ts (utility should be camelCase)
- CartStore.ts (store should be camelCase)
```

## 🔄 Data Flow

### User Authentication Flow

```
LoginScreen
    ↓
[Submit credentials]
    ↓
useAuthStore.setUser()
    ↓
Navigate to /home
    ↓
HomeScreen fetches products via useProductStore
```

### Cart Management Flow

```
ProductCard (addButton click)
    ↓
useCartStore.addItem(product, quantity)
    ↓
cartStore.items updated
    ↓
CartScreen re-renders with new items
```

### State Persistence (Optional Enhancement)

To add localStorage persistence, update stores:

```typescript
// Example: In cartStore.ts
const useCartStore = create<CartStore>(
  persist(
    (set) => ({
      // ... store logic
    }),
    { name: 'cart-storage' }
  )
);
```

## 🧪 Testing Strategy

### Component Testing Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## 🚀 Performance Optimization

### Code Splitting (Future)
```typescript
const HomeScreen = React.lazy(() => import('./HomeScreen'));
```

### Memoization
```typescript
import { memo } from 'react';

export const ProductCard = memo(({ product }) => {
  return (/* ... */);
});
```

### useCallback for Event Handlers
```typescript
const handleSearch = useCallback((term: string) => {
  // Search logic
}, [dependencies]);
```

## 📝 Git Commit Message Format

```
<type>: <description>

<body (optional)>
<footer (optional)>

Type: feat, fix, refactor, style, test, docs, chore
Example:
  feat: add product filtering by category
  fix: cart total price calculation bug
  refactor: optimize ProductCard component
```

## 🔐 Security Best Practices

1. **Never commit secrets:**
```typescript
// ❌ Bad
const API_KEY = 'secret-key-123';

// ✅ Good
const API_KEY = import.meta.env.VITE_API_KEY;
```

2. **Validate input on frontend:**
```typescript
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

3. **Handle errors gracefully:**
```typescript
try {
  await fetchData();
} catch (error) {
  setError('Failed to load data');
  logError(error);
}
```

## 🎯 Best Practices Checklist

- [ ] TypeScript strict mode enabled
- [ ] No unused variables or imports
- [ ] Proper error handling
- [ ] Loading states for async operations
- [ ] Responsive design tested
- [ ] Keyboard navigation working
- [ ] Images optimized
- [ ] Comments for complex logic
- [ ] Consistent naming conventions
- [ ] Proper component composition

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [React Router Docs](https://reactrouter.com)

---

Remember: **Code is read more often than it's written. Write for clarity and maintainability.**
