import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Input, ProductCard, EmptyState } from '../../components';
import { useProductStore } from '../../stores/productStore';
import { useCartStore } from '../../stores/cartStore';
import { Product, ProductCategory } from '../../types/index';
import { debounce } from '../../utils/helpers';

export const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const { products, setFilters, filters } = useProductStore();
  const { addItem } = useCartStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  const handleSearch = useCallback(
    debounce((term: string | any) => {
      if (!term.trim()) {
        setFilteredProducts(products);
        return;
      }

      const term_lower = term.toLowerCase();
      const results = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term_lower) ||
          p.description.toLowerCase().includes(term_lower)
      );
      setFilteredProducts(results);
    }, 300),
    [products]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleCategoryToggle = (category: ProductCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ categories: newCategories });
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters({ priceRange: [min, max] });
  };

  const handleSortChange = (sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest') => {
    setFilters({ sortBy });
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
  };

  const displayProducts = filteredProducts.filter((p) => {
    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
      return false;
    }
    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
      return false;
    }
    if (filters.inStockOnly && !p.inStock) {
      return false;
    }
    return true;
  });

  React.useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-16 lg:pb-20">
      {/* Header */}
      <Header title="Search" showBack />

      {/* Search Input - Sticky */}
      <div className="sticky top-16 bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-4 z-20">
        <div className="max-w-7xl mx-auto">
          <Input
            placeholder="Search groceries..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            type="search"
            className="w-full"
          />
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="sticky top-32 bg-white border-b border-gray-200 px-4 md:px-6 lg:px-8 py-3 z-20">
        <div className="max-w-7xl mx-auto flex gap-2 md:gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-xl hover:border-primary-600 hover:bg-primary-50 font-semibold text-gray-700 transition-all text-sm whitespace-nowrap"
          >
            ⚙️ Filters
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as any)}
            className="px-4 py-2 border-2 border-gray-300 rounded-xl bg-white hover:border-primary-600 font-semibold text-gray-700 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 border-b border-gray-200 px-4 md:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Categories */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">📦 Categories</h3>
              <div className="space-y-3">
                {Object.values(ProductCategory).map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded-lg transition">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-5 h-5 rounded border-gray-300 accent-primary-600 cursor-pointer"
                    />
                    <span className="text-gray-700 capitalize font-medium">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">💲 Price Range</h3>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="0"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                  placeholder="Min"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:border-primary-600 focus:outline-none"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="number"
                  max="10000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                  placeholder="Max"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:border-primary-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Stock Filter */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">✅ Availability</h3>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded-lg transition">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => setFilters({ inStockOnly: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 accent-primary-600 cursor-pointer"
                />
                <span className="text-gray-700 font-medium">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="px-4 md:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {displayProducts.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No Products Found"
              description={`No products match your search${searchTerm ? ` for "${searchTerm}"` : ''}`}
              action={{
                label: 'Clear Search',
                onClick: () => {
                  setSearchTerm('');
                  setFilteredProducts(products);
                },
              }}
            />
          ) : (
            <>
              <p className="text-sm font-semibold text-gray-700 mb-6">
                Found <span className="text-primary-600">{displayProducts.length}</span> products
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayProducts.map((product) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
