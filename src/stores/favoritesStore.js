import { create } from 'zustand';
export const useFavoritesStore = create((set, get) => ({
    favorites: [],
    addFavorite: (productId) => set((state) => ({
        favorites: Array.from(new Set([...state.favorites, productId])),
    })),
    removeFavorite: (productId) => set((state) => ({
        favorites: state.favorites.filter((id) => id !== productId),
    })),
    isFavorite: (productId) => get().favorites.includes(productId),
    getFavorites: () => get().favorites,
}));
