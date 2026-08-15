import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = 'http://localhost:3000';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      onLogin(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSignup() {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      onLogin(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  function handleGoogleLogin() {
    window.location.href = `${API_BASE}/auth/google`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08),_transparent_60%)] px-4">
      <div className="glass-panel rounded-2xl p-10 w-full max-w-md border border-white/5">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-surface-container-lowest border border-primary/30 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">shield_person</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-on-surface tracking-tight">System Access</h1>
          <p className="font-body text-sm text-on-surface-variant/70 mt-1">Authenticate to continue to Security Console</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium text-sm py-3 rounded-lg hover:bg-gray-100 transition-all mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.87 2.68-6.61z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33C2.44 15.98 5.48 18 9 18z"/>
            <path fill="#FBBC05" d="M3.97 10.72c-.18-.54-.28-1.12-.28-1.72s.1-1.18.28-1.72V4.95H.96A8.996 8.996 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/>
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
          </svg>
          Sign in with Google
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="font-mono text-[10px] text-outline-variant uppercase">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-outline-variant mb-1 block">Operator ID / Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">person</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-surface-container-low border border-white/10 rounded-lg pl-10 pr-4 py-2.5 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                placeholder="operator@breachalert.net"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-mono text-[10px] uppercase tracking-widest text-outline-variant block">Passphrase</label>
              <button type="button" className="font-mono text-[10px] text-primary hover:underline">Recover Access</button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-lg">key</span>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border border-white/10 rounded-lg pl-10 pr-4 py-2.5 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                placeholder="••••••••••••••"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="rounded border-white/20 bg-surface-container-low"
            />
            <span className="font-body text-sm text-on-surface-variant">Maintain persistent session</span>
          </label>

          {error && (
            <p className="text-error text-sm font-mono bg-error/10 border border-error/20 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-mono text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-blue-600 transition-all glow-primary"
          >
            Initialize Connection
            <span className="material-symbols-outlined text-sm">login</span>
          </button>

          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary/20 transition-all"
          >
            Create New Account
          </button>
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="font-mono text-[10px] text-outline-variant hover:text-primary transition-colors">← Back to homepage</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;