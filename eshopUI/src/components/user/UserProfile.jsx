import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/user/profile');
        setProfile(prev => ({
          ...prev,
          name: response.data.name,
          email: response.data.email
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    // Validate passwords
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (profile.newPassword && profile.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put('/user/profile', {
        name: profile.name,
        currentPassword: profile.currentPassword || undefined,
        newPassword: profile.newPassword || undefined
      });
      
      setMessage('✅ Profile updated successfully!');
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Update user context with new name
      if (setUser) {
        setUser(prev => ({ ...prev, name: profile.name }));
      }
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '600px', 
      margin: '0 auto',
      minHeight: '80vh'
    }}>
      <h1 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>👤 My Profile</h1>
      <p style={{ color: '#7f8c8d', marginBottom: '2rem' }}>
        Manage your account information
      </p>
      
      {message && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          border: '1px solid #c3e6cb',
          animation: 'fadeIn 0.3s'
        }}>
          {message}
        </div>
      )}
      
      {error && (
        <div style={{
          backgroundColor: '#fde8e8',
          color: '#c0392b',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          border: '1px solid #f5c6cb',
          animation: 'fadeIn 0.3s'
        }}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#34495e'
          }}>
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ecf0f1',
              borderRadius: '6px',
              fontSize: '1rem',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3498db'}
            onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#34495e'
          }}>
            Email Address
          </label>
          <input
            type="email"
            value={profile.email}
            disabled
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #ecf0f1',
              borderRadius: '6px',
              fontSize: '1rem',
              backgroundColor: '#f8f9fa',
              color: '#7f8c8d'
            }}
          />
          <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
            ℹ️ Email address cannot be changed
          </p>
        </div>

        <div style={{ 
          borderTop: '2px solid #ecf0f1', 
          paddingTop: '1.5rem',
          marginTop: '0.5rem'
        }}>
          <h3 style={{ 
            marginBottom: '1rem',
            color: '#2c3e50',
            fontSize: '1.1rem'
          }}>
            🔒 Change Password
          </h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#34495e'
            }}>
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={profile.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #ecf0f1',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#34495e'
            }}>
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleChange}
              placeholder="Enter new password (min 6 characters)"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #ecf0f1',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500',
              color: '#34495e'
            }}>
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #ecf0f1',
                borderRadius: '6px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#3498db')}
          >
            {loading ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;