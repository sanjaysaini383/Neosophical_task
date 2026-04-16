import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, ProductCard, SkeletonLoader, EmptyState } from '../../components';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { useLocationStore } from '../../stores/locationStore';
import { mockProducts } from '../../data/mockProducts';
import { ProductCategory, Product } from '../../types/index';
import { simulateDelay } from '../../utils/helpers';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setProducts, filteredProducts } = useProductStore();
  const { addItem } = useCartStore();
  const { selectedLocation } = useLocationStore();
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
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-16 lg:pb-20">
      <Header title="Nectar" showCart cartCount={0} />

      {/* Location and Profile Bar - Mobile only */}
      <div className="md:hidden bg-white px-4 py-3 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl flex-shrink-0">📍</span>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-600">Delivering to</p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {selectedLocation?.address.split(',')[0] || 'Select Location'}
            </p>
          </div>
        </div>
        <button onClick={() => navigate('/account')} className="text-xl flex-shrink-0">👤</button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-8">
        {/* Search Bar */}
        <div>
          <button
            onClick={() => navigate('/search')}
            className="w-full px-4 py-3 md:py-4 bg-gray-100 rounded-xl text-gray-500 text-left hover:bg-gray-200 transition-colors flex items-center gap-3 font-medium"
          >
            <span className="text-lg">🔍</span> Search store
          </button>
        </div>

        {/* Exclusive Offer Banner */}
        <div className="p-6 bg-gradient-to-r from-secondary to-orange-500 rounded-2xl text-white shadow-md">
          <p className="font-bold text-lg mb-1">Exclusive Offer</p>
          <p className="text-base opacity-90">Get 10% OFF on your first order</p>
        </div>

        {/* Fresh Vegetables Section */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-900">Fresh Vegetables</h2>
            <a href="#" className="text-primary-600 text-sm font-semibold hover:underline">See all →</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
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
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-900">Exclusive Offer</h2>
            <a href="#" className="text-primary-600 text-sm font-semibold hover:underline">See all →</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
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
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {categories.slice(0, 8).map((category, idx) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-5 md:p-6 rounded-2xl text-center transition-all border-2 ${
                  selectedCategory === category
                    ? 'bg-primary-50 border-primary-600 shadow-md'
                    : 'bg-white border-gray-200 hover:border-primary-600 hover:bg-primary-50'
                }`}
              >
                <div className="text-4xl md:text-5xl mb-3">
                  {['🥬', '🍎', '🥩', '🐟', '🥐', '🥤', '🥛', '🌾'][idx]}
                </div>
                <p className="text-xs md:text-sm text-gray-700 font-semibold capitalize truncate">
                  {category}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Best Selling Section */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-gray-900">Best Selling</h2>
            <a href="#" className="text-primary-600 text-sm font-semibold hover:underline">See all →</a>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
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
    </div>
  );
};
