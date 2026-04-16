import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCartStore();
  const cartCount = getTotalItems();

  const navItems = [
    { id: 'home', label: 'Shop', icon: '🏪', path: '/home' },
    { id: 'explore', label: 'Explore', icon: '🔍', path: '/explore' },
    { id: 'cart', label: 'Cart', icon: '🛒', path: '/cart', badge: cartCount > 0 ? cartCount : null },
    { id: 'favorites', label: 'Favorites', icon: '❤️', path: '/favorites' },
    { id: 'account', label: 'Account', icon: '👤', path: '/account' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`
              flex-1 flex flex-col items-center justify-center py-3 px-2 relative
              ${isActive(item.path) ? 'text-primary-600' : 'text-gray-600'}
              hover:bg-gray-50 transition-colors
            `}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium text-center">{item.label}</span>
            {item.badge && (
              <span className="absolute top-1 right-2 bg-danger text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
