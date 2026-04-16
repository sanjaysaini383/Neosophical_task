import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

export const OrderSuccessScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-redirect after 10 seconds
      // Commented out to allow user to click buttons
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-16 lg:pb-20 flex flex-col items-center justify-center px-6">
      {/* Success Animation */}
      <div className="relative mb-8 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
        <div className="text-5xl text-primary-600">✓</div>
      </div>

      {/* Content */}
      <div className="text-center max-w-md mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order Placed Successfully!
        </h1>
        <p className="text-base text-gray-600 mb-4">
          Your order has been confirmed and will be delivered soon
        </p>
        <div className="bg-green-50 border-2 border-primary-600 rounded-lg p-3">
          <p className="text-sm text-gray-600 mb-1">Order ID</p>
          <p className="text-lg font-bold text-primary-600">#ORD123456</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8 max-w-md w-full border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">📋 Order Details</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-300">
            <span className="text-gray-600 text-sm">Estimated Delivery</span>
            <span className="font-bold text-gray-900">45 mins</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-300">
            <span className="text-gray-600 text-sm">Total Amount</span>
            <span className="font-bold text-gray-900">$35.99</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Status</span>
            <span className="px-4 py-1 bg-green-100 text-primary-600 rounded-full text-sm font-bold">
              Confirmed
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 max-w-md w-full">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate('/home')}
        >
          Continue Shopping
        </Button>
        <Button
          fullWidth
          variant="outline"
          size="lg"
          onClick={() => navigate('/account')}
        >
          📍 Track Order
        </Button>
      </div>
    </div>
  );
};
