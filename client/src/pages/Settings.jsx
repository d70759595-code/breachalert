import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchWithAuth } from '../api';

function Sidebar({ onLogout }) {
  return (
    <aside className="w-64 shrink-0 border-r border-white/[0.08] bg-[#0A0A0A]/90 flex flex-col p-6 min-h-screen">
      <Link to="/" className="flex items-center gap-2.5 mb-2">
        <div className="w-8 h-8 rounded-full bg-[#FF6A2A] flex items-center justify-center">
          <span className="material-symbols-outlined text-black font-bold text-lg">shield</span>
        </div>
        <span className="text-white font-bold text-lg tracking-tight font-display">BreachAlert</span>
      </Link>

      <p className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 uppercase tracking-widest mb-8 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Protection Active
      </p>

      <nav className="flex flex-col gap-1 text-xs font-medium">
        <Link to="/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#969696] hover:text-white hover:bg-white/[0.04] transition-colors">
          <span className="material-symbols-outlined text-lg">dashboard</span> Overview
        </Link>
        <Link to="/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#969696] hover:text-white hover:bg-white/[0.04] transition-colors">
          <span className="material-symbols-outlined text-lg">mail</span> Monitored Emails
        </Link>
        <Link to="/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#969696] hover:text-white hover:bg-white/[0.04] transition-colors">
          <span className="material-symbols-outlined text-lg">warning</span> Breach Activity
        </Link>
        <span className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30">
          <span className="material-symbols-outlined text-lg">settings</span> System Settings
        </span>
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-white/[0.08]">
        <Link to="/pricing" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#FF6A2A] text-black font-semibold text-xs justify-center shadow-lg shadow-[#FF6A2A]/30">
          <span className="material-symbols-outlined text-base">bolt</span> Upgrade Protection
        </Link>
        <Link to="/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#969696] hover:text-white text-xs transition-colors">
          <span className="material-symbols-outlined text-lg">help</span> Help Center
        </Link>
        <button onClick={onLogout} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 text-xs transition-colors text-left">
          <span className="material-symbols-outlined text-lg">logout</span> Logout
        </button>
      </div>
    </aside>
  );
}

function Settings({ user, onLogout }) {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  async function handleSendOTP(e) {
    e.preventDefault();
    setStatusMsg('');
    try {
      const res = await fetchWithAuth('/auth/phone/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Failed to send OTP');
      setStatusMsg(data.message || 'OTP sent to mobile phone');
    } catch (err) {
      setStatusMsg(err.message);
    }
  }

  async function handleVerifyOTP(e) {
    e.preventDefault();
    setStatusMsg('');
    try {
      const res = await fetchWithAuth('/auth/phone/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ otpCode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Verification failed');
      setStatusMsg(data.message || 'Phone number verified!');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setStatusMsg(err.message);
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 p-6 sm:p-10 max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-1">System Settings</h1>
        <p className="text-xs sm:text-sm text-[#969696] mb-8">
          Configure security console parameters, SMS alert dispatching, and identity details.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile & SMS Configuration */}
          <section className="lg:col-span-2 bg-[#121212] rounded-3xl p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-[#FF6A2A]">person</span> Profile & SMS Telemetry
            </h2>
            
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-[#969696] mb-1.5 block">Account Email</label>
              <input
                type="email"
                disabled
                value={user.email || ''}
                className="w-full bg-[#181818] border border-white/[0.1] rounded-xl px-4 py-2.5 font-mono text-xs text-neutral-400 cursor-not-allowed"
              />
            </div>

            <form onSubmit={handleSendOTP} className="space-y-3">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#969696] mb-1.5 block">Mobile Phone Number (E.164 Standard)</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="+15550199283"
                    className="flex-1 bg-[#181818] border border-white/[0.1] rounded-xl px-4 py-2.5 font-mono text-xs text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A]"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-semibold text-xs uppercase font-mono px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </form>

            <form onSubmit={handleVerifyOTP} className="space-y-3 pt-2">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#969696] mb-1.5 block">Enter 6-Digit OTP Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="flex-1 bg-[#181818] border border-white/[0.1] rounded-xl px-4 py-2.5 font-mono text-xs text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A]"
                  />
                  <button
                    type="submit"
                    className="bg-[#45D483] hover:bg-emerald-400 text-black font-semibold text-xs uppercase font-mono px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
                  >
                    Verify Phone
                  </button>
                </div>
              </div>
            </form>

            {statusMsg && (
              <p className="font-mono text-[11px] text-[#FF6A2A] bg-[#FF6A2A]/10 p-3 rounded-xl border border-[#FF6A2A]/20">
                {statusMsg}
              </p>
            )}
          </section>

          {/* Access Control & Current Plan */}
          <div className="space-y-6">
            <section className="bg-[#121212] rounded-3xl p-6 border border-white/[0.08] backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 font-display">
                <span className="material-symbols-outlined text-[#FF6A2A]">lock</span> Security Mode
              </h2>
              <div className="bg-[#181818] rounded-2xl p-4 border border-white/[0.06]">
                <p className="text-xs text-white font-medium mb-1">Session Security</p>
                <p className="text-[11px] text-[#626262] font-mono">HttpOnly Lax Cookie, 7-day TTL</p>
              </div>
            </section>

            <section className="bg-[#121212] rounded-3xl p-6 border border-white/[0.08] backdrop-blur-xl">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2 font-display">
                <span className="material-symbols-outlined text-[#FF6A2A]">credit_card</span> Active Plan
              </h2>
              <p className="text-xl font-bold text-[#FF6A2A] font-display mb-1 uppercase">{user.plan || 'Free'} Plan</p>
              <p className="text-xs text-[#969696] mb-6">
                {user.plan === 'family' ? 'Up to 5 emails monitored, automated daily scans, SMS emergency alerts' : '1 email monitored, manual threat scans'}
              </p>
              <Link
                to="/pricing"
                className="block text-center bg-[#FF6A2A]/15 border border-[#FF6A2A]/30 text-[#FF6A2A] font-mono text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-[#FF6A2A]/25 transition-all"
              >
                Manage Subscription
              </Link>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Settings;