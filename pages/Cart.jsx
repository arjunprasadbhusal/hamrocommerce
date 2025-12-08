import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-red-50 text-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything yet. Explore our top categories and find something you love.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-colors font-semibold shadow-lg shadow-red-200">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/shop" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Shopping Cart <span className="text-base md:text-lg font-normal text-slate-400">({cart.length} items)</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Fixed size image for mobile responsiveness */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                 <img 
                   src={item.photo_url || item.image || '/images/placeholder.jpg'} 
                   alt={item.name} 
                   className="w-full h-full object-cover"
                   onError={(e) => {
                     e.target.src = '/images/placeholder.jpg';
                   }}
                 />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[10px] md:text-xs font-semibold text-red-600 uppercase tracking-wider">
                          {item.category?.name || item.category || 'Product'}
                        </span>
                        <h3 className="font-bold text-base md:text-lg text-slate-900 mt-1 line-clamp-2">{item.name}</h3>
                    </div>
                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                        <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-2 md:mt-4 gap-3 sm:gap-0">
                  <div className="font-bold text-lg md:text-xl text-slate-900">
                    NPR {(parseFloat(item.price) * item.quantity).toLocaleString()} 
                    <span className="text-xs font-normal text-slate-400 block">
                      NPR {parseFloat(item.price).toLocaleString()} / each
                    </span>
                    {item.stock !== undefined && (
                      <span className={`text-xs font-semibold block mt-1 ${
                        item.quantity >= item.stock ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {item.quantity >= item.stock ? `Max stock reached (${item.stock})` : `${item.stock} available`}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100 w-max">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:text-red-600 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.stock !== undefined && item.quantity >= item.stock}
                      title={item.stock !== undefined && item.quantity >= item.stock ? `Only ${item.stock} units available` : ''}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end">
            <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-700 hover:underline font-medium">
                Remove all items
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/50 sticky top-24">
            <h3 className="font-bold text-xl text-slate-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-600 text-sm md:text-base">
                <span>Subtotal</span>
                <span className="font-medium">NPR {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm md:text-base">
                <span>Shipping Estimate</span>
                <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-sm">Free</span>
              </div>
              <div className="flex justify-between text-slate-600 text-sm md:text-base">
                <span>Tax Estimate</span>
                <span className="font-medium">Included</span>
              </div>
              <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-end">
                <span className="font-bold text-slate-900 text-lg">Total</span>
                <span className="font-bold text-slate-900 text-2xl">NPR {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg group"
            >
              Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
               {/* Mock payment icons */}
               <div className="h-6 w-10 bg-blue-900 rounded"></div>
               <div className="h-6 w-10 bg-green-600 rounded"></div>
               <div className="h-6 w-10 bg-purple-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;