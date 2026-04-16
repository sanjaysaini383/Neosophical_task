import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, ProductCard, EmptyState } from '../../components';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { ProductCategory } from '../../types/index';
import { debounce } from '../../utils/helpers';
export const SearchScreen = () => {
    const navigate = useNavigate();
    const { products, setFilters, filters } = useProductStore();
    const { addItem } = useCartStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    // Debounced search
    const handleSearch = useCallback(debounce((term) => {
        if (!term.trim()) {
            setFilteredProducts(products);
            return;
        }
        const term_lower = term.toLowerCase();
        const results = products.filter((p) => p.name.toLowerCase().includes(term_lower) ||
            p.description.toLowerCase().includes(term_lower));
        setFilteredProducts(results);
    }, 300), [products]);
    const handleSearchChange = (value) => {
        setSearchTerm(value);
        handleSearch(value);
    };
    const handleCategoryToggle = (category) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];
        setFilters({ categories: newCategories });
    };
    const handlePriceChange = (min, max) => {
        setFilters({ priceRange: [min, max] });
    };
    const handleSortChange = (sortBy) => {
        setFilters({ sortBy });
    };
    const handleAddToCart = (product, quantity) => {
        addItem(product, quantity);
    };
    const displayProducts = filteredProducts.filter((p) => {
        if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
            return false;
        }
        if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
            return false;
        }
        if (filters.inStockOnly && !p.inStock) {
            return false;
        }
        return true;
    });
    React.useEffect(() => {
        setFilteredProducts(products);
    }, [products]);
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 pb-20 md:pb-0", children: [_jsx(Header, { title: "Search", showBack: true }), _jsx("div", { className: "bg-white border-b border-gray-200 p-6 sticky top-16 z-20", children: _jsx(Input, { placeholder: "Search groceries...", value: searchTerm, onChange: (e) => handleSearchChange(e.target.value), type: "search" }) }), _jsxs("div", { className: "bg-white border-b border-gray-200 px-6 py-4 flex gap-3 justify-between md:justify-start md:gap-6", children: [_jsx("button", { onClick: () => setShowFilters(!showFilters), className: "flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:bg-green-50 font-semibold text-gray-700 transition", children: "\u2699\uFE0F Filters" }), _jsxs("select", { value: filters.sortBy, onChange: (e) => handleSortChange(e.target.value), className: "px-4 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-primary-600 font-semibold text-gray-700", children: [_jsx("option", { value: "newest", children: "Newest" }), _jsx("option", { value: "price-asc", children: "Price: Low to High" }), _jsx("option", { value: "price-desc", children: "Price: High to Low" }), _jsx("option", { value: "rating", children: "Rating" })] })] }), showFilters && (_jsxs("div", { className: "bg-white border-b border-gray-200 p-6 md:grid md:grid-cols-3 md:gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-900 mb-3", children: "\uD83D\uDCE6 Categories" }), _jsx("div", { className: "space-y-2", children: Object.values(ProductCategory).map((category) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded", children: [_jsx("input", { type: "checkbox", checked: filters.categories.includes(category), onChange: () => handleCategoryToggle(category), className: "w-4 h-4 rounded border-gray-300 accent-primary-600" }), _jsx("span", { className: "text-gray-700 capitalize text-sm", children: category })] }, category))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-900 mb-3", children: "\uD83D\uDCB2 Price Range" }), _jsxs("div", { className: "flex gap-3", children: [_jsx("input", { type: "number", min: "0", value: filters.priceRange[0], onChange: (e) => handlePriceChange(Number(e.target.value), filters.priceRange[1]), placeholder: "Min", className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary-600 focus:outline-none" }), _jsx("span", { className: "text-gray-400 py-2", children: "\u2014" }), _jsx("input", { type: "number", max: "10000", value: filters.priceRange[1], onChange: (e) => handlePriceChange(filters.priceRange[0], Number(e.target.value)), placeholder: "Max", className: "flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary-600 focus:outline-none" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-900 mb-3", children: "\u2705 Availability" }), _jsxs("label", { className: "flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded", children: [_jsx("input", { type: "checkbox", checked: filters.inStockOnly, onChange: (e) => setFilters({ inStockOnly: e.target.checked }), className: "w-4 h-4 rounded border-gray-300 accent-primary-600" }), _jsx("span", { className: "text-gray-700 text-sm", children: "In Stock Only" })] })] })] })), _jsx("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-6 pb-24 md:pb-0", children: displayProducts.length === 0 ? (_jsx(EmptyState, { icon: "\uD83D\uDD0D", title: "No Products Found", description: `No products match your search${searchTerm ? ` for "${searchTerm}"` : ''}`, action: {
                        label: 'Clear Search',
                        onClick: () => {
                            setSearchTerm('');
                            setFilteredProducts(products);
                        },
                    } })) : (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-sm text-gray-600 mb-4", children: ["Found ", displayProducts.length, " products"] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: displayProducts.map((product) => (_jsx("div", { onClick: () => navigate(`/product/${product.id}`), className: "cursor-pointer", children: _jsx(ProductCard, { product: product, onAddToCart: (quantity) => handleAddToCart(product, quantity) }) }, product.id))) })] })) })] }));
};
