import { useState, useEffect } from 'react';
import EmailList from './EmailList';
import BreachTimeline from './BreachTimeline';

const API_BASE = 'http://localhost:3000';

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [dashboard, setDashboard] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setToken(data.token);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      setToken(data.token);
    } catch (err) {
      setAuthError(err.message);
    }
  }

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setDashboard);
  }, [token]);

  if (!token) {
    return (
      <div style={{ maxWidth: 400, margin: '4rem auto', fontFamily: 'sans-serif' }}>
        <h1>BreachAlert</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
          />
          <button onClick={handleLogin} style={{ marginRight: 8 }}>Log In</button>
          <button onClick={handleSignup}>Sign Up</button>
        </form>
        {authError && <p style={{ color: 'red' }}>{authError}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>BreachAlert Dashboard</h1>
      {dashboard ? (
        <>
          <EmailList emails={dashboard.emails} />
          <BreachTimeline events={dashboard.timeline} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;