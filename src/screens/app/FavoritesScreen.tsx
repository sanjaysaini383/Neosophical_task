import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, ProductCard, EmptyState } from '../../components';
import { useFavoritesStore } from '../../stores/favoritesStore';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { Product } from '../../types/index';

export const FavoritesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore();
  const { products } = useProductStore();
  const { addItem } = useCartStore();

  const favoriteProducts = favorites
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  const handleAddToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
    navigate('/cart');
  };

  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header showBack title="Favorites" />
        <div className="flex items-center justify-center h-96">
          <EmptyState
            icon="❤️"
            title="No Favorites Yet"
            description="Add items to your favorites to see them here"
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
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <Header showBack title="Favorites" />

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">❤️ My Favorites</h2>
            <p className="text-gray-600 text-sm mt-1">
              {favoriteProducts.length} item{favoriteProducts.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer"
            >
              <ProductCard
                product={product}
                onAddToCart={(quantity) => handleAddToCart(product, quantity)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
