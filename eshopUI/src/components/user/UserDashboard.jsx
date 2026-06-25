import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    wishlistCount: 0,
    cartItems: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user stats
        const statsResponse = await axios.get('/user/stats');
        setStats(statsResponse.data);

        // Fetch user profile
        const profileResponse = await axios.get('/user/profile');
        setProfile(profileResponse.data);

        // Fetch recent orders
        const ordersResponse = await axios.get('/user/orders');
        setRecentOrders(ordersResponse.data.orders?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <div>Loading dashboard...</div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      minHeight: '80vh'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#2c3e50' }}>📊 My Dashboard</h1>
          <p style={{ color: '#7f8c8d', margin: '0.5rem 0 0 0' }}>
            Welcome back, {profile?.name || user?.name || 'User'}!
          </p>
        </div>
        <div>
          <span style={{ 
            backgroundColor: '#3498db', 
            color: 'white', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '20px',
            fontSize: '0.85rem'
          }}>
            🎉 Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #ecf0f1',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/user/orders')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>📦</span>
            <div>
              <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem', fontWeight: '500' }}>
                Total Orders
              </h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0.25rem 0 0 0', color: '#3498db' }}>
                {stats.totalOrders}
              </p>
            </div>
          </div>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #ecf0f1',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>💰</span>
            <div>
              <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem', fontWeight: '500' }}>
                Total Spent
              </h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0.25rem 0 0 0', color: '#2ecc71' }}>
                ${stats.totalSpent?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #ecf0f1',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>❤️</span>
            <div>
              <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem', fontWeight: '500' }}>
                Wishlist
              </h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0.25rem 0 0 0', color: '#e74c3c' }}>
                {stats.wishlistCount}
              </p>
            </div>
          </div>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #ecf0f1',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>🛒</span>
            <div>
              <h3 style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem', fontWeight: '500' }}>
                Cart Items
              </h3>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0.25rem 0 0 0', color: '#f39c12' }}>
                {stats.cartItems}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
      }}>
        {/* Recent Orders */}
        <div>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#2c3e50'
          }}>
            📋 Recent Orders
            <button 
              onClick={() => navigate('/user/orders')}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#3498db',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              View All →
            </button>
          </h3>
          
          {recentOrders.length === 0 ? (
            <div style={{
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              textAlign: 'center',
              color: '#7f8c8d'
            }}>
              <p style={{ margin: 0, fontSize: '1.1rem' }}>No orders yet. Start shopping!</p>
            </div>
          ) : (
            recentOrders.map((order) => (
              <div key={order.id} style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #ecf0f1',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'box-shadow 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#2c3e50' }}>
                    Order #{order.id}
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#7f8c8d' }}>
                    {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#2ecc71' }}>
                    ${order.totalAmount?.toFixed(2) || '0.00'}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: 
                      order.status === 'DELIVERED' ? '#d4edda' :
                      order.status === 'CANCELLED' ? '#f8d7da' :
                      '#fff3cd',
                    color: 
                      order.status === 'DELIVERED' ? '#155724' :
                      order.status === 'CANCELLED' ? '#721c24' :
                      '#856404'
                  }}>
                    {order.status || 'PENDING'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Profile Card */}
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>👤 Profile</h3>
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #ecf0f1'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#3498db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '2.5rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {profile?.name?.charAt(0) || user?.name?.charAt(0) || 'U'}
              </div>
              <h4 style={{ margin: '0.75rem 0 0 0', color: '#2c3e50' }}>
                {profile?.name || user?.name || 'User'}
              </h4>
              <p style={{ margin: '0.25rem 0 0 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                {profile?.email || user?.email}
              </p>
            </div>
            
            <div style={{ borderTop: '1px solid #ecf0f1', paddingTop: '1rem' }}>
              <button
                onClick={() => navigate('/user/profile')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;