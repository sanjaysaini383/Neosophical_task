import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

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
  cartCount = 0,
  onBackClick,
}) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={handleBack}
              className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
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

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=22c55e&color=fff`}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
          )}
          {showCart && (
            <button
              onClick={() => navigate('/cart')}
              className="relative text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-danger text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
