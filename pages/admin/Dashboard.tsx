import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import LoadingSpinner from '../../components/LoadingSpinner';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  recentOrders: Array<{
    id: number;
    user_name: string;
    total: number;
    status: string;
    created_at: string;
  }>;
  lowStockProducts: Array<{
    id: number;
    name: string;
    stock: number;
  }>;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [minLoadingTime, setMinLoadingTime] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchDashboardData(token);
    
    // Enforce minimum 1 second, maximum 3 seconds loading time
    const minTimer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 1000);

    return () => clearTimeout(minTimer);
  }, [navigate]);

  const fetchDashboardData = async (token: string) => {
    const maxLoadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    try {
      const response = await fetch('http://192.168.100.91:8000/api/v1/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
        clearTimeout(maxLoadingTimer);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      clearTimeout(maxLoadingTimer);
      setLoading(false);
    }
  };

  if (loading || minLoadingTime) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Products</p>
                  <p className="text-2xl font-bold mt-2">{stats?.totalProducts || 0}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold mt-2">{stats?.totalOrders || 0}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold mt-2">Rs. {stats?.totalRevenue?.toLocaleString() || 0}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <p className="text-2xl font-bold mt-2">{stats?.totalUsers || 0}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders and Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
              </div>
              <div className="p-6">
                {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                        <div>
                          <p className="font-medium">{order.user_name}</p>
                          <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Rs. {order.total.toLocaleString()}</p>
                          <p className={`text-sm ${
                            order.status === 'Delivered' ? 'text-green-600' :
                            order.status === 'Processing' ? 'text-blue-600' :
                            order.status === 'Pending' ? 'text-yellow-600' :
                            'text-gray-600'
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent orders</p>
                )}
              </div>
            </div>

            {/* Low Stock Products */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Low Stock Alert</h2>
              </div>
              <div className="p-6">
                {stats?.lowStockProducts && stats.lowStockProducts.length > 0 ? (
                  <div className="space-y-4">
                    {stats.lowStockProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">Product ID: {product.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-600">{product.stock} left</p>
                          <p className="text-sm text-gray-500">Low Stock</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">All products in stock</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
