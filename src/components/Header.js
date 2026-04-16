import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
export const Header = ({ title, showBack = false, showCart = false, onBackClick, }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthStore();
    const { getTotalItems } = useCartStore();
    const cartItemCount = getTotalItems();
    const handleBack = () => {
        if (onBackClick) {
            onBackClick();
        }
        else {
            navigate(-1);
        }
    };
    const isActive = (path) => location.pathname === path;
    // Navigation items for desktop
    const navItems = [
        { label: 'Shop', path: '/home', icon: '🏪' },
        { label: 'Explore', path: '/explore', icon: '🔍' },
        { label: 'Cart', path: '/cart', icon: '🛒', badge: cartItemCount },
        { label: 'Favorites', path: '/favorites', icon: '❤️' },
        { label: 'Account', path: '/account', icon: '👤' },
    ];
    return (_jsx("header", { className: "sticky top-0 bg-white border-b border-gray-200 z-30", children: _jsx("div", { className: "px-4 py-4 lg:px-8", children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [showBack && (_jsx("button", { onClick: handleBack, className: "text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors md:hidden", children: "\u2190 Back" })), !showBack && title === 'Nectar' && (_jsx("span", { className: "text-2xl font-bold text-primary-600", children: "\uD83C\uDF3E Nectar" })), title && title !== 'Nectar' && !showBack && (_jsx("h1", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: title }))] }), title === 'Nectar' && (_jsx("nav", { className: "hidden lg:flex items-center gap-8 flex-1 justify-center mx-12", children: navItems.slice(0, 4).map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: `flex items-center gap-2 text-sm font-medium transition-colors ${isActive(item.path)
                                ? 'text-primary-600'
                                : 'text-gray-700 hover:text-primary-600'}`, children: [_jsx("span", { className: "text-lg", children: item.icon }), item.label, item.badge && item.badge > 0 && (_jsx("span", { className: "ml-1 bg-danger text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center", children: item.badge }))] }, item.path))) })), _jsxs("div", { className: "flex items-center gap-4", children: [user && (_jsxs("div", { className: "hidden sm:flex items-center gap-2", children: [_jsx("img", { src: `https://ui-avatars.com/api/?name=${user.name}&background=22c55e&color=fff`, alt: user.name, className: "w-8 h-8 rounded-full" }), _jsx("span", { className: "text-sm font-medium text-gray-700 hidden lg:inline", children: user.name })] })), (showCart || title === 'Nectar') && (_jsxs("button", { onClick: () => navigate('/cart'), className: "relative text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors lg:hidden", children: [_jsx("span", { className: "text-xl", children: "\uD83D\uDED2" }), cartItemCount > 0 && (_jsx("span", { className: "absolute top-0 right-0 bg-danger text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center", children: cartItemCount }))] })), user && title === 'Nectar' && (_jsx("button", { onClick: () => navigate('/account'), className: "hidden lg:block text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors", children: _jsx("span", { className: "text-xl", children: "\uD83D\uDC64" }) }))] })] }) }) }));
};
