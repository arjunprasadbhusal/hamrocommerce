import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.price < 3000 && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Best Value
                </span>
            )}
            {product.id % 3 === 0 && (
                <span className="bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    New
                </span>
            )}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center gap-3">
             <button 
                onClick={() => addToCart(product)}
                className="bg-white text-slate-900 hover:bg-red-600 hover:text-white p-3 rounded-full shadow-lg transition-colors"
                title="Add to Cart"
             >
                <ShoppingBag size={18} />
             </button>
             <Link 
                to={`/product/${product.id}`}
                className="bg-white text-slate-900 hover:bg-slate-900 hover:text-white p-3 rounded-full shadow-lg transition-colors"
                title="View Details"
             >
                <Eye size={18} />
             </Link>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">{product.category}</div>
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-bold text-slate-900 text-lg leading-snug hover:text-red-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-4">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-sm font-bold text-slate-700">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">
            NPR {product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;