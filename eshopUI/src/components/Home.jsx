import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to E-Shop</h1>
      <p>Your one-stop shop for all your needs!</p>
      
      {isAuthenticated ? (
        <div>
          <p>Welcome back, {user?.name}!</p>
          {isAdmin ? (
            <Link to="/admin/dashboard">
              <button style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}>
                Go to Admin Dashboard
              </button>
            </Link>
          ) : (
            <Link to="/user/dashboard">
              <button style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}>
                Go to Dashboard
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button style={{
              padding: '0.75rem 2rem',
              margin: '0.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              Login
            </button>
          </Link>
          <Link to="/register">
            <button style={{
              padding: '0.75rem 2rem',
              margin: '0.5rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;