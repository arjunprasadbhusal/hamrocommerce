import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../../src/constant/api';
import { Eye, Package, Clock, CheckCircle, XCircle, Truck, Trash2 } from 'lucide-react';
import Sidebar from '../Sidebar'

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.ORDERS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (order) => {
    setDeleteConfirm(order);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.ORDER_DELETE(deleteConfirm.id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Order deleted successfully! Stock has been restored.');
        setOrders(orders.filter(o => o.id !== deleteConfirm.id));
        setDeleteConfirm(null);
      } else {
        alert(data.message || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
    }
  };

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'pending':
        return <Clock size={16} />;
      case 'processing':
        return <Package size={16} />;
      case 'shipped':
        return <Truck size={16} />;
      case 'delivered':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Package size={16} />;
    }
  };

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filter.toLowerCase());

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 overflow-x-hidden lg:ml-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Orders Management</h1>
            <p className="text-gray-600 text-sm mt-1">View and manage all customer orders</p>
          </div>
        </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div className="flex gap-2 p-2 border-b overflow-x-auto scrollbar-hide">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm whitespace-nowrap transition-colors ${
                filter === status
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
              <span className="ml-1 md:ml-2 text-xs">
                ({status === 'All' 
                  ? orders.length 
                  : orders.filter(o => o.status.toLowerCase() === status.toLowerCase()).length
                })
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Customer
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Location
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Phone
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                  Date
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-6 py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm font-semibold text-gray-900">#{order.id}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-xs md:text-sm font-medium text-gray-900">{order.name}</div>
                      <div className="text-xs text-gray-500">{order.user?.email || 'N/A'}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <div className="text-xs md:text-sm text-gray-900 truncate max-w-[150px] md:max-w-none">{order.product?.name || 'N/A'}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 hidden lg:table-cell">
                      <div className="text-xs md:text-sm text-gray-900">{order.city || 'N/A'}</div>
                      <div className="text-xs text-gray-500">{order.district || 'N/A'}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-xs md:text-sm text-gray-900">{order.phone}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-xs md:text-sm font-medium text-gray-900">{order.quantity}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm font-semibold text-gray-900">
                        NPR {(order.price * order.quantity).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <span className="hidden md:inline">{getStatusIcon(order.status)}</span>
                        <span className="truncate">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                      <div className="text-xs md:text-sm text-gray-900">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                      <div className="flex items-center gap-1 md:gap-2">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                          title="View Order"
                        >
                          <Eye size={16} />
                          <span className="hidden md:inline">View</span>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(order)}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                          <span className="hidden md:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <div className="text-sm text-gray-600">Pending Orders</div>
          <div className="text-2xl font-bold text-gray-900">
            {orders.filter(o => o.status.toLowerCase() === 'pending').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <div className="text-sm text-gray-600">Processing Orders</div>
          <div className="text-2xl font-bold text-gray-900">
            {orders.filter(o => o.status.toLowerCase() === 'processing').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <div className="text-sm text-gray-600">Delivered Orders</div>
          <div className="text-2xl font-bold text-gray-900">
            {orders.filter(o => o.status.toLowerCase() === 'delivered').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-500">
          <div className="text-sm text-gray-600">Total Orders</div>
          <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete order #{deleteConfirm.id} for {deleteConfirm.name}? 
              This action will restore {deleteConfirm.quantity} unit(s) to the product stock.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default OrderList;
