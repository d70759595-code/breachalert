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
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#FF6A2A]/15 via-transparent to-transparent blur-[150px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side Security Statement */}
        <div className="hidden md:flex flex-col justify-center space-y-4">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#FF6A2A] flex items-center justify-center">
              <span className="material-symbols-outlined text-black font-bold text-lg">shield</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight font-display">BreachAlert</span>
          </Link>

          <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-snug font-display">
            Welcome back.<br />
            Your protection is still active.
          </h2>

          <p className="text-xs text-[#9A9A9A] leading-relaxed max-w-sm">
            Access your SOC security command center, manage monitored identity vectors, and inspect real-time breach telemetry.
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-[#35D07F] pt-2">
            <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse"></span>
            Surveillance Engine Online
          </div>
        </div>

        {/* Right Side Glass Card */}
        <div className="w-full p-8 sm:p-10 rounded-3xl bg-[#121212]/90 border border-white/[0.07] shadow-2xl backdrop-blur-2xl">
          
          <div className="flex flex-col items-center text-center mb-8">
            <Link to="/" className="md:hidden w-12 h-12 rounded-2xl bg-[#FF6A2A] flex items-center justify-center shadow-lg shadow-[#FF6A2A]/30 mb-4">
              <span className="material-symbols-outlined text-black font-bold text-2xl">shield</span>
            </Link>
            <h1 className="text-2xl font-semibold text-white tracking-tight font-display">
              {mode === 'login' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Reset Access'}
            </h1>
            <p className="text-xs text-[#9A9A9A] mt-1">
              {mode === 'forgot' ? 'Enter your email to receive recovery instructions.' : 'Enter your credentials to access your account.'}
            </p>
          </div>

          {mode !== 'forgot' && (
            <>
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
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-white/[0.07]" />
                <span className="font-mono text-[10px] text-[#606060] uppercase tracking-wider">OR</span>
                <div className="flex-1 h-px bg-white/[0.07]" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#9A9A9A] mb-1.5 block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#171717] border border-white/[0.07] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#606060] focus:outline-none focus:border-[#FF6A2A] transition-all"
                placeholder="operator@breachalert.net"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#9A9A9A] block">Password</label>
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
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#171717] border border-white/[0.07] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#606060] focus:outline-none focus:border-[#FF6A2A] transition-all"
                  placeholder="••••••••••••••"
                />
              </div>
            )}

            {error && (
              <p className="text-[#FF453A] text-xs font-mono bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</p>
            )}

            {message && (
              <p className="text-[#35D07F] text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#FF6A2A] hover:bg-[#FF7540] text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,106,42,0.45)] flex items-center justify-center gap-2"
            >
              <span>
                {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Recovery Link'}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#9A9A9A]">
            {mode === 'login' ? (
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#FF6A2A] font-medium hover:underline"
              >
                Don't have an account? Create one
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#FF6A2A] font-medium hover:underline"
              >
                ← Back to Sign In
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;