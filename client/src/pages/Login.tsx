import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Mail, Key, ArrowRight, Lock, AlertTriangle } from 'lucide-react';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';
import { useToast } from '../components/Toast';

const API_BASE = 'http://localhost:3000';

interface LoginProps {
  onLogin: (token: string, remember: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const isSignupRoute = location.search.includes('mode=signup') || location.pathname === '/signup';
  const [isSignup, setIsSignup] = useState(isSignupRoute);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  useEffect(() => {
    setIsSignup(isSignupRoute);
  }, [isSignupRoute]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Input Validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const endpoint = isSignup ? '/auth/signup' : '/auth/login';

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || (isSignup ? 'Signup failed. Please try again.' : 'Invalid email or password.'));
      }

      showToast(isSignup ? 'Account created successfully!' : 'Signed in successfully!', 'success');
      onLogin(data.token, remember);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col justify-between selection:bg-[#FF6A2A] selection:text-black">
      {/* Top minimal header */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-20">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <Shield className="w-4 h-4 text-white stroke-[2.2]" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            BREACH<span className="text-[#FF6A2A]">ALERT</span>
          </span>
        </Link>

        <Link to="/" className="text-xs font-mono text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
          ← Back to homepage
        </Link>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 w-full items-center">
          
          {/* LEFT: Cybersecurity Statement & Abstract Visualization */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center text-left relative">
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#FF6A2A]/15 blur-[120px] pointer-events-none rounded-full" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 text-[#FF6A2A] text-xs font-mono font-semibold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" /> Identity Defense Console
              </div>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
                Your digital identity deserves continuous protection.
              </h1>

              <p className="text-[#929292] text-base leading-relaxed max-w-lg">
                Log in to monitor breach telemetry, review exposed credentials in real-time, and maintain 24/7 security vigilance.
              </p>

              {/* Abstract Security Mesh Card */}
              <div className="p-6 rounded-3xl bg-[#121212]/90 border border-white/[0.08] backdrop-blur-xl relative overflow-hidden mt-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-white">
                    <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse" />
                    SYSTEM STATUS: ACTIVE VIGILANCE
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">256-BIT ENCRYPTED</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#181818] border border-white/[0.05]">
                    <span className="text-neutral-400">Dark Web Monitoring Node</span>
                    <span className="text-[#35D07F]">Online (0ms)</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#181818] border border-white/[0.05]">
                    <span className="text-neutral-400">Stealer Log Indexer</span>
                    <span className="text-[#35D07F]">Active (14B+ Dump Logs)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Login Form Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-[#141414] border border-white/[0.1] p-8 sm:p-10 shadow-2xl relative backdrop-blur-2xl text-left">
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6A2A] text-black flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,106,42,0.5)]">
                  <Shield className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  {isSignup ? 'Create Your Account' : 'Welcome Back'}
                </h2>
                <p className="text-xs text-[#929292] mt-1">
                  {isSignup ? 'Register to start monitoring your digital footprint' : 'Authenticate to continue to Security Console'}
                </p>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold text-xs sm:text-sm py-3 px-4 rounded-full hover:bg-neutral-200 transition-all duration-200 mb-6 shadow-md"
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.12-.84 2.07-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.87 2.68-6.61z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33C2.44 15.98 5.48 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.97 10.72c-.18-.54-.28-1.12-.28-1.72s.1-1.18.28-1.72V4.95H.96A8.996 8.996 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/>
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-white/[0.08]"></div>
                <span className="font-mono text-[10px] text-neutral-500 uppercase">OR WITH EMAIL</span>
                <div className="flex-1 h-px bg-white/[0.08]"></div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@breachalert.io"
                      className="w-full bg-[#080808] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block">
                      Passphrase
                    </label>
                    {!isSignup && (
                      <button
                        type="button"
                        onClick={() => setForgotModalOpen(true)}
                        className="font-mono text-[10px] text-[#FF6A2A] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Key className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      className="w-full bg-[#080808] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A] transition-colors"
                    />
                  </div>
                </div>

                {isSignup && (
                  <div>
                    <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
                      Confirm Passphrase
                    </label>
                    <div className="relative">
                      <Key className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••••••"
                        className="w-full bg-[#080808] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A] transition-colors"
                      />
                    </div>
                  </div>
                )}

                {!isSignup && (
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="rounded border-white/20 bg-neutral-900 text-[#FF6A2A] focus:ring-0"
                    />
                    <span className="text-xs text-neutral-400">Maintain persistent session</span>
                  </label>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] text-xs font-mono">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black font-bold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_25px_rgba(255,106,42,0.4)] flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
                >
                  <span>
                    {loading
                      ? isSignup
                        ? 'Creating account...'
                        : 'Signing in...'
                      : isSignup
                      ? 'Create Account'
                      : 'Sign In'}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </form>

              {/* Signup / Login Toggle */}
              <div className="mt-6 pt-6 border-t border-white/[0.08] text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setError('');
                  }}
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  {isSignup ? (
                    <>Already have an account? <span className="text-[#FF6A2A] font-semibold">Sign In</span></>
                  ) : (
                    <>Don't have an account? <span className="text-[#FF6A2A] font-semibold">Create Account</span></>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
      />

      {/* Footer */}
      <footer className="p-4 text-center text-xs font-mono text-neutral-600">
        © {new Date().getFullYear()} BreachAlert Security. 256-bit SSL Protected.
      </footer>
    </div>
  );
};
