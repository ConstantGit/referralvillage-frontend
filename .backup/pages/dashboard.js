import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/api';
import Cookies from 'js-cookie';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const userData = await auth.getMe();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="dashboard">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">ReferralVillage</div>
          <button onClick={handleLogout} style={{ width: 'auto' }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="dashboard">
          <h1>Welcome to your Dashboard</h1>
          
          {user && (
            <div style={{ marginTop: '2rem' }}>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}

          <div style={{ marginTop: '3rem', padding: '2rem', background: '#f0f0f0', borderRadius: '8px' }}>
            <h2>Coming Soon</h2>
            <p style={{ marginTop: '1rem' }}>
              {user?.role === 'AGENT' 
                ? 'Your referral dashboard, network connections, and commission tracking will appear here.'
                : 'Your vendor dashboard, service listings, and lead management will appear here.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
