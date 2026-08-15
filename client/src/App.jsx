import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Support from './pages/Support';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';

function getInitialToken() {
  const params = new URLSearchParams(window.location.search);
  return params.get('token') || null;
}

function App() {
  const [token, setToken] = useState(getInitialToken);

  // Clean the ?token=... out of the visible URL once we've captured it into state.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('token')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  function handleLogin(newToken) {
    setToken(newToken);
  }

  function handleLogout() {
    setToken(null);
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/support" element={<Support />} />
      <Route path="/dashboard" element={<Dashboard token={token} onLogout={handleLogout} />} />
      <Route path="/settings" element={<Settings token={token} onLogout={handleLogout} />} />
    </Routes>
  );
}

export default App;