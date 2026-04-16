import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
// Auth Screens
import { SplashScreen, OnboardingScreen, LoginScreen, SignUpScreen, VerificationScreen, LocationSelectScreen, } from './screens/auth';
// App Screens
import { HomeScreen, SearchScreen, ProductDetailScreen, CartScreen, FavoritesScreen, AccountScreen, CheckoutScreen, OrderSuccessScreen, OrderFailureScreen, } from './screens/app';
// Components
import { BottomNavigation } from './components';
// Loading component for Suspense
const PageLoader = () => (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-6xl mb-4 animate-bounce", children: "\uD83C\uDF3E" }), _jsx("p", { className: "text-gray-600", children: "Loading..." })] }) }));
// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/splash", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export const App = () => {
    return (_jsx(Router, { children: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsxs(_Fragment, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/splash", element: _jsx(SplashScreen, {}) }), _jsx(Route, { path: "/onboarding", element: _jsx(OnboardingScreen, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginScreen, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUpScreen, {}) }), _jsx(Route, { path: "/verification", element: _jsx(VerificationScreen, {}) }), _jsx(Route, { path: "/location-select", element: _jsx(LocationSelectScreen, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/splash", replace: true }) }), _jsx(Route, { path: "/home", element: _jsx(ProtectedRoute, { children: _jsx(HomeScreen, {}) }) }), _jsx(Route, { path: "/search", element: _jsx(ProtectedRoute, { children: _jsx(SearchScreen, {}) }) }), _jsx(Route, { path: "/explore", element: _jsx(ProtectedRoute, { children: _jsx(SearchScreen, {}) }) }), _jsx(Route, { path: "/product/:id", element: _jsx(ProtectedRoute, { children: _jsx(ProductDetailScreen, {}) }) }), _jsx(Route, { path: "/cart", element: _jsx(ProtectedRoute, { children: _jsx(CartScreen, {}) }) }), _jsx(Route, { path: "/favorites", element: _jsx(ProtectedRoute, { children: _jsx(FavoritesScreen, {}) }) }), _jsx(Route, { path: "/account", element: _jsx(ProtectedRoute, { children: _jsx(AccountScreen, {}) }) }), _jsx(Route, { path: "/checkout", element: _jsx(ProtectedRoute, { children: _jsx(CheckoutScreen, {}) }) }), _jsx(Route, { path: "/order-success", element: _jsx(ProtectedRoute, { children: _jsx(OrderSuccessScreen, {}) }) }), _jsx(Route, { path: "/order-failure", element: _jsx(ProtectedRoute, { children: _jsx(OrderFailureScreen, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/splash", replace: true }) })] }), _jsx(BottomNavigation, {})] }) }) }));
};
export default App;
