import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/user/orders');
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': { bg: '#fff3cd', text: '#856404' },
      'PROCESSING': { bg: '#cce5ff', text: '#004085' },
      'SHIPPED': { bg: '#d4edda', text: '#155724' },
      'DELIVERED': { bg: '#d4edda', text: '#155724' },
      'CANCELLED': { bg: '#f8d7da', text: '#721c24' }
    };
    return colors[status] || colors['PENDING'];
  };

  const filteredOrders = filter === 'ALL' 
    ? orders 
    : orders.filter(order => order.status === filter);

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
        <div>Loading orders...</div>
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
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>📦 My Orders</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '2rem' }}>
        View and track all your orders
      </p>

      {/* Filter Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: filter === status ? '#3498db' : '#ecf0f1',
              color: filter === status ? 'white' : '#2c3e50',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s'
            }}
          >
            {status === 'ALL' ? '📋 All Orders' : status}
          </button>
        ))}
      </div>
      
      {filteredOrders.length === 0 ? (
        <div style={{
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
          <h3 style={{ color: '#2c3e50', margin: 0 }}>No orders found</h3>
          <p style={{ color: '#7f8c8d' }}>
            {filter === 'ALL' ? 'Start shopping to see your orders here.' : `No ${filter.toLowerCase()} orders.`}
          </p>
        </div>
      ) : (
        <div>
          {filteredOrders.map((order) => {
            const statusColors = getStatusColor(order.status);
            return (
              <div key={order.id} style={{
                padding: '1.5rem',
                marginBottom: '1rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid #ecf0f1',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h4 style={{ margin: 0, color: '#2c3e50' }}>
                      Order #{order.id}
                    </h4>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                      📅 {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                    </p>
                    {order.shippingAddress && (
                      <p style={{ margin: '0.25rem 0 0 0', color: '#7f8c8d', fontSize: '0.85rem' }}>
                        📍 {order.shippingAddress}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#2ecc71' }}>
                      ${order.totalAmount?.toFixed(2) || '0.00'}
                    </p>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      backgroundColor: statusColors.bg,
                      color: statusColors.text
                    }}>
                      {order.status || 'PENDING'}
                    </span>
                  </div>
                </div>
                
                {order.orderItems && order.orderItems.length > 0 && (
                  <div style={{ 
                    marginTop: '1rem', 
                    borderTop: '1px solid #ecf0f1', 
                    paddingTop: '1rem' 
                  }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                      🛍️ Items ({order.orderItems.length})
                    </h5>
                    {order.orderItems.map((item) => (
                      <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0.25rem 0',
                        borderBottom: '1px solid #f8f9fa'
                      }}>
                        <span style={{ color: '#2c3e50' }}>
                          {item.productName} <span style={{ color: '#7f8c8d' }}>× {item.quantity}</span>
                        </span>
                        <span style={{ fontWeight: '500' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#7f8c8d'
          }}>
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;