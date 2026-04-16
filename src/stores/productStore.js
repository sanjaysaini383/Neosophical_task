import { create } from 'zustand';
const defaultFilters = {
    categories: [],
    priceRange: [0, 10000],
    inStockOnly: false,
    sortBy: 'newest',
};
export const useProductStore = create((set, get) => ({
    products: [],
    filteredProducts: [],
    filters: defaultFilters,
    setProducts: (products) => {
        set({ products });
        get().applyFilters();
    },
    setFilters: (newFilters) => {
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        }));
        get().applyFilters();
    },
    applyFilters: () => {
        const { products, filters } = get();
        let filtered = [...products];
        // Filter by category
        if (filters.categories.length > 0) {
            filtered = filtered.filter((p) => filters.categories.includes(p.category));
        }
        // Filter by price range
        filtered = filtered.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
        // Filter by stock
        if (filters.inStockOnly) {
            filtered = filtered.filter((p) => p.inStock);
        }
        // Sort
        switch (filters.sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
            default:
                // Already in order
                break;
        }
        set({ filteredProducts: filtered });
    },
    getProductById: (id) => {
        return get().products.find((p) => p.id === id);
    },
    searchProducts: (searchTerm) => {
        const { products } = get();
        if (!searchTerm.trim())
            return products;
        const term = searchTerm.toLowerCase();
        return products.filter((p) => p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term));
    },
}));
