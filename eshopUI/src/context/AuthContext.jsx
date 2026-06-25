import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

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
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/user/info', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          });
          setUser(response.data);
          localStorage.setItem('role', response.data.role);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const response = await api.post('/login', params, {
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
      });
      
      if (response.status === 200) {
        const userInfo = await api.get('/user/info', {
          withCredentials: true
        });
        localStorage.setItem('role', userInfo.data.role);
        localStorage.setItem('token', 'authenticated');
        setUser(userInfo.data);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || error.response?.data || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/register', userData);
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
      await api.post('/logout', {}, { withCredentials: true });
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