import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Star, Share2, ArrowLeft, Copy, Sparkles, Check, Truck, Shield } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { generateProductDescription, generateSocialMediaAd } from '../services/geminiService';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === Number(id));

  const [aiDescription, setAiDescription] = useState<string>('');
  const [adCopy, setAdCopy] = useState<string>('');
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [loadingAd, setLoadingAd] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="p-24 text-center">Product not found. <Link to="/shop" className="text-red-600 font-bold hover:underline">Return to shop</Link></div>;
  }

  // Related products logic (simple mock)
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  if (relatedProducts.length < 4) {
      // fill with others if not enough in category
      const others = PRODUCTS.filter(p => p.category !== product.category && p.id !== product.id).slice(0, 4 - relatedProducts.length);
      relatedProducts.push(...others);
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
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                  {[1,2,3,4].map(i => (
                      <div key={i} className="bg-gray-50 rounded-xl overflow-hidden aspect-square border border-gray-100 cursor-pointer hover:ring-2 hover:ring-red-500 transition-all">
                           <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
                      </div>
                  ))}
              </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-2">
                 <span className="text-red-600 font-bold text-xs bg-red-50 px-3 py-1.5 rounded-full uppercase tracking-wider">{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center mb-6 gap-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-slate-500 text-sm font-medium hover:text-slate-800 cursor-pointer border-b border-dashed border-slate-300">{product.reviews} Verified Reviews</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-slate-900">NPR {product.price.toLocaleString()}</span>
                <span className="text-slate-400 text-lg line-through decoration-2">NPR {(product.price * 1.2).toFixed(0)}</span>
                <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">20% OFF</span>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            <div className="flex gap-4 mb-10">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-slate-900 text-white py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
              >
                <ShoppingBag size={20} /> Add to Cart
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