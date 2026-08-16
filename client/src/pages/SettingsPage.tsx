import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Lock, Bell, CreditCard, LogOut, Zap } from 'lucide-react';

interface SettingsPageProps {
  token: string | null;
  onLogout: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ token, onLogout }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saved, setSaved] = useState(false);
  const [smsPrefs, setSmsPrefs] = useState({ critical: false, anomalies: false, weekly: false });
  const [emailPrefs, setEmailPrefs] = useState({ critical: true, anomalies: true, weekly: true });

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#070707] text-white flex selection:bg-[#FF6A2A] selection:text-black">
      
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-[#0B0B0B] border-r border-white/[0.08] flex-col p-6 min-h-screen text-left">
        <Link to="/" className="flex items-center gap-2.5 mb-6 group">
          <div className="w-8 h-8 rounded-full bg-[#FF6A2A] flex items-center justify-center shadow-[0_0_15px_rgba(255,106,42,0.5)]">
            <Shield className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">
            BREACH<span className="text-[#FF6A2A]">ALERT</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-1.5 text-xs font-medium">
          <Link to="/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors">
            <Shield className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30">
            <Lock className="w-4 h-4" />
            <span>Settings</span>
          </span>
        </nav>

        <div className="mt-auto flex flex-col gap-2 pt-6 border-t border-white/[0.06]">
          <Link to="/pricing" className="flex items-center gap-2 justify-center px-4 py-2.5 rounded-full bg-[#FF6A2A] text-black font-bold text-xs">
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>Upgrade Protection</span>
          </Link>
          <button onClick={onLogout} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#FF3B30] hover:bg-[#FF3B30]/10 text-xs transition-colors text-left">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 flex flex-col gap-8 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">System Settings</h1>
          <p className="text-xs text-[#929292] mt-1">Configure your operator profile, security parameters, and notification routing.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Configuration */}
          <section className="lg:col-span-2 rounded-3xl bg-[#141414] border border-white/[0.08] p-8 shadow-2xl">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#FF6A2A]" /> Profile Configuration
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
                  Operative Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Security Analyst"
                  className="w-full bg-[#080808] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
                  Primary Comms (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-[#080808] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#FF6A2A] text-black font-bold text-xs hover:bg-[#FF783A] transition-all"
              >
                {saved ? 'Saved Profile Data!' : 'Save Changes'}
              </button>
            </form>
          </section>

          {/* Access Control */}
          <section className="rounded-3xl bg-[#141414] border border-white/[0.08] p-8 shadow-2xl">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#FF6A2A]" /> Access Control
            </h2>

            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-neutral-300">MFA Status</span>
              <span className="font-mono text-[10px] bg-[#FFB020]/15 text-[#FFB020] px-2.5 py-0.5 rounded border border-[#FFB020]/30 font-bold">
                DISABLED
              </span>
            </div>

            <div className="bg-[#080808] rounded-2xl p-4 border border-white/[0.06] mt-4">
              <p className="text-xs text-white font-medium mb-1">Session Token (JWT)</p>
              <p className="text-[11px] text-neutral-500 font-mono">7-day active security TTL</p>
            </div>
          </section>

          {/* Alert Routing */}
          <section className="lg:col-span-2 rounded-3xl bg-[#141414] border border-white/[0.08] p-8 shadow-2xl">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#FF6A2A]" /> Alert Routing Parameters
            </h2>

            <div className="space-y-5">
              {[
                { key: 'critical', title: 'Critical Breach Incident Alerts', desc: 'Immediate notification on new credential leaks.' },
                { key: 'anomalies', title: 'Identity Telemetry Anomalies', desc: 'Unusual dark web activity targeting your domain.' },
                { key: 'weekly', title: 'Weekly Diagnostic Report', desc: 'Summary of threat recon and system health scores.' }
              ].map((row) => (
                <div key={row.key} className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] last:border-0 last:pb-0 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-white">{row.title}</p>
                    <p className="text-[11px] text-neutral-400">{row.desc}</p>
                  </div>
                  <div className="flex gap-4 shrink-0">
                    <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(smsPrefs as any)[row.key]}
                        onChange={(e) => setSmsPrefs((p) => ({ ...p, [row.key]: e.target.checked }))}
                        className="rounded border-white/20 bg-neutral-900 text-[#FF6A2A]"
                      />
                      SMS
                    </label>
                    <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(emailPrefs as any)[row.key]}
                        onChange={(e) => setEmailPrefs((p) => ({ ...p, [row.key]: e.target.checked }))}
                        className="rounded border-white/20 bg-neutral-900 text-[#FF6A2A]"
                      />
                      EMAIL
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Subscription Tier */}
          <section className="rounded-3xl bg-[#141414] border border-white/[0.08] p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#FF6A2A]" /> Current Tier
              </h2>
              <p className="text-2xl font-bold text-[#FF6A2A] mb-1 font-mono">Free Plan</p>
              <p className="text-xs text-neutral-400 mb-6">1 Monitored Identity, Manual Scans</p>
            </div>

            <Link
              to="/pricing"
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] text-black font-bold text-xs text-center block shadow-[0_0_15px_rgba(255,106,42,0.3)]"
            >
              Upgrade To Family Plan
            </Link>
          </section>

        </div>
      </main>
    </div>
  );
};
