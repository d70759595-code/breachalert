import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchWithAuth } from '../api';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'forgot') {
        const res = await fetchWithAuth('/auth/forgot-password', {
          method: 'POST',
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || 'Password reset request failed');
        setMessage(data.message || 'If an account exists, a reset link has been dispatched.');
        setLoading(false);
        return;
      }

      const endpoint = mode === 'signup' ? '/auth/signup' : '/auth/login';
      const res = await fetchWithAuth(endpoint, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || `${mode === 'signup' ? 'Signup' : 'Login'} failed`);

      onLogin(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    window.location.href = `${apiBase}/auth/google`;
  }

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#FF6A2A]/15 via-transparent to-transparent blur-[140px] pointer-events-none rounded-full" />

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#121212]/90 border border-white/[0.1] shadow-2xl backdrop-blur-2xl">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link to="/" className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF6A2A] to-[#FF8A54] flex items-center justify-center shadow-lg shadow-[#FF6A2A]/30 mb-4 group hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-black font-bold text-3xl">shield</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight font-display">
            {mode === 'login' && 'Welcome back.'}
            {mode === 'signup' && 'Create Account.'}
            {mode === 'forgot' && 'Reset Access.'}
          </h1>
          <p className="text-xs text-[#969696] mt-1">
            {mode === 'forgot' ? 'Enter your email to receive recovery instructions.' : 'Access your security command center.'}
          </p>
        </div>

        {mode !== 'forgot' && (
          <>
            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-medium text-xs py-3 rounded-full hover:bg-neutral-100 transition-all shadow-md mb-6"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.87 2.68-6.61z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33C2.44 15.98 5.48 18 9 18z"/>
                <path fill="#FBBC05" d="M3.97 10.72c-.18-.54-.28-1.12-.28-1.72s.1-1.18.28-1.72V4.95H.96A8.996 8.996 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/>
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
              </svg>
              Sign in with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="font-mono text-[10px] text-[#626262] uppercase tracking-wider">OR</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>
          </>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-[#969696] mb-1.5 block">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-lg">mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#181818] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A] transition-all"
                placeholder="operator@breachalert.net"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#969696] block">Passphrase</label>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => setMode('forgot')} 
                    className="font-mono text-[10px] text-[#FF6A2A] hover:underline"
                  >
                    Recover Access
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-lg">key</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#181818] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A] transition-all"
                  placeholder="••••••••••••••"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-400 text-xs font-mono bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</p>
          )}

          {message && (
            <p className="text-emerald-400 text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,106,42,0.4)] flex items-center justify-center gap-2"
          >
            <span>
              {loading ? 'Processing...' : mode === 'login' ? 'Enter Command Center' : mode === 'signup' ? 'Create New Account' : 'Send Recovery Email'}
            </span>
            <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
          </button>

          {mode === 'login' ? (
            <button
              type="button"
              onClick={() => setMode('signup')}
              className="w-full py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Create Account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full py-2.5 text-xs font-mono text-[#969696] hover:text-white transition-colors"
            >
              ← Back to Sign In
            </button>
          )}
        </form>

        <p className="text-center mt-6">
          <Link to="/" className="font-mono text-[11px] text-[#969696] hover:text-white transition-colors">
            ← Back to homepage
          </Link>
        </p>
      </div>

    </div>
  );
}

export default Login;