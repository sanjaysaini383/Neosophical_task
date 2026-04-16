import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Button } from '../../components';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { calculateDiscount, getDiscountText } from '../../utils/helpers';

export const ProductDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProductStore();
  const { addItem } = useCartStore();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const [quantity, setQuantity] = useState(1);

  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-white pb-32 md:pb-16 lg:pb-20 flex flex-col">
        <Header showBack title="Product" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    navigate('/cart');
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-16 lg:pb-20">
      {/* Header */}
      <Header showBack title="Product Details" />

      {/* Product Image */}
      <div className="relative h-64 md:h-96 bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
        >
          {favorite ? '❤️' : '🤍'}
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 right-4 bg-danger text-white px-3 py-1 rounded-full font-bold text-sm">
            {getDiscountText(product.discount)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Price Section */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-sm text-gray-600 mb-3">{product.unit}</p>
          
          <div className="flex items-baseline gap-3">
            <p className="text-3xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </p>
            {product.discount && (
              <p className="text-lg text-gray-400 line-through">
                ${calculateDiscount(product.price, product.discount).toFixed(2)}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⭐</span>
            <span className="font-semibold text-gray-900">{product.rating}</span>
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">Quantity</p>
          <div className="flex items-center gap-4 border border-gray-300 rounded-lg w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-semibold"
            >
              −
            </button>
            <span className="px-6 py-2 text-lg font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-semibold"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          fullWidth
          size="lg"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add To Basket' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};
