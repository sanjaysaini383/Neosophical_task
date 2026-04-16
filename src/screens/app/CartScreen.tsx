import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, EmptyState } from '../../components';
import { useCartStore } from '../../stores/cartStore';
import { useProductStore } from '../../stores/productStore';
import { formatCurrency } from '../../utils/helpers';

export const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, updateQuantity, removeItem } = useCartStore();
  const { getProductById } = useProductStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header showBack title="Shopping Cart" />
        <div className="flex items-center justify-center h-96">
          <EmptyState
            icon="🛒"
            title="Your Cart is Empty"
            description="Start shopping to add items to your cart"
            action={{
              label: 'Continue Shopping',
              onClick: () => navigate('/home'),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-0">
      {/* Header */}
      <Header showBack title="Shopping Cart" />

      {/* Cart Items */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="space-y-4">
          {items.map((cartItem) => {
            const product = getProductById(cartItem.productId);
            if (!product) return null;

            return (
              <div key={cartItem.productId} className="bg-white rounded-lg p-4 flex gap-4">
                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.unit}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(cartItem.productId, cartItem.quantity - 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold">{cartItem.quantity}</span>
                    <button
                      onClick={() => updateQuantity(cartItem.productId, cartItem.quantity + 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(cartItem.productId)}
                    className="text-danger text-sm font-semibold hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-2xl p-6 sticky bottom-0 md:static md:mt-8 shadow-md">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Delivery Fee</span>
              <span className="font-semibold text-gray-900">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between text-lg">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-primary-600 text-xl">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button
            fullWidth
            size="lg"
            onClick={() => navigate('/checkout')}
          >
            Go to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
