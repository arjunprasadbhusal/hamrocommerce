import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, MapPin, ShieldCheck, CheckCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cartTotal, cart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        navigate('/order-success');
    }, 2000);
  }

  if (cart.length === 0) {
      navigate('/cart');
      return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
      
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg"><MapPin size={24}/></div>
                    <h2 className="text-xl font-bold text-slate-900">Shipping Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                        <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" />
                    </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Street Address</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">City</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">District</label>
                         <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all">
                             <option>Kathmandu</option>
                             <option>Lalitpur</option>
                             <option>Bhaktapur</option>
                             <option>Pokhara</option>
                             <option>Chitwan</option>
                         </select>
                    </div>
                </div>
            </div>

            {/* Payment Info */}
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CreditCard size={24}/></div>
                    <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                </div>
                
                <div className="space-y-4">
                    <label className="flex items-center gap-4 p-4 border border-red-500 bg-red-50/50 rounded-xl cursor-pointer transition-all">
                        <input type="radio" name="payment" className="w-5 h-5 text-red-600" defaultChecked />
                        <div className="flex-1">
                            <span className="font-bold text-slate-900 block">Cash On Delivery</span>
                            <span className="text-sm text-slate-500">Pay with cash when your order arrives.</span>
                        </div>
                        <Truck className="text-red-600" />
                    </label>

                    <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50/30 transition-all opacity-60">
                         <input type="radio" name="payment" className="w-5 h-5 text-green-600" disabled />
                         <div className="flex-1">
                            <span className="font-bold text-slate-900 block">eSewa Mobile Wallet</span>
                            <span className="text-sm text-slate-500">Coming soon...</span>
                        </div>
                    </label>
                     <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50/30 transition-all opacity-60">
                         <input type="radio" name="payment" className="w-5 h-5 text-purple-600" disabled />
                         <div className="flex-1">
                            <span className="font-bold text-slate-900 block">Khalti Digital Wallet</span>
                            <span className="text-sm text-slate-500">Coming soon...</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
             <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 sticky top-24 border border-gray-100">
                <h3 className="font-bold text-lg text-slate-900 mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden">
                                    <img src={item.image} alt="" className="w-full h-full object-cover"/>
                                </div>
                                <span className="text-slate-600 font-medium">x{item.quantity} {item.name}</span>
                            </div>
                            <span className="text-slate-900">{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                 <div className="space-y-4 mb-8 border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span>NPR {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 text-lg border-t border-dashed border-gray-200 pt-4">
                        <span>Total</span>
                        <span>NPR {cartTotal.toLocaleString()}</span>
                    </div>
                </div>

                <button 
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-70 disabled:cursor-wait"
                >
                    {loading ? 'Processing...' : 'Place Order'}
                </button>
                
                <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                    <ShieldCheck size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
                </div>
             </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout;