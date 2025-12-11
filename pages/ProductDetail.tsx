import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, Share2, ArrowLeft, Copy, Sparkles, Check, Truck, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { generateProductDescription, generateSocialMediaAd } from '../services/geminiService';
import ProductCard from '../components/ProductCard';
import { API_ENDPOINTS } from '../src/constant/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [aiDescription, setAiDescription] = useState('');
  const [adCopy, setAdCopy] = useState('');
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [loadingAd, setLoadingAd] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id));
      const result = await response.json();
      const productData = result.data || result;
      setProduct(productData);

      // Fetch related products from same category
      const productsResponse = await fetch(API_ENDPOINTS.PRODUCTS);
      const productsResult = await productsResponse.json();
      const allProducts = productsResult.data || productsResult;
      const related = allProducts.filter(p => 
        p.category_id === productData.category_id && p.id !== productData.id
      ).slice(0, 4);
      
      // Fill with other products if not enough in category
      if (related.length < 4) {
        const others = allProducts.filter(p => 
          p.category_id !== productData.category_id && p.id !== productData.id
        ).slice(0, 4 - related.length);
        related.push(...others);
      }
      
      setRelatedProducts(related);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-24 text-center">Loading product details...</div>;
  }

  if (!product) {
    return <div className="p-24 text-center">Product not found. <Link to="/shop" className="text-red-600 font-bold hover:underline">Return to shop</Link></div>;
  }

  const handleGenerateDescription = async () => {
    setLoadingDesc(true);
    const desc = await generateProductDescription(product.name, `${product.category}, ${product.shortDescription}`);
    setAiDescription(desc);
    setLoadingDesc(false);
  };

  const handleGenerateAd = async () => {
    setLoadingAd(true);
    const ad = await generateSocialMediaAd(product.name);
    setAdCopy(ad);
    setLoadingAd(false);
  }

  const handleAddToCart = async () => {
    try {
      // Refetch product to get latest stock
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id));
      const result = await response.json();
      const freshProduct = result.data || result;
      
      // Update local product state with fresh data
      setProduct(freshProduct);
      
      // Add to cart with fresh stock data
      await addToCart(freshProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      // Fallback to current product if fetch fails
      await addToCart(product);
    }
  };

  // Calculate available stock considering cart quantity
  const cartItem = cart.find(item => item.product_id === product?.id || item.product?.id === product?.id);
  const availableStock = product ? product.stock - (cartItem?.quantity || 0) : 0;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center text-slate-500 hover:text-red-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image */}
          <div className="space-y-4">
              <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square shadow-sm border border-gray-100">
                <img 
                  src={product.photo_url || '/images/placeholder.jpg'} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                  {[1,2,3,4].map(i => (
                      <div key={i} className="bg-gray-50 rounded-xl overflow-hidden aspect-square border border-gray-100 cursor-pointer hover:ring-2 hover:ring-red-500 transition-all">
                           <img 
                             src={product.photo_url || '/images/placeholder.jpg'} 
                             alt="Thumbnail" 
                             className="w-full h-full object-cover opacity-70 hover:opacity-100"
                             onError={(e) => {
                               e.target.src = '/images/placeholder.jpg';
                             }}
                           />
                      </div>
                  ))}
              </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-2">
                 <span className="text-red-600 font-bold text-xs bg-red-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
                   {product.category?.name || 'General'}
                 </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center mb-6 gap-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-slate-500 text-sm font-medium hover:text-slate-800 cursor-pointer border-b border-dashed border-slate-300">0 Verified Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-slate-900">NPR {Number(product.price).toLocaleString()}</span>
                <span className="text-slate-400 text-lg line-through decoration-2">NPR {(Number(product.price) * 1.2).toFixed(0)}</span>
                <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">20% OFF</span>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-2">Description</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {product.description || 'No description available'}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-slate-600">
                <span className="font-bold">Brand:</span> {product.brand?.name || 'N/A'}
              </p>
              <p className="text-slate-600">
                <span className="font-bold">Stock:</span> {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
                {cartItem && cartItem.quantity > 0 && (
                  <span className="ml-2 text-sm text-blue-600">({cartItem.quantity} in cart)</span>
                )}
              </p>
            </div>

            <div className="flex gap-4 mb-10">
              <button 
                onClick={handleAddToCart}
                disabled={availableStock <= 0}
                className={`flex-1 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200 ${
                  availableStock <= 0
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <ShoppingBag size={20} /> {availableStock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button className="p-4 rounded-full border border-gray-200 text-slate-600 hover:bg-slate-50 transition-colors">
                <Share2 size={24} />
              </button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Truck className="text-slate-900" size={24} />
                    <div>
                        <p className="font-bold text-slate-900 text-sm">Free Shipping</p>
                        <p className="text-xs text-slate-500">On orders over 5k</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <Shield className="text-slate-900" size={24} />
                    <div>
                        <p className="font-bold text-slate-900 text-sm">1 Year Warranty</p>
                        <p className="text-xs text-slate-500">Official Guarantee</p>
                    </div>
                </div>
            </div>

            {/* AI Tools Section */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100 shadow-sm">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Sparkles className="text-purple-600" size={18} /> 
                Hamro AI Assistant
              </h3>
              
              <div className="space-y-4">
                {/* Description Generator */}
                <div>
                  {!aiDescription ? (
                    <button 
                      onClick={handleGenerateDescription}
                      disabled={loadingDesc}
                      className="text-sm text-purple-700 font-bold hover:underline flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-lg transition-colors"
                    >
                     {loadingDesc ? 'Generating...' : '✨ Generate Detailed Description'}
                    </button>
                  ) : (
                    <div className="bg-white p-5 rounded-xl border border-purple-100 text-sm text-slate-600 leading-relaxed shadow-sm animate-fade-in-up">
                      <p className="mb-2 font-bold text-purple-800 text-xs uppercase tracking-wide">AI Generated Description</p>
                      {aiDescription}
                    </div>
                  )}
                </div>

                 {/* Ad Generator */}
                 <div>
                  {!adCopy ? (
                    <button 
                      onClick={handleGenerateAd}
                      disabled={loadingAd}
                      className="text-sm text-blue-600 font-bold hover:underline flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                    >
                     {loadingAd ? 'Writing...' : '📢 Generate Social Media Ad'}
                    </button>
                  ) : (
                    <div className="bg-white p-5 rounded-xl border border-blue-100 text-sm text-slate-600 leading-relaxed shadow-sm animate-fade-in-up relative group">
                      <p className="mb-2 font-bold text-blue-800 text-xs uppercase tracking-wide">Facebook / Instagram Copy</p>
                      <p className="whitespace-pre-wrap font-medium">{adCopy}</p>
                      <button 
                          onClick={() => navigator.clipboard.writeText(adCopy)}
                          className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-blue-600 bg-gray-50 rounded-md hover:bg-blue-50 transition-colors"
                          title="Copy to clipboard"
                      >
                          <Copy size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {/* Related Products */}
        <div className="border-t border-gray-100 pt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;