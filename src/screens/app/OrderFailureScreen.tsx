import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

export const OrderFailureScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Error Icon */}
      <div className="relative mb-8 w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
        <div className="text-5xl">❌</div>
      </div>

      {/* Content */}
      <div className="text-center max-w-md mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order Failed
        </h1>
        <p className="text-base text-gray-600 mb-2">
          We couldn't process your order at this time.
        </p>
        <p className="text-sm text-gray-500">
          Your payment information couldn't be verified. Please try again.
        </p>
      </div>

      {/* Error Details */}
      <div className="bg-red-50 rounded-2xl p-6 mb-8 max-w-md w-full border-2 border-red-200">
        <h3 className="font-bold text-gray-900 mb-3">⚠️ What Happened?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your payment could not be processed. This could be due to:
        </p>
        <ul className="text-sm text-gray-600 space-y-2 mb-4">
          <li>• Incorrect card details</li>
          <li>• Insufficient funds</li>
          <li>• Network error</li>
        </ul>
        <div className="bg-red-100 rounded p-2 text-xs font-mono text-red-700">
          Error: ERR_PAYMENT_FAILED
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 max-w-md w-full">
        <Button
          fullWidth
          size="lg"
          onClick={() => navigate('/checkout')}
        >
          Try Again
        </Button>
        <Button
          fullWidth
          variant="outline"
          size="lg"
          onClick={() => navigate('/cart')}
        >
          Back to Cart
        </Button>
        <Button
          fullWidth
          variant="secondary"
          size="lg"
          onClick={() => navigate('/home')}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};
