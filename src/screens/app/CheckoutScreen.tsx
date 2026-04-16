import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button, Input, Card } from '../../components';
import { useCartStore } from '../../stores/cartStore';
import { useLocationStore } from '../../stores/locationStore';
import { useProductStore } from '../../stores/productStore';
import { simulateDelay } from '../../utils/helpers';

export const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const { selectedLocation } = useLocationStore();
  const { getProductById } = useProductStore();

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(totalPrice * 0.1);
      alert('Promo code applied! You get 10% OFF');
    } else if (promoCode) {
      alert('Invalid promo code');
    }
  };

  const finalTotal = totalPrice - discount;
  const deliveryFee = 2.99;
  const grandTotal = finalTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    setLoading(true);
    await simulateDelay(2000);
    clearCart();
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pb-32 md:pb-16 lg:pb-20">
        <Header showBack title="Checkout" />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Button onClick={() => navigate('/home')}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-40 md:pb-20 lg:pb-24">
      {/* Header */}
      <Header showBack title="Checkout" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">📍 Delivery Address</h2>
              <button className="text-primary-600 text-sm font-semibold hover:text-primary-700">
                Change
              </button>
            </div>
            {selectedLocation && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-bold text-gray-900">{selectedLocation.name}</p>
                <p className="text-gray-600 text-sm mt-1">{selectedLocation.address}</p>
              </div>
            )}
          </Card>

          {/* Order Items */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🛒 Order Items</h2>
            <div className="space-y-3">
              {items.map((cartItem) => {
                const product = getProductById(cartItem.productId);
                if (!product) return null;

                return (
                  <div key={cartItem.productId} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-0">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{cartItem.quantity} × ${product.price.toFixed(2)}</p>
                    </div>
                    <p className="font-bold text-gray-900">
                      ${(product.price * cartItem.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Promo Code */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">🎟️ Promo Code</h2>
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button onClick={handlePromoCode} variant="secondary">
                Apply
              </Button>
            </div>
            <p className="text-xs text-primary-600 mt-2 font-semibold">Try: WELCOME10 for 10% Off</p>
          </Card>

          {/* Payment Method */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">💳 Payment Method</h2>
            <div className="space-y-3">
              {[
                { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                { id: 'wallet', label: 'Digital Wallet', icon: '👛' },
                { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
              ].map((method) => (
                <label key={method.id} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2 transition ${selectedPayment === method.id ? 'border-primary-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 accent-primary-600"
                  />
                  <span className="text-lg">{method.icon}</span>
                  <span className="text-gray-900 font-medium">{method.label}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Right - Order Summary (Sticky on Desktop) */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 text-sm">
                  <span>Discount</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Delivery Fee</span>
                <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-primary-600">${grandTotal.toFixed(2)}</span>
            </div>

            <Button
              fullWidth
              size="lg"
              loading={loading}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing order you agree to our{' '}
              <span className="text-primary-600 font-semibold">Terms & Conditions</span>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
