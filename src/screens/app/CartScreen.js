import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Header, Button, EmptyState } from '../../components';
import { useCartStore } from '../../stores/cartStore';
import { useProductStore } from '../../stores/productStore';
import { formatCurrency } from '../../utils/helpers';
export const CartScreen = () => {
    const navigate = useNavigate();
    const { items, totalPrice, updateQuantity, removeItem } = useCartStore();
    const { getProductById } = useProductStore();
    if (items.length === 0) {
        return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsx(Header, { showBack: true, title: "Shopping Cart" }), _jsx("div", { className: "flex items-center justify-center h-96", children: _jsx(EmptyState, { icon: "\uD83D\uDED2", title: "Your Cart is Empty", description: "Start shopping to add items to your cart", action: {
                            label: 'Continue Shopping',
                            onClick: () => navigate('/home'),
                        } }) })] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 pb-32 md:pb-0", children: [_jsx(Header, { showBack: true, title: "Shopping Cart" }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-6", children: [_jsx("div", { className: "space-y-4", children: items.map((cartItem) => {
                            const product = getProductById(cartItem.productId);
                            if (!product)
                                return null;
                            return (_jsxs("div", { className: "bg-white rounded-lg p-4 flex gap-4", children: [_jsx("img", { src: product.image, alt: product.name, className: "w-24 h-24 rounded-lg object-cover" }), _jsx("div", { className: "flex-1 flex flex-col justify-between", children: _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: product.name }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: product.unit }), _jsx("p", { className: "text-lg font-bold text-gray-900 mt-2", children: formatCurrency(product.price) })] }) }), _jsxs("div", { className: "flex flex-col items-end gap-2", children: [_jsxs("div", { className: "flex items-center border border-gray-300 rounded-lg", children: [_jsx("button", { onClick: () => updateQuantity(cartItem.productId, cartItem.quantity - 1), className: "px-2 py-1 text-gray-600 hover:bg-gray-100", children: "\u2212" }), _jsx("span", { className: "px-3 py-1 text-sm font-semibold", children: cartItem.quantity }), _jsx("button", { onClick: () => updateQuantity(cartItem.productId, cartItem.quantity + 1), className: "px-2 py-1 text-gray-600 hover:bg-gray-100", children: "+" })] }), _jsx("button", { onClick: () => removeItem(cartItem.productId), className: "text-danger text-sm font-semibold hover:text-red-600", children: "Remove" })] })] }, cartItem.productId));
                        }) }), _jsxs("div", { className: "mt-8 bg-white rounded-2xl p-6 sticky bottom-0 md:static md:mt-8 shadow-md", children: [_jsxs("div", { className: "space-y-3 mb-6", children: [_jsxs("div", { className: "flex justify-between text-gray-600 text-sm", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { className: "font-semibold text-gray-900", children: ["$", totalPrice.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between text-gray-600 text-sm", children: [_jsx("span", { children: "Delivery Fee" }), _jsx("span", { className: "font-semibold text-gray-900", children: "Free" })] }), _jsxs("div", { className: "border-t border-gray-200 pt-3 flex justify-between text-lg", children: [_jsx("span", { className: "font-bold text-gray-900", children: "Total" }), _jsxs("span", { className: "font-bold text-primary-600 text-xl", children: ["$", totalPrice.toFixed(2)] })] })] }), _jsx(Button, { fullWidth: true, size: "lg", onClick: () => navigate('/checkout'), children: "Go to Checkout" })] })] })] }));
};
