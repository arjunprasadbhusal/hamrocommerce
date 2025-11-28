import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const OrderSuccess: React.FC = () => {
    const { clearCart } = useCart();
    
    // Clear the cart when this page loads
    useEffect(() => {
        clearCart();
        // Scroll to top
        window.scrollTo(0,0);
    }, []);

    const orderId = Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center border border-gray-100">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} className="text-green-600" />
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
                <p className="text-slate-500 mb-8">Thank you for your purchase. We have received your order.</p>
                
                <div className="bg-slate-50 p-6 rounded-2xl mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-slate-500">Order ID</span>
                        <span className="font-bold text-slate-900">#{orderId}</span>
                    </div>
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-slate-500">Date</span>
                        <span className="font-bold text-slate-900">{new Date().toLocaleDateString()}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Payment Method</span>
                        <span className="font-bold text-slate-900">Cash on Delivery</span>
                    </div>
                </div>
                
                <p className="text-sm text-slate-500 mb-8">
                    You will receive an email confirmation shortly. Our team will contact you before delivery.
                </p>

                <div className="space-y-3">
                    <Link to="/shop" className="block w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg">
                        Continue Shopping
                    </Link>
                    <Link to="/" className="block w-full bg-white text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all border border-slate-200">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;