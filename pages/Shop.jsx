import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';
import PageHero from '../components/PageHero';
import { API_ENDPOINTS } from '../src/constant/api';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes, subcategoriesRes] = await Promise.all([
        fetch(API_ENDPOINTS.PRODUCTS),
        fetch(API_ENDPOINTS.CATEGORIES),
        fetch(API_ENDPOINTS.SUBCATEGORIES)
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      const subcategoriesData = await subcategoriesRes.json();

      setProducts(productsData.data || []);
      setCategories(categoriesData.data || []);
      setSubcategories(subcategoriesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category_id === parseInt(selectedCategory);
      const matchesSubCategory = selectedSubCategory === 'All' || product.subcategory_id === parseInt(selectedSubCategory);
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [products, selectedCategory, selectedSubCategory, searchQuery]);

  // Filter subcategories based on selected category
  const filteredSubcategories = useMemo(() => {
    if (selectedCategory === 'All') {
      return subcategories;
    }
    return subcategories.filter(sub => sub.category_id === parseInt(selectedCategory));
  }, [subcategories, selectedCategory]);

  // Reset subcategory when category changes
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory('All');
  };

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
                  onClick={() => handleCategoryChange('All')}
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
                    onClick={() => handleCategoryChange(cat.id.toString())}
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

            {/* Subcategory Filter - Only show if category is selected */}
            {selectedCategory !== 'All' && filteredSubcategories.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Subcategories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubCategory('All')}
                    className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm ${
                      selectedSubCategory === 'All' 
                        ? 'bg-purple-600 text-white shadow-purple-200' 
                        : 'bg-white border border-gray-200 text-slate-700 hover:border-purple-300 hover:text-purple-600'
                    }`}
                  >
                    All Subcategories
                  </button>
                  {filteredSubcategories.map(subcat => (
                    <button
                      key={subcat.id}
                      onClick={() => setSelectedSubCategory(subcat.id.toString())}
                      className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm ${
                        selectedSubCategory === subcat.id.toString() 
                          ? 'bg-purple-600 text-white shadow-purple-200' 
                          : 'bg-white border border-gray-200 text-slate-700 hover:border-purple-300 hover:text-purple-600'
                      }`}
                    >
                      {subcat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

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