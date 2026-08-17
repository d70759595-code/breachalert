import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { fetchWithAuth } from './api';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetchWithAuth('/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();

    const handleUnauthorized = () => setUser(null);
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  async function handleLogout() {
    try {
      await fetchWithAuth('/auth/logout', { method: 'POST' });
    } catch {
      setUser(null);
    } finally {
      setUser(null);
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-[#070707] flex items-center justify-center"></div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/support" element={<Support />} />
      <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
      <Route path="/settings" element={<Settings user={user} onLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;