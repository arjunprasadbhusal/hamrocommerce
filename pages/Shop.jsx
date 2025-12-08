import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';
import PageHero from '../components/PageHero';
import { API_ENDPOINTS } from '../src/constant/api';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        fetch(API_ENDPOINTS.PRODUCTS),
        fetch(API_ENDPOINTS.CATEGORIES),
        fetch(API_ENDPOINTS.BRANDS)
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const brandsData = await brandsRes.json();

      setProducts(productsData.data || []);
      setCategories(categoriesData.data || []);
      setBrands(brandsData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category_id === parseInt(selectedCategory);
      const matchesBrand = selectedBrand === 'All' || product.brand_id === parseInt(selectedBrand);
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [products, selectedCategory, selectedBrand, searchQuery]);

  return (
    <div>
      <PageHero 
        title="Our Shop" 
        subtitle="Explore our wide range of authentic products."
        backgroundImage="/images/shop.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-24">
            <div className="text-xl text-slate-600">Loading products...</div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCategory === 'All' ? 'All Products' : categories.find(c => c.id === parseInt(selectedCategory))?.name}
                </h2>
                <p className="text-slate-500 text-sm mt-1">Showing {filteredProducts.length} items</p>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search products..."
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm ${
                    selectedCategory === 'All' 
                      ? 'bg-red-600 text-white shadow-red-200' 
                      : 'bg-white border border-gray-200 text-slate-700 hover:border-red-300 hover:text-red-600'
                  }`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id.toString())}
                    className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm ${
                      selectedCategory === cat.id.toString() 
                        ? 'bg-red-600 text-white shadow-red-200' 
                        : 'bg-white border border-gray-200 text-slate-700 hover:border-red-300 hover:text-red-600'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Brands</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBrand('All')}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm ${
                    selectedBrand === 'All' 
                      ? 'bg-blue-600 text-white shadow-blue-200' 
                      : 'bg-white border border-gray-200 text-slate-700 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  All Brands
                </button>
                {brands.map(brand => (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrand(brand.id.toString())}
                    className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm ${
                      selectedBrand === brand.id.toString() 
                        ? 'bg-blue-600 text-white shadow-blue-200' 
                        : 'bg-white border border-gray-200 text-slate-700 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
                <h3 className="text-xl font-medium text-slate-900">No products found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;