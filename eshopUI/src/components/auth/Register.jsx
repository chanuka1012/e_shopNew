import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '3rem auto',
      padding: '2.5rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        color: '#2c3e50'
      }}>
        Create Account
      </h2>
      
      {error && (
        <div style={{
          backgroundColor: '#fde8e8',
          color: '#c0392b',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          marginBottom: '1.5rem',
          border: '1px solid #f5c6cb'
        }}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.25rem' }}>
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
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
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

        <div style={{ marginBottom: '1.25rem' }}>
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#34495e'
          }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password (min 6 characters)"
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
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
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

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.875rem',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#27ae60')}
          onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#2ecc71')}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p style={{ 
        textAlign: 'center', 
        marginTop: '1.5rem',
        color: '#7f8c8d'
      }}>
        Already have an account? <Link to="/login" style={{ 
          color: '#3498db',
          textDecoration: 'none',
          fontWeight: '500'
        }}>Login</Link>
      </p>
    </div>
  );
};

export default Register;