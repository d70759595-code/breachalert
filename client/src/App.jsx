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
  const [newEmail, setNewEmail] = useState('');
  const [addStatus, setAddStatus] = useState('');

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

  function loadDashboard(activeToken) {
    fetch(`${API_BASE}/dashboard`, {
      headers: { Authorization: `Bearer ${activeToken}` }
    })
      .then(res => res.json())
      .then(setDashboard);
  }

  useEffect(() => {
    if (!token) return;
    loadDashboard(token);
  }, [token]);

  async function handleAddEmail(e) {
    e.preventDefault();
    setAddStatus('');
    try {
      const res = await fetch(`${API_BASE}/emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: newEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not add email');
      setAddStatus('Verification link sent — check the server console (stub mailer).');
      setNewEmail('');
      loadDashboard(token);
    } catch (err) {
      setAddStatus(err.message);
    }
  }

  async function handleScanNow(emailId) {
    try {
      const res = await fetch(`${API_BASE}/emails/${emailId}/scan-now`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Scan request failed');
      // Give the worker a moment to process, then refresh the dashboard.
      setTimeout(() => loadDashboard(token), 2000);
    } catch (err) {
      console.error(err);
    }
  }

  // ---------- LOGGED OUT: Login / Signup ----------
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08),_transparent_60%)]">
        <div className="glass-panel rounded-2xl p-10 w-full max-w-md border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary">shield_person</span>
            <h1 className="font-display text-2xl font-bold text-on-surface tracking-tight">BreachAlert</h1>
          </div>
          <p className="font-body text-sm text-on-surface-variant/70 mb-8">Sign in to your security console.</p>

          <form className="space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-outline-variant mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-outline-variant mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                placeholder="••••••••"
              />
            </div>

            {authError && (
              <p className="text-error text-sm font-mono bg-error/10 border border-error/20 rounded-lg px-3 py-2">{authError}</p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleLogin}
                className="flex-1 bg-primary text-white font-mono text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-blue-600 transition-all glow-primary"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="flex-1 bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary/20 transition-all"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ---------- LOGGED IN: Command Center ----------
  const emails = dashboard?.emails || [];
  const timeline = dashboard?.timeline || [];
  const verifiedCount = emails.filter(e => e.verified).length;
  const healthScore = emails.length === 0 ? 100 : Math.round(((emails.length - timeline.length) / emails.length) * 100);
  const scoreClamped = Math.max(0, Math.min(100, healthScore));
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (scoreClamped / 100) * circumference;

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.05),_transparent_60%)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-4">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-on-surface mb-2 font-bold tracking-tight">Command Center</h2>
          <p className="font-body text-sm text-on-surface-variant/80">Real-time threat monitoring and identity status.</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container/50 border border-white/5 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Vigilance Active</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
          {/* Health score */}
          <section className="glass-panel rounded-2xl p-8 flex flex-col items-center border border-white/5">
            <div className="w-full flex justify-between items-center mb-6">
              <h3 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">health_and_safety</span> Overall Health
              </h3>
            </div>
            <div className="relative w-48 h-48 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-surface-variant/50" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="4" />
                <circle
                  className="text-primary transition-all duration-1000 ease-out"
                  cx="50" cy="50" fill="none" r="45"
                  stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-5xl text-on-surface font-bold tracking-tighter">{scoreClamped}</span>
                <span className="font-mono text-[10px] text-primary/70 tracking-widest mt-1">/ 100</span>
              </div>
            </div>
            <div className="bg-surface-container-high/50 rounded-xl p-4 w-full border border-white/5">
              <p className="font-body text-sm text-on-surface-variant text-center">
                {timeline.length === 0
                  ? 'No breaches detected across your monitored identities.'
                  : <>Found <span className="text-error font-medium">{timeline.length} breach{timeline.length !== 1 ? 'es' : ''}</span> across your monitored identities.</>}
              </p>
            </div>
          </section>

          {/* Add email */}
          <section className="glass-panel rounded-2xl p-6 border border-white/5">
            <h3 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-sm">add_moderator</span> Add Target
            </h3>
            <form onSubmit={handleAddEmail} className="flex gap-2">
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="new-email@example.com"
                className="flex-1 bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60"
              />
              <button type="submit" className="bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition-all">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </form>
            {addStatus && <p className="font-mono text-xs text-on-surface-variant/80 mt-3">{addStatus}</p>}
          </section>

          {/* Priority Alerts */}
          <BreachTimeline events={timeline} />
        </div>

        {/* Right column */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
          <EmailList emails={emails} verifiedCount={verifiedCount} onScanNow={handleScanNow} />
        </div>
      </div>
    </div>
  );
}

export default App;