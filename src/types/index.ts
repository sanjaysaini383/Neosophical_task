// Product and Category Types
export enum ProductCategory {
  VEGETABLES = 'vegetables',
  FRUITS = 'fruits',
  MEAT = 'meat',
  FISH = 'fish',
  BAKERY = 'bakery',
  BEVERAGES = 'beverages',
  DAIRY = 'dairy',
  GRAINS = 'grains',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  unit: string; // 'kg', 'piece', 'dozen', etc.
  inStock: boolean;
  discount?: number; // percentage
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  deliveryLocation: Location;
  totalPrice: number;
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery?: Date;
  trackingUrl?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface Filters {
  categories: ProductCategory[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
