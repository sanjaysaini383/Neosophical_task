import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, EmptyState } from '../../components';
import { useAuthStore } from '../../stores/authStore';
import { useLocationStore } from '../../stores/locationStore';

export const AccountScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { selectedLocation, locations } = useLocationStore();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Account" />
        <div className="flex items-center justify-center h-96">
          <EmptyState
            icon="👤"
            title="Please Login"
            description="You need to login to access your account"
            action={{
              label: 'Login',
              onClick: () => navigate('/login'),
            }}
          />
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <Header title="Account" />

      {/* User Profile */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=22c55e&color=fff&size=128`}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-green-100">{user.email}</p>
              <p className="text-green-100 text-sm mt-1">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* My Orders */}
        <button className="w-full bg-white rounded-2xl p-4 mb-3 flex items-center justify-between hover:shadow-md transition-all">
          <span className="text-lg font-semibold text-gray-900">📦 My Orders</span>
          <span className="text-gray-400">→</span>
        </button>

        {/* Delivery Addresses */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-full bg-white rounded-2xl p-4 mb-3 flex items-center justify-between hover:shadow-md transition-all"
        >
          <span className="text-lg font-semibold text-gray-900">📍 Delivery Addresses</span>
          <span className="text-gray-400">{showMenu ? '▼' : '→'}</span>
        </button>

        {/* Address List */}
        {showMenu && (
          <div className="bg-white rounded-2xl p-4 mb-3 space-y-3 border border-gray-200">
            {locations.length > 0 ? (
              locations.map((location) => (
                <div key={location.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-primary-600">
                  <p className="font-bold text-gray-900">{location.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                  {location.isDefault && (
                    <span className="inline-block mt-2 text-xs bg-primary-600 text-white px-3 py-1 rounded-full font-semibold">
                      Default
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No delivery addresses</p>
            )}
          </div>
        )}

        {/* Payment Methods */}
        <button className="w-full bg-white rounded-2xl p-4 mb-3 flex items-center justify-between hover:shadow-md transition-all">
          <span className="text-lg font-semibold text-gray-900">💳 Payment Methods</span>
          <span className="text-gray-400">→</span>
        </button>

        {/* Settings */}
        <button className="w-full bg-white rounded-2xl p-4 mb-3 flex items-center justify-between hover:shadow-md transition-all">
          <span className="text-lg font-semibold text-gray-900">⚙️ Settings</span>
          <span className="text-gray-400">→</span>
        </button>

        {/* Help & Support */}
        <button className="w-full bg-white rounded-2xl p-4 mb-3 flex items-center justify-between hover:shadow-md transition-all">
          <span className="text-lg font-semibold text-gray-900">💬 Help & Support</span>
          <span className="text-gray-400">→</span>
        </button>

        {/* About */}
        <button className="w-full bg-white rounded-2xl p-4 mb-6 flex items-center justify-between hover:shadow-md transition-all">
          <span className="text-lg font-semibold text-gray-900">ℹ️ About</span>
          <span className="text-gray-400">→</span>
        </button>

        {/* Logout Button */}
        <Button
          fullWidth
          variant="danger"
          size="lg"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
