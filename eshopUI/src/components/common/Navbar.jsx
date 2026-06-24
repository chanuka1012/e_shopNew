import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem' }}>
          E-Shop
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.name || 'User'}</span>
            {isAdmin && (
              <Link to="/admin/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
                Admin Dashboard
              </Link>
            )}
            {!isAdmin && (
              <Link to="/user/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;