import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">ReferralVillage</div>
          <div>
            {isLoggedIn ? (
              <Link href="/dashboard">
                <button>Dashboard</button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <button style={{ marginRight: '1rem', width: 'auto' }}>Login</button>
                </Link>
                <Link href="/register">
                  <button style={{ width: 'auto' }}>Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container">
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Welcome to ReferralVillage
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '3rem' }}>
            Connect, refer, and grow your real estate network
          </p>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flex: '1', maxWidth: '300px' }}>
              <h2 style={{ marginBottom: '1rem' }}>For Agents</h2>
              <p style={{ color: '#666' }}>
                Expand your network and earn referral commissions by connecting with agents nationwide.
              </p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flex: '1', maxWidth: '300px' }}>
              <h2 style={{ marginBottom: '1rem' }}>For Vendors</h2>
              <p style={{ color: '#666' }}>
                Connect with real estate professionals and grow your business through quality referrals.
              </p>
            </div>
          </div>

          {!isLoggedIn && (
            <div style={{ marginTop: '3rem' }}>
              <Link href="/register">
                <button style={{ fontSize: '1.25rem', padding: '1rem 2rem', width: 'auto' }}>
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
