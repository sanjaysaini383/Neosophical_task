import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
export const SplashScreen = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    useEffect(() => {
        // Check if user is already authenticated
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                navigate('/home');
            }
            else {
                navigate('/onboarding');
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate, isAuthenticated]);
    return (_jsx("div", { className: "h-screen bg-primary-600 flex flex-col items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-7xl mb-8", children: "\uD83E\uDD55" }), _jsx("h1", { className: "text-6xl font-bold text-white mb-2 tracking-wide", children: "nectar" }), _jsx("p", { className: "text-sm text-primary-100 tracking-widest", children: "online groceries" })] }) }));
};
