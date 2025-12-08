import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { API_ENDPOINTS } from '../src/constant/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Handle both API and mock data formats
  const productImage = product.photo_url || product.image || '/images/placeholder.jpg';
  const productCategory = product.category?.name || product.category || 'Uncategorized';
  const productPrice = parseFloat(product.price) || 0;
  const productRating = product.rating || 4.5;
  const productReviews = product.reviews || 0;

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      // Fetch fresh product data to get current stock
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(product.id));
      const result = await response.json();
      const freshProduct = result.data || result;
      
      // Add to cart with fresh stock data
      await addToCart(freshProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      // Fallback to current product if fetch fails
      await addToCart(product);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img 
            src={productImage} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder.jpg';
            }}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {productPrice < 3000 && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Best Value
                </span>
            )}
            {product.stock && product.stock < 10 && product.stock > 0 && (
                <span className="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Low Stock
                </span>
            )}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center gap-3">
             <Link 
                to={`/product/${product.id}`}
                className="bg-white text-slate-900 hover:bg-slate-900 hover:text-white p-3 rounded-full shadow-lg transition-colors"
                title="View Details"
             >
                <Eye size={18} />
             </Link>
             <button 
                onClick={handleAddToCart}
                className="bg-white text-slate-900 hover:bg-red-600 hover:text-white p-3 rounded-full shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add to Cart"
                disabled={!product.stock || product.stock === 0 || isAddingToCart}
             >
                <ShoppingBag size={18} />
             </button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">{productCategory}</div>
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-bold text-slate-900 text-lg leading-snug hover:text-red-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-4">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm font-bold text-slate-700">{productRating}</span>
          <span className="text-xs text-slate-400">({productReviews} reviews)</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">
            NPR {productPrice.toLocaleString()}
          </span>
          {product.stock !== undefined && (
            <span className={`text-xs font-semibold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;