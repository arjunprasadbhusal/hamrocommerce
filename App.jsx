import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/Products/ProductLIst';
import AddProduct from './pages/admin/Products/AddProduct';
import EditProduct from './pages/admin/Products/EditProduct';
import EditCategory from './pages/admin/categories/EditCategory';
import CategoryList from './pages/admin/categories/CategoryList';
import AddCategory from './pages/admin/categories/AddCategory';
import SubcategoryList from './pages/admin/subcategory/SubcategoryList';
import AddSubcategory from './pages/admin/subcategory/AddSubcategory';
import EditSubcategory from './pages/admin/subcategory/EditSubcategory';
import BrandList from './pages/admin/brands/BrandList';
import AddBrand from './pages/admin/brands/Addbrand';
import EditBrand from './pages/admin/brands/EditBrand';
import OrderList from './pages/admin/orders/OrderList';
import OrderInformation from './pages/admin/orders/OrderInformation';

import AIChatAssistant from './components/AIChatAssistant';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/shop" element={<Layout><Shop /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/order-success" element={<Layout><OrderSuccess /></Layout>} />

          {/* Auth Routes without Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes without Layout */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/:id/edit" element={<EditProduct />} />

          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/categories/add" element={<AddCategory />} />
          <Route path="/admin/categories/:id/edit" element={<EditCategory />} />

          <Route path="/admin/subcategories" element={<SubcategoryList />} />
          <Route path="/admin/subcategories/add" element={<AddSubcategory />} />
          <Route path="/admin/subcategories/:id/edit" element={<EditSubcategory />} />  

          <Route path="/admin/brands" element={<BrandList />} />
          <Route path="/admin/brands/add" element={<AddBrand />} />
          <Route path="/admin/brands/:id/edit" element={<EditBrand />} />

          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/orders/:id" element={<OrderInformation />} />
        </Routes>
        {/* Floating AI Assistant available on all pages */}
        <AIChatAssistant />
      </Router>
    </CartProvider>
  );
};

export default App;