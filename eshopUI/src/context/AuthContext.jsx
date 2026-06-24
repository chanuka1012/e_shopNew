import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // You can add an endpoint to check current user
      // For now, we'll check localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Decode token or fetch user info
        setUser({ role: localStorage.getItem('role') });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Spring Security uses form-based login
      const response = await axios.post('/login', null, {
        params: { username: email, password: password },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      // If login successful, fetch user role
      const userInfo = await axios.get('/user/info');
      localStorage.setItem('role', userInfo.data.role);
      setUser(userInfo.data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setUser(null);
    }
  };

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    isUser: user?.role === 'USER'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};