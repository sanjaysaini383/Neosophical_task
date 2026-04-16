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
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-16 lg:pb-20">
      {/* Header */}
      <Header title="Search" showBack />

      {/* Search Input */}
      <div className="bg-white border-b border-gray-200 p-6 sticky top-16 z-20">
        <Input
          placeholder="Search groceries..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          type="search"
        />
      </div>

      {/* Filter and Sort Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex gap-3 justify-between md:justify-start md:gap-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-primary-600 hover:bg-green-50 font-semibold text-gray-700 transition"
        >
          ⚙️ Filters
        </button>

        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value as any)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-primary-600 font-semibold text-gray-700"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 p-6 md:grid md:grid-cols-3 md:gap-6">
          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">📦 Categories</h3>
            <div className="space-y-2">
              {Object.values(ProductCategory).map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 rounded border-gray-300 accent-primary-600"
                  />
                  <span className="text-gray-700 capitalize text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">💲 Price Range</h3>
            <div className="flex gap-3">
              <input
                type="number"
                min="0"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(Number(e.target.value), filters.priceRange[1])}
                placeholder="Min"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary-600 focus:outline-none"
              />
              <span className="text-gray-400 py-2">—</span>
              <input
                type="number"
                max="10000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value))}
                placeholder="Max"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-primary-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Stock Filter */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">✅ Availability</h3>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters({ inStockOnly: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 accent-primary-600"
              />
              <span className="text-gray-700 text-sm">In Stock Only</span>
            </label>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-6 pb-24 md:pb-0">
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
            <p className="text-sm text-gray-600 mb-4">
              Found {displayProducts.length} products
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
  );
};
