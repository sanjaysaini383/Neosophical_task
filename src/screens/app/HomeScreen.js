import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, ProductCard, SkeletonLoader, EmptyState } from '../../components';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { useLocationStore } from '../../stores/locationStore';
import { mockProducts } from '../../data/mockProducts';
import { ProductCategory } from '../../types/index';
import { simulateDelay } from '../../utils/helpers';
export const HomeScreen = () => {
    const navigate = useNavigate();
    const { setProducts, filteredProducts } = useProductStore();
    const { addItem } = useCartStore();
    const { selectedLocation } = useLocationStore();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            await simulateDelay(800);
            setProducts(mockProducts);
            setLoading(false);
        };
        loadProducts();
    }, [setProducts]);
    const categories = Object.values(ProductCategory);
    const displayProducts = selectedCategory
        ? filteredProducts.filter((p) => p.category === selectedCategory)
        : filteredProducts;
    const handleAddToCart = (product, quantity) => {
        addItem(product, quantity);
        navigate('/cart');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 pb-24 md:pb-0", children: [_jsx(Header, { title: "Nectar", showCart: true, cartCount: 0 }), _jsxs("div", { className: "md:hidden bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCCD" }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-600", children: "Delivering to" }), _jsx("p", { className: "text-sm font-semibold text-gray-900 max-w-xs truncate", children: selectedLocation?.address.split(',')[0] || 'Select Location' })] })] }), _jsx("button", { onClick: () => navigate('/account'), className: "text-2xl", children: "\uD83D\uDC64" })] }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6", children: [_jsx("div", { className: "mb-6", children: _jsxs("button", { onClick: () => navigate('/search'), className: "w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-500 text-left hover:bg-gray-200 transition-colors flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDD0D" }), " Search store"] }) }), _jsxs("div", { className: "mb-6 p-4 bg-gradient-to-r from-secondary to-orange-500 rounded-lg text-white", children: [_jsx("p", { className: "font-semibold", children: "Exclusive Offer" }), _jsx("p", { className: "text-sm", children: "Get 10% OFF on your first order" })] }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Fresh Vegetables" }), _jsx("a", { href: "#", className: "text-primary-600 text-sm font-semibold", children: "See all" })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: filteredProducts.slice(0, 4).map((product) => (_jsx("div", { onClick: () => navigate(`/product/${product.id}`), className: "cursor-pointer", children: _jsx(ProductCard, { product: product, onAddToCart: (quantity) => handleAddToCart(product, quantity) }) }, product.id))) })] }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Exclusive Offer" }), _jsx("a", { href: "#", className: "text-primary-600 text-sm font-semibold", children: "See all" })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: filteredProducts.filter(p => p.discount).slice(0, 4).map((product) => (_jsx("div", { onClick: () => navigate(`/product/${product.id}`), className: "cursor-pointer", children: _jsx(ProductCard, { product: product, onAddToCart: (quantity) => handleAddToCart(product, quantity) }) }, product.id))) })] }), _jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-lg font-bold text-gray-900 mb-4", children: "Categories" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3", children: categories.slice(0, 8).map((category, idx) => (_jsxs("button", { onClick: () => setSelectedCategory(category), className: `p-4 rounded-xl text-center transition-colors border ${selectedCategory === category
                                        ? 'bg-primary-50 border-primary-600'
                                        : 'bg-gray-50 border-gray-200 hover:bg-primary-50'}`, children: [_jsx("div", { className: "text-4xl mb-2", children: ['🥬', '🍎', '🥩', '🐟', '🥐', '🥤', '🥛', '🌾'][idx] }), _jsx("p", { className: "text-xs text-gray-700 font-medium capitalize truncate", children: category })] }, category))) })] }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Best Selling" }), _jsx("a", { href: "#", className: "text-primary-600 text-sm font-semibold", children: "See all" })] }), loading ? (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: _jsx(SkeletonLoader, { count: 8 }) })) : displayProducts.length === 0 ? (_jsx(EmptyState, { icon: "\uD83D\uDCE6", title: "No Products Found", description: "No products found", action: {
                                    label: 'View All Products',
                                    onClick: () => setSelectedCategory(null),
                                } })) : (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: displayProducts.slice(0, 10).map((product) => (_jsx("div", { onClick: () => navigate(`/product/${product.id}`), className: "cursor-pointer", children: _jsx(ProductCard, { product: product, onAddToCart: (quantity) => handleAddToCart(product, quantity) }) }, product.id))) }))] })] })] }));
};
