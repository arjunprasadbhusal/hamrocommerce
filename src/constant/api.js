// API Base URL
export const API_BASE_URL = 'http://192.168.100.91:8000/api/v1';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  REGISTER: `${API_BASE_URL}/register`,
  LOGIN: `${API_BASE_URL}/login`,
  LOGOUT: `${API_BASE_URL}/logout`,

  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,

  // Categories
  CATEGORIES: `${API_BASE_URL}/categories`,
  CATEGORY_BY_ID: (id) => `${API_BASE_URL}/categories/${id}`,

  // Brands
  BRANDS: `${API_BASE_URL}/brands`,
  BRAND_BY_ID: (id) => `${API_BASE_URL}/brands/${id}`,

  // Companies
  COMPANIES: `${API_BASE_URL}/companies`,
  COMPANY_BY_ID: (id) => `${API_BASE_URL}/companies/${id}`,

  // Cart
  MY_CART: `${API_BASE_URL}/mycart`,
  CART: `${API_BASE_URL}/cart`,
  CART_UPDATE: (id) => `${API_BASE_URL}/cart/${id}`,
  CHECKOUT: (id) => `${API_BASE_URL}/checkout/${id}`,

  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  MY_ORDERS: `${API_BASE_URL}/myorders`,
  ORDER_STATUS: (id, status) => `${API_BASE_URL}/orders/${id}/status/${status}`,
  ORDER_ESEWA: (cartid) => `${API_BASE_URL}/orders/esewa/${cartid}`,

  // Dashboard (Admin)
  DASHBOARD: `${API_BASE_URL}/dashboard`,
  DASHBOARD_SALES: `${API_BASE_URL}/dashboard/sales`,
  DASHBOARD_USERS: `${API_BASE_URL}/dashboard/users`,
  DASHBOARD_PRODUCTS: `${API_BASE_URL}/dashboard/products`,
};
