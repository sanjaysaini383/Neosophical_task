import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, Input, Card } from '../../components';
import { useCartStore } from '../../stores/cartStore';
import { useLocationStore } from '../../stores/locationStore';
import { useProductStore } from '../../stores/productStore';
import { simulateDelay } from '../../utils/helpers';
export const CheckoutScreen = () => {
    const navigate = useNavigate();
    const { items, totalPrice, clearCart } = useCartStore();
    const { selectedLocation } = useLocationStore();
    const { getProductById } = useProductStore();
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [promoCode, setPromoCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [discount, setDiscount] = useState(0);
    const handlePromoCode = () => {
        if (promoCode.toUpperCase() === 'WELCOME10') {
            setDiscount(totalPrice * 0.1);
            alert('Promo code applied! You get 10% OFF');
        }
        else if (promoCode) {
            alert('Invalid promo code');
        }
    };
    const finalTotal = totalPrice - discount;
    const deliveryFee = 2.99;
    const grandTotal = finalTotal + deliveryFee;
    const handlePlaceOrder = async () => {
        setLoading(true);
        await simulateDelay(2000);
        clearCart();
        navigate('/order-success');
    };
    if (items.length === 0) {
        return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsx(Header, { showBack: true, title: "Checkout" }), _jsx("div", { className: "flex items-center justify-center h-96", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-600 mb-4", children: "Your cart is empty" }), _jsx(Button, { onClick: () => navigate('/home'), children: "Continue Shopping" })] }) })] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 pb-32 md:pb-0", children: [_jsx(Header, { showBack: true, title: "Checkout" }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "\uD83D\uDCCD Delivery Address" }), _jsx("button", { className: "text-primary-600 text-sm font-semibold hover:text-primary-700", children: "Change" })] }), selectedLocation && (_jsxs("div", { className: "bg-gray-50 p-3 rounded-lg", children: [_jsx("p", { className: "font-bold text-gray-900", children: selectedLocation.name }), _jsx("p", { className: "text-gray-600 text-sm mt-1", children: selectedLocation.address })] }))] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "\uD83D\uDED2 Order Items" }), _jsx("div", { className: "space-y-3", children: items.map((cartItem) => {
                                            const product = getProductById(cartItem.productId);
                                            if (!product)
                                                return null;
                                            return (_jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-gray-200 last:border-0", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-semibold text-gray-900", children: product.name }), _jsxs("p", { className: "text-sm text-gray-500", children: [cartItem.quantity, " \u00D7 $", product.price.toFixed(2)] })] }), _jsxs("p", { className: "font-bold text-gray-900", children: ["$", (product.price * cartItem.quantity).toFixed(2)] })] }, cartItem.productId));
                                        }) })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "\uD83C\uDF9F\uFE0F Promo Code" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Enter promo code", value: promoCode, onChange: (e) => setPromoCode(e.target.value) }), _jsx(Button, { onClick: handlePromoCode, variant: "secondary", children: "Apply" })] }), _jsx("p", { className: "text-xs text-primary-600 mt-2 font-semibold", children: "Try: WELCOME10 for 10% Off" })] }), _jsxs(Card, { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "\uD83D\uDCB3 Payment Method" }), _jsx("div", { className: "space-y-3", children: [
                                            { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                                            { id: 'wallet', label: 'Digital Wallet', icon: '👛' },
                                            { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                                            { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                                        ].map((method) => (_jsxs("label", { className: `flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2 transition ${selectedPayment === method.id ? 'border-primary-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`, children: [_jsx("input", { type: "radio", name: "payment", value: method.id, checked: selectedPayment === method.id, onChange: (e) => setSelectedPayment(e.target.value), className: "w-4 h-4 accent-primary-600" }), _jsx("span", { className: "text-lg", children: method.icon }), _jsx("span", { className: "text-gray-900 font-medium", children: method.label })] }, method.id))) })] })] }), _jsx("div", { className: "lg:col-span-1", children: _jsxs(Card, { className: "sticky top-20 shadow-lg", children: [_jsx("h2", { className: "text-lg font-bold text-gray-900 mb-4", children: "Order Summary" }), _jsxs("div", { className: "space-y-3 mb-4 pb-4 border-b border-gray-200", children: [_jsxs("div", { className: "flex justify-between text-gray-600 text-sm", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { className: "font-semibold", children: ["$", totalPrice.toFixed(2)] })] }), discount > 0 && (_jsxs("div", { className: "flex justify-between text-green-600 text-sm", children: [_jsx("span", { children: "Discount" }), _jsxs("span", { className: "font-semibold", children: ["-$", discount.toFixed(2)] })] })), _jsxs("div", { className: "flex justify-between text-gray-600 text-sm", children: [_jsx("span", { children: "Delivery Fee" }), _jsxs("span", { className: "font-semibold", children: ["$", deliveryFee.toFixed(2)] })] })] }), _jsxs("div", { className: "mb-6 flex justify-between items-center", children: [_jsx("span", { className: "font-bold text-gray-900", children: "Total" }), _jsxs("span", { className: "text-2xl font-bold text-primary-600", children: ["$", grandTotal.toFixed(2)] })] }), _jsx(Button, { fullWidth: true, size: "lg", loading: loading, onClick: handlePlaceOrder, children: "Place Order" }), _jsxs("p", { className: "text-xs text-gray-500 text-center mt-4", children: ["By placing order you agree to our", ' ', _jsx("span", { className: "text-primary-600 font-semibold", children: "Terms & Conditions" })] })] }) })] })] }));
};
