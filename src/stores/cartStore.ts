import { create } from 'zustand';
import { Cart, CartItem, Product } from '../types/index';

interface CartStore extends Cart {
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalPrice: 0,

  addItem: (product, quantity) => set((state) => {
    const existingItem = state.items.find(
      (item) => item.productId === product.id
    );

    let updatedItems: CartItem[];
    if (existingItem) {
      updatedItems = state.items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [
        ...state.items,
        { productId: product.id, quantity, price: product.price },
      ];
    }

    const newTotalPrice = updatedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return { items: updatedItems, totalPrice: newTotalPrice };
  }),

  removeItem: (productId) => set((state) => {
    const updatedItems = state.items.filter(
      (item) => item.productId !== productId
    );
    const newTotalPrice = updatedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return { items: updatedItems, totalPrice: newTotalPrice };
  }),

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      return get().removeItem(productId);
    }
    
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      const newTotalPrice = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { items: updatedItems, totalPrice: newTotalPrice };
    });
  },

  clearCart: () => set({ items: [], totalPrice: 0 }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
