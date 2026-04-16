import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Button } from '../../components';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { calculateDiscount, getDiscountText } from '../../utils/helpers';
export const ProductDetailScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getProductById } = useProductStore();
    const { addItem } = useCartStore();
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const [quantity, setQuantity] = useState(1);
    const product = id ? getProductById(id) : null;
    if (!product) {
        return (_jsxs("div", { className: "min-h-screen bg-white flex flex-col", children: [_jsx(Header, { showBack: true, title: "Product" }), _jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsx("p", { className: "text-gray-600", children: "Product not found" }) })] }));
    }
    const favorite = isFavorite(product.id);
    const handleAddToCart = () => {
        addItem(product, quantity);
        navigate('/cart');
    };
    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(product.id);
        }
        else {
            addFavorite(product.id);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-white pb-20 md:pb-0", children: [_jsx(Header, { showBack: true, title: "Product Details" }), _jsxs("div", { className: "relative h-64 md:h-96 bg-gray-100 flex items-center justify-center", children: [_jsx("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover" }), _jsx("button", { onClick: toggleFavorite, className: "absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50", children: favorite ? '❤️' : '🤍' }), product.discount && (_jsx("div", { className: "absolute top-4 right-4 bg-danger text-white px-3 py-1 rounded-full font-bold text-sm", children: getDiscountText(product.discount) }))] }), _jsxs("div", { className: "px-6 py-6", children: [_jsxs("div", { className: "mb-4 pb-4 border-b border-gray-200", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-2", children: product.name }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: product.unit }), _jsxs("div", { className: "flex items-baseline gap-3", children: [_jsxs("p", { className: "text-3xl font-bold text-primary-600", children: ["$", product.price.toFixed(2)] }), product.discount && (_jsxs("p", { className: "text-lg text-gray-400 line-through", children: ["$", calculateDiscount(product.price, product.discount).toFixed(2)] }))] })] }), _jsx("div", { className: "mb-4 pb-4 border-b border-gray-200", children: _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "text-lg", children: "\u2B50" }), _jsx("span", { className: "font-semibold text-gray-900", children: product.rating }), _jsxs("span", { className: "text-sm text-gray-600", children: ["(", product.reviews, " reviews)"] })] }) }), _jsxs("div", { className: "mb-6 pb-4 border-b border-gray-200", children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Product Details" }), _jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: product.description })] }), _jsxs("div", { className: "mb-6", children: [_jsx("p", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Quantity" }), _jsxs("div", { className: "flex items-center gap-4 border border-gray-300 rounded-lg w-fit", children: [_jsx("button", { onClick: () => setQuantity(Math.max(1, quantity - 1)), className: "px-4 py-2 text-gray-600 hover:bg-gray-100 font-semibold", children: "\u2212" }), _jsx("span", { className: "px-6 py-2 text-lg font-bold text-gray-900", children: quantity }), _jsx("button", { onClick: () => setQuantity(quantity + 1), className: "px-4 py-2 text-gray-600 hover:bg-gray-100 font-semibold", children: "+" })] })] }), _jsx(Button, { fullWidth: true, size: "lg", onClick: handleAddToCart, disabled: !product.inStock, children: product.inStock ? 'Add To Basket' : 'Out of Stock' })] })] }));
};
