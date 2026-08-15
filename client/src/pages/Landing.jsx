import { Link } from 'react-router-dom';
import { useState } from 'react';

const THREAT_FEED = [
  { icon: 'terminal', title: 'Credential Leak Detected', desc: "Database dump containing 21M records analyzed on dark web forum [Redacted].", time: 'Just now', color: 'error' },
  { icon: 'hub', title: 'New Botnet Activity', desc: 'Surge in stealer malware logs targeting financial sectors in North America.', time: '12s ago', color: 'tertiary' },
  { icon: 'business', title: 'Enterprise Domain Exposure', desc: 'Corporate email addresses matching known SaaS compromise pattern.', time: '46s ago', color: 'tertiary' }
];

const FEATURES = [
  { icon: 'travel_explore', title: 'Deep Web Recon', desc: 'Continuous scraping of dark forums, telegram channels, and automated botnet logs.' },
  { icon: 'notifications_active', title: 'Zero-Day Alerts', desc: 'Instant notifications via SMS or email the second your data appears in a new dump.' },
  { icon: 'radar', title: 'Contextual Risk', desc: 'Analyze breach severity and provide clear, actionable remediation steps immediately.' },
  { icon: 'fingerprint', title: 'Identity Tracking', desc: 'Monitor SSNs, credit cards, and addresses. Secure your entire digital footprint.' }
];

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5">
      <Link to="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">shield_person</span>
        <span className="font-display font-bold text-on-surface">BreachAlert</span>
      </Link>
      <div className="hidden md:flex items-center gap-8 font-body text-sm text-on-surface-variant">
        <a href="#features" className="hover:text-primary transition-colors">Features</a>
        <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        <a href="#" className="hover:text-primary transition-colors">Enterprise</a>
        <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/login" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Login</Link>
        <Link to="/login" className="bg-primary text-white font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-blue-600 transition-all glow-primary">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

function Landing() {
  const [scanInput, setScanInput] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      {/* Hero */}
      <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-error/10 border border-error/20 px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
              <span className="font-mono text-[11px] text-error uppercase tracking-wide">Live: 12.4M Threats Detected Today</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface leading-tight mb-6">
              Stop Breaches Before<br />
              <span className="text-primary">They Escalate.</span>
            </h1>
            <p className="font-body text-on-surface-variant/80 text-lg mb-8 max-w-md">
              Proactive dark web reconnaissance and real-time alerts. Ensure your digital footprint remains secure against emerging threats.
            </p>
            <form className="flex gap-2 mb-4" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                value={scanInput}
                onChange={e => setScanInput(e.target.value)}
                placeholder="Enter email or domain to scan..."
                className="flex-1 bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/60"
              />
              <Link
                to="/login"
                className="flex items-center gap-2 bg-primary text-white font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-lg hover:bg-blue-600 transition-all glow-primary whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-sm">search</span> Deep Scan
              </Link>
            </form>
            <div className="flex items-center gap-6 font-mono text-[11px] text-outline-variant">
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">lock</span> 256-bit Encryption</span>
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">block</span> Zero Data Retention</span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/5">
              <span className="font-mono text-xs text-on-surface uppercase tracking-widest flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">podcasts</span> Global Threat Feed
              </span>
              <span className="font-mono text-[10px] text-outline-variant">Updating live...</span>
            </div>
            <div className="divide-y divide-white/5">
              {THREAT_FEED.map((t, i) => (
                <div key={i} className="flex gap-3 px-5 py-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-${t.color}/10 text-${t.color} border border-${t.color}/20`}>
                    <span className="material-symbols-outlined text-lg">{t.icon}</span>
                  </div>
                  <div>
                    <p className={`font-body text-sm font-semibold text-${t.color}`}>{t.title}</p>
                    <p className="font-body text-xs text-on-surface-variant/70 mt-0.5">{t.desc}</p>
                    <p className="font-mono text-[10px] text-outline-variant mt-1">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface text-center mb-12">The Monitoring Engine</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary">{f.icon}</span>
              </div>
              <h3 className="font-display font-bold text-on-surface mb-2">{f.title}</h3>
              <p className="font-body text-sm text-on-surface-variant/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted by */}
      <section className="px-6 md:px-10 py-12 max-w-7xl mx-auto">
        <div className="glass-panel rounded-2xl p-10 border border-white/5 text-center">
          <p className="font-mono text-xs text-outline-variant uppercase tracking-widest mb-6">Trusted by security teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-10 font-display font-semibold text-on-surface-variant/60 text-lg">
            <span>SentinelTech</span>
            <span>CipherGrid</span>
            <span>ArmorCloud</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-outline-variant">© 2026 BreachAlert Security. All rights reserved.</p>
          <div className="flex gap-6 font-body text-xs text-outline-variant">
            <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;