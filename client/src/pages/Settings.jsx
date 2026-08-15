import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Sidebar({ onLogout }) {
  return (
    <aside className="w-60 shrink-0 border-r border-white/5 flex flex-col p-6 min-h-screen">
      <Link to="/" className="flex items-center gap-2 mb-1">
        <span className="material-symbols-outlined text-primary">shield_person</span>
        <span className="font-display font-bold text-on-surface">Security Console</span>
      </Link>
      <p className="flex items-center gap-1.5 font-mono text-[10px] text-success uppercase tracking-widest mb-8 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Vigilance Active
      </p>

      <nav className="flex flex-col gap-1 font-body text-sm">
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 transition-colors">
          <span className="material-symbols-outlined text-lg">dashboard</span> Dashboard
        </Link>
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 transition-colors">
          <span className="material-symbols-outlined text-lg">show_chart</span> Breach Timeline
        </Link>
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 transition-colors">
          <span className="material-symbols-outlined text-lg">fingerprint</span> Identities
        </Link>
        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 transition-colors">
          <span className="material-symbols-outlined text-lg">bar_chart</span> Security Reports
        </Link>
        <span className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
          <span className="material-symbols-outlined text-lg">settings</span> Settings
        </span>
      </nav>

      <div className="mt-auto flex flex-col gap-1 pt-6 border-t border-white/5">
        <Link to="/pricing" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium justify-center mb-3">
          <span className="material-symbols-outlined text-lg">bolt</span> Upgrade Protection
        </Link>
        <Link to="/support" className="flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 text-sm transition-colors">
          <span className="material-symbols-outlined text-lg">help</span> Help Center
        </Link>
        <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-error hover:bg-error/10 text-sm transition-colors text-left">
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
    // Note: no backend profile-update endpoint exists yet — this only updates local UI state for now.
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!token) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 p-8 md:p-10">
        <h1 className="font-display text-3xl font-bold text-on-surface mb-2">System Settings</h1>
        <p className="font-body text-sm text-on-surface-variant/70 mb-10 max-w-2xl">
          Configure your security console preferences, manage active identities, and adjust notification parameters.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile */}
          <section className="lg:col-span-2 glass-panel rounded-2xl p-8 border border-white/5">
            <h2 className="font-display text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span> Profile Configuration
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-outline-variant mb-1 block">Operative Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-outline-variant mb-1 block">Primary Comms (Email)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2.5 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60"
                />
                <p className="font-body text-xs text-on-surface-variant/50 mt-1">Contact system admin to change primary communication vector.</p>
              </div>
              <button
                type="submit"
                className="bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-primary/20 transition-all"
              >
                {saved ? 'Saved!' : 'Save Profile Data'}
              </button>
            </form>
          </section>

          {/* Access control */}
          <section className="glass-panel rounded-2xl p-8 border border-primary/20">
            <h2 className="font-display text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">lock</span> Access Control
            </h2>
            <div className="flex justify-between items-center mb-2">
              <span className="font-body text-sm text-on-surface">MFA Status</span>
              <span className="font-mono text-[10px] bg-tertiary/10 text-tertiary px-2 py-0.5 rounded">NOT SET UP</span>
            </div>
            <p className="font-body text-xs text-on-surface-variant/60 mb-6">Two-factor auth isn't wired up yet in this build.</p>
            <div className="bg-surface-container-high/40 rounded-xl p-4 border border-white/5">
              <p className="font-body text-sm text-on-surface mb-1">Authentication Token</p>
              <p className="font-body text-xs text-on-surface-variant/60">Session-based (JWT), 7-day expiry</p>
            </div>
          </section>

          {/* Alert routing */}
          <section className="lg:col-span-2 glass-panel rounded-2xl p-8 border-t-2 border-tertiary border-x border-b border-white/5">
            <h2 className="font-display text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">notifications</span> Alert Routing
            </h2>
            <div className="space-y-5">
              {[
                { key: 'critical', title: 'Critical Threat Vectors', desc: 'Immediate notification on new breach detections.' },
                { key: 'anomalies', title: 'Identity Anomalies', desc: 'Unusual login attempts or permission escalations.' },
                { key: 'weekly', title: 'Weekly Diagnostics', desc: 'Summary reports of system health and minor incidents.' }
              ].map(row => (
                <div key={row.key} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:pb-0">
                  <div>
                    <p className="font-body text-sm font-medium text-on-surface">{row.title}</p>
                    <p className="font-body text-xs text-on-surface-variant/60">{row.desc}</p>
                  </div>
                  <div className="flex gap-4 shrink-0">
                    <label className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
                      <input
                        type="checkbox"
                        checked={smsPrefs[row.key]}
                        onChange={e => setSmsPrefs(p => ({ ...p, [row.key]: e.target.checked }))}
                        className="rounded border-white/20 bg-surface-container-low"
                      />
                      SMS
                    </label>
                    <label className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
                      <input
                        type="checkbox"
                        checked={emailPrefs[row.key]}
                        onChange={e => setEmailPrefs(p => ({ ...p, [row.key]: e.target.checked }))}
                        className="rounded border-white/20 bg-surface-container-low"
                      />
                      EMAIL
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Subscription */}
          <section className="glass-panel rounded-2xl p-8 border border-white/5">
            <h2 className="font-display text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">credit_card</span> Subscription Tier
            </h2>
            <p className="font-display text-xl font-bold text-primary mb-1">Free Plan</p>
            <p className="font-body text-xs text-on-surface-variant/60 mb-6">1 email monitored, manual scans</p>
            <Link
              to="/pricing"
              className="block text-center bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest px-4 py-2.5 rounded-lg hover:bg-primary/20 transition-all"
            >
              View Plans
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Settings;