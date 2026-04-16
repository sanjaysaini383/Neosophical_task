import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useFavoritesStore } from '../stores/favoritesStore';
import { formatCurrency, calculateDiscount, getDiscountText } from '../utils/helpers';
export const ProductCard = ({ product, onAddToCart, variant = 'grid', }) => {
    const [quantity, setQuantity] = React.useState(1);
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const favorite = isFavorite(product.id);
    const handleAddToCart = () => {
        onAddToCart(quantity);
        setQuantity(1);
    };
    const toggleFavorite = (e) => {
        e.stopPropagation();
        if (favorite) {
            removeFavorite(product.id);
        }
        else {
            addFavorite(product.id);
        }
    };
    if (variant === 'list') {
        return (_jsxs("div", { className: "flex gap-4 p-4 bg-white rounded-lg border border-gray-200", children: [_jsx("img", { src: product.image, alt: product.name, className: "w-24 h-24 rounded-lg object-cover" }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: product.name }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: product.unit }), _jsxs("div", { className: "flex items-center justify-between mt-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-lg font-bold text-gray-900", children: formatCurrency(product.price) }), product.discount && (_jsx("p", { className: "text-xs text-gray-500 line-through", children: formatCurrency(calculateDiscount(product.price, product.discount)) }))] }), _jsx("button", { onClick: handleAddToCart, className: "bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700", children: "Add" })] })] })] }));
    }
    return (_jsxs("div", { className: "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow", children: [_jsxs("div", { className: "relative h-40 sm:h-48 bg-gray-100 overflow-hidden", children: [_jsx("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover" }), product.discount && (_jsx("div", { className: "absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded-lg text-xs font-semibold", children: getDiscountText(product.discount) })), _jsx("button", { onClick: toggleFavorite, className: "absolute top-2 left-2 bg-white rounded-full p-2 hover:bg-gray-100", children: favorite ? '❤️' : '🤍' }), !product.inStock && (_jsx("div", { className: "absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center", children: _jsx("span", { className: "text-white font-semibold", children: "Out of Stock" }) }))] }), _jsxs("div", { className: "p-3 sm:p-4", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-sm sm:text-base line-clamp-2", children: product.name }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: product.unit }), _jsxs("div", { className: "flex items-center gap-1 mt-2 text-xs text-gray-600", children: [_jsxs("span", { children: ["\u2B50 ", product.rating] }), _jsxs("span", { className: "text-gray-400", children: ["(", product.reviews, ")"] })] }), _jsxs("div", { className: "mt-3 flex items-baseline gap-2", children: [_jsx("p", { className: "text-lg font-bold text-gray-900", children: formatCurrency(product.price) }), product.discount && (_jsx("p", { className: "text-xs text-gray-500 line-through", children: formatCurrency(calculateDiscount(product.price, product.discount)) }))] }), _jsxs("div", { className: "flex items-center gap-2 mt-4", children: [_jsxs("div", { className: "flex items-center border border-gray-200 rounded-lg", children: [_jsx("button", { onClick: () => setQuantity(Math.max(1, quantity - 1)), className: "px-2 py-1 text-gray-600 hover:bg-gray-100", disabled: !product.inStock, children: "\u2212" }), _jsx("span", { className: "px-3 py-1 text-sm font-semibold", children: quantity }), _jsx("button", { onClick: () => setQuantity(quantity + 1), className: "px-2 py-1 text-gray-600 hover:bg-gray-100", disabled: !product.inStock, children: "+" })] }), _jsx("button", { onClick: handleAddToCart, disabled: !product.inStock, className: "flex-1 bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm", children: "Add" })] })] })] }));
};
