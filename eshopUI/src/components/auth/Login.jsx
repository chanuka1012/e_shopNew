import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
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
        Welcome Back
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
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div style={{ marginBottom: '1.5rem' }}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>

      <p style={{ 
        textAlign: 'center', 
        marginTop: '1.5rem',
        color: '#7f8c8d'
      }}>
        Don't have an account? <Link to="/register" style={{ 
          color: '#3498db',
          textDecoration: 'none',
          fontWeight: '500'
        }}>Register</Link>
      </p>
    </div>
  );
};

export default Login;