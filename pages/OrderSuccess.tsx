import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ShoppingBag, Package, MapPin, CreditCard, Printer, Download, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const OrderSuccess = () => {
    const { clearCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [showAsModal, setShowAsModal] = useState(false);
    
    useEffect(() => {
        // Get order data from navigation state
        if (location.state && location.state.orderData) {
            setOrderData(location.state.orderData);
            setShowAsModal(location.state.showAsModal || false);
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }, [location]);

    // Generate order ID if not provided
    const orderId = orderData?.orderId || Math.floor(100000 + Math.random() * 900000);

    const handlePrint = () => {
        window.print();
    };

    const handleClose = () => {
        navigate('/cart');
    };

    const modalContent = (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        #invoice-section, #invoice-section * { visibility: visible; }
                        #invoice-section { position: absolute; left: 0; top: 0; width: 100%; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>
            
            <div className="max-w-4xl mx-auto">
                {/* Success Message - Not printed */}
                <div className="text-center mb-8 no-print">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
                    <p className="text-slate-600">
                        {orderData?.customerName ? `Thank you ${orderData.customerName}!` : 'Thank you for your order!'}
                    </p>
                </div>

                {/* Invoice Section - Printable */}
                <div id="invoice-section" className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
                    {/* Invoice Header */}
                    <div className="border-b-2 border-gray-200 pb-6 mb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">INVOICE</h2>
                                <p className="text-sm text-slate-600">Hamro Commerce</p>
                                <p className="text-sm text-slate-600">Nepal</p>
                            </div>
                            <div className="text-left md:text-right">
                                <div className="text-sm text-slate-600">Order ID</div>
                                <div className="text-2xl font-bold text-slate-900">#{orderId}</div>
                                <div className="text-sm text-slate-600 mt-2">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            </div>
                        </div>
                    </div>

                    {/* Customer & Delivery Info */}
                    {orderData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase mb-3">Bill To</h3>
                                <div className="text-slate-700">
                                    <p className="font-semibold">{orderData.customerName}</p>
                                    <p className="text-sm">{orderData.phone}</p>
                                    <p className="text-sm mt-2">{orderData.address}</p>
                                    <p className="text-sm">{orderData.city}{orderData.city && orderData.district ? ', ' : ''}{orderData.district}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 uppercase mb-3">Payment Details</h3>
                                <div className="text-slate-700">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm">Payment Method:</span>
                                        <span className="font-semibold text-sm">{orderData.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm">Total Items:</span>
                                        <span className="font-semibold text-sm">{orderData.totalItems}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Order Status:</span>
                                        <span className="font-semibold text-sm text-yellow-600">Pending</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Items */}
                    {orderData?.items && orderData.items.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-900 uppercase mb-4">Order Items</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="text-left py-3 text-sm font-semibold text-slate-700">Item</th>
                                            <th className="text-center py-3 text-sm font-semibold text-slate-700">Qty</th>
                                            <th className="text-right py-3 text-sm font-semibold text-slate-700">Price</th>
                                            <th className="text-right py-3 text-sm font-semibold text-slate-700">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderData.items.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-100">
                                                <td className="py-4 text-sm text-slate-700">{item.name}</td>
                                                <td className="py-4 text-center text-sm text-slate-700">{item.quantity}</td>
                                                <td className="py-4 text-right text-sm text-slate-700">NPR {item.price.toLocaleString()}</td>
                                                <td className="py-4 text-right text-sm font-semibold text-slate-900">NPR {(item.price * item.quantity).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Totals */}
                    <div className="border-t-2 border-gray-200 pt-6">
                        <div className="flex justify-end">
                            <div className="w-full md:w-1/2">
                                <div className="flex justify-between mb-3">
                                    <span className="text-slate-600">Subtotal:</span>
                                    <span className="font-semibold text-slate-900">NPR {orderData?.totalAmount?.toLocaleString() || '0'}</span>
                                </div>
                                <div className="flex justify-between mb-3">
                                    <span className="text-slate-600">Shipping:</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between mb-3">
                                    <span className="text-slate-600">Tax:</span>
                                    <span className="font-semibold text-slate-900">Included</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t-2 border-gray-200">
                                    <span className="text-lg font-bold text-slate-900">Total:</span>
                                    <span className="text-2xl font-bold text-red-600">NPR {orderData?.totalAmount?.toLocaleString() || '0'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-sm text-slate-600 text-center">
                            Thank you for shopping with us! For any queries, please contact our support team.
                        </p>
                        <p className="text-xs text-slate-500 text-center mt-2">
                            This is a computer-generated invoice and does not require a signature.
                        </p>
                    </div>
                </div>

                {/* Action Buttons - Not printed */}
                <div className="no-print space-y-3">
                    <button
                        onClick={handlePrint}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <Printer size={20} />
                        Print Invoice
                    </button>
                    <Link to="/cart" className="block w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg text-center">
                        View Cart
                    </Link>
                    <Link to="/shop" className="block w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg text-center">
                        Continue Shopping
                    </Link>
                    <Link to="/" className="block w-full bg-white text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-50 transition-all border border-slate-200 text-center">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );

    if (showAsModal) {
        return (
            <>
                {/* Modal Backdrop */}
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    onClick={handleClose}
                >
                    <div 
                        className="relative max-w-4xl w-full my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute -top-2 -right-2 bg-white text-slate-900 rounded-full p-2 shadow-lg hover:bg-slate-100 transition-colors z-10"
                            title="Close"
                        >
                            <X size={24} />
                        </button>
                        
                        {modalContent}
                    </div>
                </div>
            </>
        );
    }

    return modalContent;
}

export default OrderSuccess;