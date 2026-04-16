import React from 'react';
import { Product } from '../types/index';
import { useFavoritesStore } from '../stores/favoritesStore';
import { formatCurrency, calculateDiscount, getDiscountText } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
  variant?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  variant = 'grid',
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setQuantity(1);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  if (variant === 'list') {
    return (
      <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.unit}</p>
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(product.price)}
              </p>
              {product.discount && (
                <p className="text-xs text-gray-500 line-through">
                  {formatCurrency(calculateDiscount(product.price, product.discount))}
                </p>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 bg-secondary text-white px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
            {getDiscountText(product.discount)}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 left-3 bg-white rounded-full p-2 hover:bg-gray-100 shadow-sm transition-colors"
        >
          {favorite ? '❤️' : '🤍'}
        </button>

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">
          {product.name}
        </h3>

        {/* Unit */}
        <p className="text-xs text-gray-500 mt-1 font-medium">{product.unit}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
          <span>⭐ {product.rating}</span>
          <span className="text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </p>
          {product.discount && (
            <p className="text-xs text-gray-400 line-through">
              {formatCurrency(calculateDiscount(product.price, product.discount))}
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center border-2 border-gray-200 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-gray-600 hover:bg-gray-50 font-semibold"
              disabled={!product.inStock}
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-bold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-50 font-semibold"
              disabled={!product.inStock}
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-primary-600 text-white py-2 rounded-xl font-bold hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
