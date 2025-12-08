import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../src/constant/api';
import { ArrowLeft, Package, User, MapPin, Phone, CreditCard, Calendar, DollarSign, Hash } from 'lucide-react';

const OrderInformation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.ORDERS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        const foundOrder = data.orders.find(o => o.id === parseInt(id));
        setOrder(foundOrder);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order:', error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      setUpdating(true);
      setSuccessMessage('');
      setErrorMessage('');
      
      const token = localStorage.getItem('token');
      
      if (!token) {
        setErrorMessage('Authentication required. Please login again.');
        setUpdating(false);
        return;
      }
      
      const url = API_ENDPOINTS.ORDER_STATUS(id, newStatus);
      console.log('Updating order status:', { url, newStatus, orderId: id });
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.success) {
        setOrder(data.order);
        setSuccessMessage(`Order status updated to ${newStatus} successfully!`);
        // Auto hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
        // Refresh order details to get latest data
        fetchOrderDetails();
      } else {
        setErrorMessage(data.message || 'Failed to update order status. Please try again.');
      }
      setUpdating(false);
    } catch (error) {
      console.error('Error updating order:', error);
      setErrorMessage('Failed to update order status. Please check your connection and try again.');
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link to="/admin/orders" className="text-red-600 hover:underline">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </Link>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            Print Order
          </button>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
            <p className="text-gray-600 text-sm mt-1">Order ID: #{order.id}</p>
          </div>
          <div className="text-left lg:text-right">
            <div className="text-sm text-gray-600">Order Date</div>
            <div className="font-semibold text-gray-900">
              {new Date(order.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="text-sm text-gray-500">
              {new Date(order.created_at).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Product Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <Package className="text-red-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Product Information</h2>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {order.product?.photo_url && (
                  <div className="w-full sm:w-24 h-24 flex-shrink-0">
                    <img
                      src={order.product.photo_url}
                      alt={order.product.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg break-words">
                    {order.product?.name || 'N/A'}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {order.product?.description || 'No description available'}
                  </p>
                  <div className="mt-3 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4">
                    <div>
                      <span className="text-gray-600 text-sm">Price:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        NPR {order.price.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Quantity:</span>
                      <span className="ml-2 font-semibold text-gray-900">
                        {order.quantity}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Total:</span>
                      <span className="ml-2 font-bold text-red-600">
                        NPR {(order.price * order.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-red-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Customer Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="text-gray-600 mt-1 flex-shrink-0" size={20} />
                <div className="min-w-0">
                  <div className="text-sm text-gray-600">Full Name</div>
                  <div className="font-semibold text-gray-900 break-words">{order.name}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="text-gray-600 mt-1 flex-shrink-0" size={20} />
                <div className="min-w-0">
                  <div className="text-sm text-gray-600">Phone Number</div>
                  <div className="font-semibold text-gray-900 break-words">{order.phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg sm:col-span-2">
                <MapPin className="text-gray-600 mt-1 flex-shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-600">Delivery Address</div>
                  <div className="font-semibold text-gray-900 break-words">{order.address}</div>
                  <div className="text-sm text-gray-700 mt-1 break-words">
                    {order.city && <span>{order.city}, </span>}
                    {order.district && <span>{order.district}</span>}
                  </div>
                </div>
              </div>
              {order.user?.email && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg sm:col-span-2">
                  <Hash className="text-gray-600 mt-1 flex-shrink-0" size={20} />
                  <div className="min-w-0">
                    <div className="text-sm text-gray-600">Email Address</div>
                    <div className="font-semibold text-gray-900 break-all">{order.user.email}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-red-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Payment Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CreditCard className="text-gray-600 mt-1" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Payment Method</div>
                  <div className="font-semibold text-gray-900">{order.payment_method}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <DollarSign className="text-gray-600 mt-1" size={20} />
                <div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                  <div className="font-bold text-red-600 text-lg">
                    NPR {(order.price * order.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1">
          {/* Order Status */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Update Order Status</h3>
            
            {/* Success Message */}
            {successMessage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-green-800 font-medium">{successMessage}</span>
              </div>
            )}
            
            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-red-800 font-medium">{errorMessage}</span>
              </div>
            )}
            
            <div className="space-y-3">
              {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateOrderStatus(status)}
                  disabled={updating}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all text-sm ${
                    order.status === status
                      ? 'bg-red-600 text-white shadow-lg ring-2 ring-red-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {order.status === status && '✓ '}
                  {status}
                  {order.status === status && ' (Current)'}
                </button>
              ))}
            </div>
            {updating && (
              <div className="mt-4 text-center text-sm text-gray-600">
                Updating status...
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>NPR {(order.price * order.quantity).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-red-600">
                  NPR {(order.price * order.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h3 className="font-bold text-gray-800 mb-4">Order Timeline</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-green-600" size={16} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Order Placed</div>
                  <div className="text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  order.status !== 'Pending' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Package className={order.status !== 'Pending' ? 'text-green-600' : 'text-gray-400'} size={16} />
                </div>
                <div>
                  <div className={`font-semibold ${order.status !== 'Pending' ? 'text-gray-900' : 'text-gray-400'}`}>
                    Current Status
                  </div>
                  <div className="text-sm text-gray-600">{order.status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
