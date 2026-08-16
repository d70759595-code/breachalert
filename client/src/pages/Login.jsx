import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE = 'http://localhost:3000';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    const endpoint = isSignup ? '/auth/signup' : '/auth/login';
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      onLogin(data.token, remember);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  function handleGoogleLogin() {
    window.location.href = `${API_BASE}/auth/google`;
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col justify-between p-6">
      <header className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-[#FF6A2A]">🛡</span>
          <span className="font-bold text-white tracking-tight">BREACH<span className="text-[#FF6A2A]">ALERT</span></span>
        </Link>
        <Link to="/" className="text-xs font-mono text-neutral-400 hover:text-white">← Back to home</Link>
      </header>

      <main className="max-w-md mx-auto w-full my-12">
        <div className="rounded-3xl bg-[#141414] border border-white/[0.1] p-8 sm:p-10 shadow-2xl text-left">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6A2A] text-black flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              🛡
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              {isSignup ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-[#929292] mt-1">Authenticate to access Security Console</p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold text-xs py-3 px-4 rounded-full hover:bg-neutral-200 transition-all mb-6 shadow-md"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.87 2.68-6.61z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33C2.44 15.98 5.48 18 9 18z"/>
              <path fill="#FBBC05" d="M3.97 10.72c-.18-.54-.28-1.12-.28-1.72s.1-1.18.28-1.72V4.95H.96A8.996 8.996 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/>
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
            </svg>
            Sign in with Google
          </button>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#080808] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
                placeholder="operator@breachalert.io"
              />
            </div>

            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">Passphrase</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#080808] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
                placeholder="••••••••••••••••"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="rounded border-white/20 bg-neutral-900 text-[#FF6A2A]"
              />
              <span className="text-xs text-neutral-400">Maintain persistent session</span>
            </label>

            {error && (
              <p className="text-[#FF3B30] text-xs font-mono bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-xl p-3">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,106,42,0.4)]"
            >
              {isSignup ? 'Create Account' : 'Sign In'} →
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.08] text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Create One"}
            </button>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs font-mono text-neutral-600">
        © {new Date().getFullYear()} BreachAlert Security. 256-bit SSL Protected.
      </footer>
    </div>
  );
}

export default Login;