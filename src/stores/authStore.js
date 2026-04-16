import { create } from 'zustand';
export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    token: null,
    setUser: (user) => set({ user, isAuthenticated: true }),
    setToken: (token) => set({ token }),
    logout: () => set({ user: null, token: null, isAuthenticated: false }),
    setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
