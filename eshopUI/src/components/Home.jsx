import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  return (
    <div style={{ 
      padding: '3rem 2rem', 
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem',
        color: '#2c3e50'
      }}>
        🛒 Welcome to E-Shop
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        color: '#7f8c8d',
        marginBottom: '2rem'
      }}>
        Your one-stop shop for all your needs!
      </p>
      
      {isAuthenticated ? (
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            👋 Welcome back, <strong>{user?.name || 'User'}</strong>!
          </p>
          <p style={{ color: '#7f8c8d', marginBottom: '2rem' }}>
            {isAdmin 
              ? 'You are logged in as an administrator.' 
              : 'You are logged in as a customer.'}
          </p>
          
          {isAdmin ? (
            <Link to="/admin/dashboard">
              <button style={{
                padding: '0.75rem 2.5rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                📊 Go to Admin Dashboard
              </button>
            </Link>
          ) : (
            <Link to="/user/dashboard">
              <button style={{
                padding: '0.75rem 2.5rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                📊 Go to Dashboard
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            marginBottom: '1.5rem'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#7f8c8d', marginBottom: '1.5rem' }}>
              Get started by creating an account or logging in.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login">
              <button style={{
                padding: '0.75rem 2.5rem',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                🔑 Login
              </button>
            </Link>
            <Link to="/register">
              <button style={{
                padding: '0.75rem 2.5rem',
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#27ae60'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2ecc71'}
              >
                📝 Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;