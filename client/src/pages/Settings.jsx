import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

function Settings({ token, onLogout }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [smsPrefs, setSmsPrefs] = useState({ critical: false, anomalies: false, weekly: false });
  const [emailPrefs, setEmailPrefs] = useState({ critical: true, anomalies: true, weekly: true });

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token]);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 p-6 sm:p-10 max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display mb-1">System Settings</h1>
        <p className="text-xs sm:text-sm text-[#969696] mb-8">
          Configure security console parameters, alert thresholds, and identity parameters.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Configuration */}
          <section className="lg:col-span-2 bg-[#121212] rounded-3xl p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-[#FF6A2A]">person</span> Profile Configuration
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#969696] mb-1.5 block">Operative Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-[#181818] border border-white/[0.1] rounded-xl px-4 py-2.5 font-mono text-xs text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-[#969696] mb-1.5 block">Primary Email Vector</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#181818] border border-white/[0.1] rounded-xl px-4 py-2.5 font-mono text-xs text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-semibold text-xs uppercase font-mono px-5 py-2.5 rounded-full transition-all shadow-md"
              >
                {saved ? 'Settings Saved!' : 'Save Profile Data'}
              </button>
            </form>
          </section>

          {/* Access Control */}
          <section className="bg-[#121212] rounded-3xl p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-[#FF6A2A]">lock</span> Access Control
            </h2>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-white">MFA Status</span>
              <span className="font-mono text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">NOT WIRED</span>
            </div>
            <p className="text-xs text-[#969696] mb-6 leading-relaxed">Multi-factor authentication is enforced via JWT session tokens.</p>
            <div className="bg-[#181818] rounded-2xl p-4 border border-white/[0.06]">
              <p className="text-xs text-white font-medium mb-1">Session Authorization</p>
              <p className="text-[11px] text-[#626262] font-mono">JWT Bearer Token, 7-day expiry</p>
            </div>
          </section>

          {/* Alert Routing */}
          <section className="lg:col-span-2 bg-[#121212] rounded-3xl p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-[#FF6A2A]">notifications</span> Alert Routing Preferences
            </h2>
            <div className="space-y-4">
              {[
                { key: 'critical', title: 'Critical Threat Vectors', desc: 'Immediate notification on newly detected data breaches.' },
                { key: 'anomalies', title: 'Identity Anomalies', desc: 'Unusual dark web activity matching your email domain.' },
                { key: 'weekly', title: 'Weekly Diagnostics', desc: 'Summary report of system health and security status.' }
              ].map(row => (
                <div key={row.key} className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] last:border-0 last:pb-0 gap-2">
                  <div>
                    <p className="text-xs font-semibold text-white">{row.title}</p>
                    <p className="text-[11px] text-[#969696]">{row.desc}</p>
                  </div>
                  <div className="flex gap-4 shrink-0 font-mono text-xs text-[#969696]">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={smsPrefs[row.key]}
                        onChange={e => setSmsPrefs(p => ({ ...p, [row.key]: e.target.checked }))}
                        className="rounded border-white/20 bg-[#181818] text-[#FF6A2A]"
                      />
                      SMS
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailPrefs[row.key]}
                        onChange={e => setEmailPrefs(p => ({ ...p, [row.key]: e.target.checked }))}
                        className="rounded border-white/20 bg-[#181818] text-[#FF6A2A]"
                      />
                      EMAIL
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Subscription */}
          <section className="bg-[#121212] rounded-3xl p-6 sm:p-8 border border-white/[0.08] backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-display">
              <span className="material-symbols-outlined text-[#FF6A2A]">credit_card</span> Current Subscription
            </h2>
            <p className="text-xl font-bold text-[#FF6A2A] font-display mb-1">Free Tier</p>
            <p className="text-xs text-[#969696] mb-6">1 email monitored, manual scans</p>
            <Link
              to="/pricing"
              className="block text-center bg-[#FF6A2A]/15 border border-[#FF6A2A]/30 text-[#FF6A2A] font-mono text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full hover:bg-[#FF6A2A]/25 transition-all"
            >
              Upgrade Plans
            </Link>
          </section>

        </div>
      </main>
    </div>
  );
}

export default Settings;