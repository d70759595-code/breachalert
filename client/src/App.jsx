import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import { fetchWithAuth } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function checkAuthStatus() {
    try {
      const res = await fetchWithAuth('/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuthStatus();

    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  async function handleLoginSuccess(userData) {
    setUser(userData);
    await checkAuthStatus();
  }

  async function handleLogout() {
    try {
      await fetchWithAuth('/auth/logout', { method: 'POST' });
    } catch (err) {}
    setUser(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070707] text-[#F5F5F5] flex items-center justify-center font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A2A] animate-ping" />
          <span>Verifying Command Center Session...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing user={user} onLogout={handleLogout} />} />
      <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
      <Route path="/pricing" element={<Pricing user={user} />} />
      <Route path="/support" element={<Support user={user} />} />
      <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
      <Route path="/settings" element={<Settings user={user} onLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;