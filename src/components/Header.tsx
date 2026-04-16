import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  cartCount?: number;
  onBackClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showCart = false,
  onBackClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const cartItemCount = getTotalItems();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  // Navigation items for desktop
  const navItems = [
    { label: 'Shop', path: '/home', icon: '🏪' },
    { label: 'Explore', path: '/explore', icon: '🔍' },
    { label: 'Cart', path: '/cart', icon: '🛒', badge: cartItemCount },
    { label: 'Favorites', path: '/favorites', icon: '❤️' },
    { label: 'Account', path: '/account', icon: '👤' },
  ];

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 py-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={handleBack}
                className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors md:hidden"
              >
                ← Back
              </button>
            )}
            {!showBack && title === 'Nectar' && (
              <span className="text-2xl font-bold text-primary-600">🌾 Nectar</span>
            )}
            {title && title !== 'Nectar' && !showBack && (
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h1>
            )}
          </div>

          {/* Desktop Navigation */}
          {title === 'Nectar' && (
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center mx-12">
              {navItems.slice(0, 4).map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <span className="ml-1 bg-danger text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=22c55e&color=fff`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 hidden lg:inline">{user.name}</span>
              </div>
            )}
            {(showCart || title === 'Nectar') && (
              <button
                onClick={() => navigate('/cart')}
                className="relative text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors lg:hidden"
              >
                <span className="text-xl">🛒</span>
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-danger text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            )}
            {user && title === 'Nectar' && (
              <button
                onClick={() => navigate('/account')}
                className="hidden lg:block text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <span className="text-xl">👤</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
