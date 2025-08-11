import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loadUser } from './store/slices/authSlice';
import { loadCart } from './store/slices/cartSlice';
import { fetchCategories } from './store/slices/productSlice';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import ProductDetail from './components/pages/ProductDetail';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/pages/Profile';
import Orders from './components/pages/Orders';
import OrderDetail from './components/pages/OrderDetail';

function App() {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    // Load cart from localStorage
    dispatch(loadCart());
    
    // Load categories
    dispatch(fetchCategories());
    
    // Load user if token exists
    if (token && !isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, token, isAuthenticated]);

  return (
    <div className="App">
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
