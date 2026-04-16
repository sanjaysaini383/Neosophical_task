import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
export const OrderSuccessScreen = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            // Auto-redirect after 10 seconds
            // Commented out to allow user to click buttons
        }, 10000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (_jsxs("div", { className: "min-h-screen bg-white flex flex-col items-center justify-center px-6", children: [_jsx("div", { className: "relative mb-8 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce", children: _jsx("div", { className: "text-5xl text-primary-600", children: "\u2713" }) }), _jsxs("div", { className: "text-center max-w-md mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-3", children: "Order Placed Successfully!" }), _jsx("p", { className: "text-base text-gray-600 mb-4", children: "Your order has been confirmed and will be delivered soon" }), _jsxs("div", { className: "bg-green-50 border-2 border-primary-600 rounded-lg p-3", children: [_jsx("p", { className: "text-sm text-gray-600 mb-1", children: "Order ID" }), _jsx("p", { className: "text-lg font-bold text-primary-600", children: "#ORD123456" })] })] }), _jsxs("div", { className: "bg-gray-50 rounded-2xl p-6 mb-8 max-w-md w-full border border-gray-200", children: [_jsx("h3", { className: "font-bold text-gray-900 mb-4", children: "\uD83D\uDCCB Order Details" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-gray-300", children: [_jsx("span", { className: "text-gray-600 text-sm", children: "Estimated Delivery" }), _jsx("span", { className: "font-bold text-gray-900", children: "45 mins" })] }), _jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-gray-300", children: [_jsx("span", { className: "text-gray-600 text-sm", children: "Total Amount" }), _jsx("span", { className: "font-bold text-gray-900", children: "$35.99" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600 text-sm", children: "Status" }), _jsx("span", { className: "px-4 py-1 bg-green-100 text-primary-600 rounded-full text-sm font-bold", children: "Confirmed" })] })] })] }), _jsxs("div", { className: "space-y-3 max-w-md w-full", children: [_jsx(Button, { fullWidth: true, size: "lg", onClick: () => navigate('/home'), children: "Continue Shopping" }), _jsx(Button, { fullWidth: true, variant: "outline", size: "lg", onClick: () => navigate('/account'), children: "\uD83D\uDCCD Track Order" })] })] }));
};
