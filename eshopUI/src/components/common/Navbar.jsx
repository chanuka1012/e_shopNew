import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { totalItems } = useCart(); // Add this to get cart item count
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '1rem 2rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          🛒 E-Shop
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {isAuthenticated ? (
          <>
            <span style={{ color: '#ecf0f1' }}>
              Welcome, {user?.name || user?.email || 'User'}!
            </span>
            
            {/* Cart Link with Badge */}
            <Link to="/cart" style={{ 
              color: 'white', 
              textDecoration: 'none',
              position: 'relative',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              🛒 Cart
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '0.7rem',
                  minWidth: '18px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAdmin ? (
              <>
                <span style={{ 
                  backgroundColor: '#e74c3c', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  ADMIN
                </span>
                <Link to="/admin/dashboard" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s'
                }}>
                  Dashboard
                </Link>
              </>
            ) : (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '1px solid #7f8c8d',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  My Account ▼
                </button>
                {dropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'white',
                    color: '#2c3e50',
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    minWidth: '180px',
                    zIndex: 1000,
                    marginTop: '0.5rem',
                    overflow: 'hidden'
                  }}>
                    <Link to="/user/dashboard" style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: '#2c3e50',
                      textDecoration: 'none',
                      borderBottom: '1px solid #ecf0f1',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      📊 Dashboard
                    </Link>
                    <Link to="/user/orders" style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: '#2c3e50',
                      textDecoration: 'none',
                      borderBottom: '1px solid #ecf0f1',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      📦 My Orders
                    </Link>
                    <Link to="/user/profile" style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: '#2c3e50',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      👤 Profile
                    </Link>
                  </div>
                )}
              </div>
            )}
            
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              transition: 'background-color 0.3s'
            }}>
              Login
            </Link>
            <Link to="/register" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              backgroundColor: '#3498db',
              borderRadius: '4px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;