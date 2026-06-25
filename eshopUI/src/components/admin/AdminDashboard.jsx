import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard...</div>;
  }


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name || user?.email || 'Admin'}!</p>
      <p style={{ color: '#6c757d' }}>Role: <strong>Administrator</strong></p>
      
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
          border: '1px solid #dee2e6',
          textAlign: 'left'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#007bff' }}>
            {stats.totalUsers}
          </p>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          textAlign: 'left'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Total Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#28a745' }}>
            {stats.totalProducts}
          </p>
        </div>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          textAlign: 'left'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Total Orders</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#ffc107' }}>
            {stats.totalOrders}
          </p>
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        backgroundColor: '#e9ecef', 
        borderRadius: '8px',
        textAlign: 'left'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Manage Users
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Manage Products
          </button>
          <button style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ffc107',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;