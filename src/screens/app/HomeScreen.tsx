import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, ProductCard, SkeletonLoader, EmptyState } from '../../components';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { useLocationStore } from '../../stores/locationStore';
import { useAuthStore } from '../../stores/authStore';
import { mockProducts } from '../../data/mockProducts';
import { ProductCategory, Product } from '../../types/index';
import { simulateDelay } from '../../utils/helpers';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setProducts, filteredProducts } = useProductStore();
  const { addItem } = useCartStore();
  const { selectedLocation } = useLocationStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await simulateDelay(800);
      setProducts(mockProducts);
      setLoading(false);
    };

    loadProducts();
  }, [setProducts]);

  const categories = Object.values(ProductCategory);
  const displayProducts = selectedCategory
    ? filteredProducts.filter((p) => p.category === selectedCategory)
    : filteredProducts;

  const handleAddToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Top Bar with Location */}
      <div className="bg-white px-6 py-3 flex justify-between items-center sticky top-0 z-30 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📍</span>
          <div>
            <p className="text-xs text-gray-600">Delivering to</p>
            <p className="text-sm font-semibold text-gray-900 max-w-xs truncate">
              {selectedLocation?.address.split(',')[0] || 'Select Location'}
            </p>
          </div>
        </div>
        <span className="text-2xl cursor-pointer">👤</span>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-6 py-3 border-b border-gray-200">
        <button
          onClick={() => navigate('/search')}
          className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-500 text-left hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <span>🔍</span> Search store
        </button>
      </div>

      {/* Exclusive Offer Banner */}
      <div className="mx-6 mt-4 p-4 bg-gradient-to-r from-secondary to-orange-500 rounded-lg text-white">
        <p className="font-semibold">Exclusive Offer</p>
        <p className="text-sm">Get 10% OFF on your first order</p>
      </div>

      {/* Best Selling Section */}
      <div className="px-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Fresh Vegetables</h2>
          <a href="#" className="text-primary-600 text-sm font-semibold">See all</a>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.slice(0, 4).map((product) => (
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

      {/* Exclusive Offer Section */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Exclusive Offer</h2>
          <a href="#" className="text-primary-600 text-sm font-semibold">See all</a>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.filter(p => p.discount).slice(0, 4).map((product) => (
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

      {/* Categories Section */}
      <div className="px-6 mt-8 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.slice(0, 8).map((category, idx) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="p-4 bg-gray-50 rounded-xl text-center hover:bg-primary-50 transition-colors border border-gray-200"
            >
              <div className="text-4xl mb-2">
                {['🥬', '🍎', '🥩', '🐟', '🥐', '🥤', '🥛', '🌾'][idx]}
              </div>
              <p className="text-xs text-gray-700 font-medium capitalize truncate">
                {category}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Best Selling Section */}
      <div className="px-6 mt-8 pb-20 md:pb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Best Selling</h2>
          <a href="#" className="text-primary-600 text-sm font-semibold">See all</a>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <SkeletonLoader count={8} />
          </div>
        ) : displayProducts.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No Products Found"
            description="No products found"
            action={{
              label: 'View All Products',
              onClick: () => setSelectedCategory(null),
            }}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayProducts.slice(0, 10).map((product) => (
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
        )}
      </div>
    </div>
  );
};
