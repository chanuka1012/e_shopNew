import React from 'react';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.name || 'User'}!</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>My Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>Wishlist</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>0</p>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>Profile</h3>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;