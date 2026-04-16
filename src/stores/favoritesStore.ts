import { create } from 'zustand';

interface FavoritesStore {
  favorites: string[]; // product IDs
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getFavorites: () => string[];
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  addFavorite: (productId) =>
    set((state) => ({
      favorites: Array.from(new Set([...state.favorites, productId])),
    })),

  removeFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== productId),
    })),

  isFavorite: (productId) => get().favorites.includes(productId),

  getFavorites: () => get().favorites,
}));
