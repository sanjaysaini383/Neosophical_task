import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Header, ProductCard, EmptyState } from '../../components';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
export const FavoritesScreen = () => {
    const navigate = useNavigate();
    const { favorites } = useFavoritesStore();
    const { products } = useProductStore();
    const { addItem } = useCartStore();
    const favoriteProducts = favorites
        .map((id) => products.find((p) => p.id === id))
        .filter((p) => p !== undefined);
    const handleAddToCart = (product, quantity) => {
        addItem(product, quantity);
        navigate('/cart');
    };
    if (favoriteProducts.length === 0) {
        return (_jsxs("div", { className: "min-h-screen bg-white", children: [_jsx(Header, { showBack: true, title: "Favorites" }), _jsx("div", { className: "flex items-center justify-center h-96", children: _jsx(EmptyState, { icon: "\u2764\uFE0F", title: "No Favorites Yet", description: "Add items to your favorites to see them here", action: {
                            label: 'Continue Shopping',
                            onClick: () => navigate('/home'),
                        } }) })] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-gray-50 pb-20 md:pb-0", children: [_jsx(Header, { showBack: true, title: "Favorites" }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6", children: [_jsx("div", { className: "flex items-center justify-between mb-6", children: _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "\u2764\uFE0F My Favorites" }), _jsxs("p", { className: "text-gray-600 text-sm mt-1", children: [favoriteProducts.length, " item", favoriteProducts.length !== 1 ? 's' : '', " saved"] })] }) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: favoriteProducts.map((product) => (_jsx("div", { onClick: () => navigate(`/product/${product.id}`), className: "cursor-pointer", children: _jsx(ProductCard, { product: product, onAddToCart: (quantity) => handleAddToCart(product, quantity) }) }, product.id))) })] })] }));
};
