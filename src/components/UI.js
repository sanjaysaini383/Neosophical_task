import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export const SkeletonLoader = ({ count = 1 }) => {
    return (_jsx(_Fragment, { children: Array.from({ length: count }).map((_, i) => (_jsx("div", { className: "bg-gray-200 rounded-lg animate-pulse h-64" }, i))) }));
};
export const EmptyState = ({ icon, title, description, action, }) => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: icon }), _jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", children: title }), description && (_jsx("p", { className: "text-gray-500 mb-6 max-w-md", children: description })), action && (_jsx("button", { onClick: action.onClick, className: "bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700", children: action.label }))] }));
};
export const ErrorState = ({ message, onRetry }) => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\u274C" }), _jsx("h2", { className: "text-2xl font-bold text-danger mb-2", children: "Error" }), _jsx("p", { className: "text-gray-500 mb-6 max-w-md", children: message }), onRetry && (_jsx("button", { onClick: onRetry, className: "bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700", children: "Try Again" }))] }));
};
export const Divider = ({ className = '' }) => {
    return _jsx("div", { className: `border-b border-gray-200 ${className}` });
};
export const Badge = ({ label, variant = 'primary' }) => {
    const variantStyles = {
        primary: 'bg-primary-100 text-primary-700',
        secondary: 'bg-orange-100 text-orange-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        danger: 'bg-red-100 text-red-700',
    };
    return (_jsx("span", { className: `px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]}`, children: label }));
};
