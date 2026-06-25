import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import UserOrders from './components/user/UserOrders';
import UserProfile from './components/user/UserProfile';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* User Routes */}
            <Route path="/user/dashboard" element={
              <ProtectedRoute requiredRole="USER">
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/user/orders" element={
              <ProtectedRoute requiredRole="USER">
                <UserOrders />
              </ProtectedRoute>
            } />
            
            <Route path="/user/profile" element={
              <ProtectedRoute requiredRole="USER">
                <UserProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;