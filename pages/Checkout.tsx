import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, MapPin, ShieldCheck, CheckCircle } from 'lucide-react';
import { API_ENDPOINTS } from '../src/constant/api';

const Checkout = () => {
  const { cartTotal, cart, clearCart, removeFromCart, updateQuantity, fetchCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Track selected items for checkout (all selected by default)
  const [selectedItems, setSelectedItems] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    district: 'Kathmandu',
    paymentMethod: 'Cash On Delivery'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedItems).every(val => val);
    const newState = cart.reduce(
      (acc, item) => ({ ...acc, [item.id]: !allSelected }),
      {}
    );
    setSelectedItems(newState);
  };

  // Calculate total for selected items only
  const selectedTotal = cart
    .filter(item => selectedItems[item.id])
    .reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Check if at least one item is selected
    if (selectedCount === 0) {
      setError('Please select at least one item to checkout');
      setLoading(false);
      return;
    }
    
    try {
      // Get auth token
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Please login to place an order');
        navigate('/login');
        return;
      }
      
      // Filter only selected items
      const itemsToOrder = cart.filter(item => selectedItems[item.id]);
      
      // Place order for each selected cart item
      const orderPromises = itemsToOrder.map(item => 
        fetch(API_ENDPOINTS.ORDERS, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            product_id: item.id,
            price: item.price,
            quantity: item.quantity,
            payment_method: formData.paymentMethod,
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            district: formData.district
          })
        }).then(res => res.json())
      );
      
      const results = await Promise.all(orderPromises);
      
      // Check if all orders were successful
      const allSuccessful = results.every(result => result.success);
      
      if (allSuccessful) {
        // Prepare order data to pass to success page
        const orderData = {
          orderId: results[0]?.order?.id || Math.floor(100000 + Math.random() * 900000),
          customerName: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          paymentMethod: formData.paymentMethod,
          totalItems: itemsToOrder.length,
          totalAmount: selectedTotal,
          items: itemsToOrder.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        };
        
        // Remove ordered items from cart or update quantities
        const removalPromises = itemsToOrder.map(async (item) => {
          const cartItem = cart.find(c => c.id === item.id);
          if (cartItem && cartItem.quantity > item.quantity) {
            // If cart has more than ordered, reduce the quantity
            await updateQuantity(item.id, cartItem.quantity - item.quantity);
          } else {
            // Remove completely if ordering all items
            await removeFromCart(item.id);
          }
        });
        
        // Wait for all cart updates to complete
        await Promise.all(removalPromises);
        
        // Refresh cart from backend to get updated data
        const token = localStorage.getItem('token');
        if (token && typeof fetchCart === 'function') {
          await fetchCart();
        }
        
        // Show bill as modal/popup by navigating to success page
        navigate('/order-success', { state: { orderData, showAsModal: true } });
      } else {
        setError('Some orders failed. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
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
                        <input 
                          required 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                        <input 
                          required 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" 
                        />
                    </div>
                     <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Street Address</label>
                        <input 
                          required 
                          type="text" 
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">City</label>
                        <input 
                          required 
                          type="text" 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">District</label>
                         <select 
                           name="district"
                           value={formData.district}
                           onChange={handleInputChange}
                           className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                         >
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
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="Cash On Delivery"
                          checked={formData.paymentMethod === 'Cash On Delivery'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-red-600" 
                        />
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-slate-900">Order Summary</h3>
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    {Object.values(selectedItems).every(val => val) ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                        <div key={item.id} className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={selectedItems[item.id] || false}
                              onChange={() => toggleItemSelection(item.id)}
                              className="mt-1 w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                            />
                            <div className="flex-1 flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden">
                                        <img 
                                          src={item.photo_url || item.image || '/images/placeholder.jpg'} 
                                          alt="" 
                                          className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-slate-900 font-medium block">{item.name}</span>
                                        <span className="text-slate-500 text-xs">Qty: {item.quantity}</span>
                                    </div>
                                </div>
                                <span className={`text-slate-900 font-semibold ${!selectedItems[item.id] ? 'opacity-40' : ''}`}>
                                  NPR {(item.price * item.quantity).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                 <div className="space-y-4 mb-8 border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-slate-600">
                        <span>Subtotal ({selectedCount} item{selectedCount !== 1 ? 's' : ''})</span>
                        <span>NPR {selectedTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 text-lg border-t border-dashed border-gray-200 pt-4">
                        <span>Total</span>
                        <span>NPR {selectedTotal.toLocaleString()}</span>
                    </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <button 
                    disabled={loading || selectedCount === 0}
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : `Place Order (${selectedCount} item${selectedCount !== 1 ? 's' : ''})`}
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