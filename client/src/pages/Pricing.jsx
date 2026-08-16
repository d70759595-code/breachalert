import { Link } from 'react-router-dom';
import { useState } from 'react';

function Pricing() {
  const [annual, setAnnual] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">shield_person</span>
          <span className="font-display font-bold text-on-surface">BreachAlert</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-on-surface-variant">
          <Link to="/#features" className="hover:text-primary transition-colors">Features</Link>
          <span className="text-primary">Pricing</span>
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

      <section className="px-6 py-16 max-w-5xl mx-auto text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-4">Secure Your Digital Identity</h1>
        <p className="font-body text-on-surface-variant/80 max-w-xl mx-auto mb-8">
          Choose the level of vigilance you need. Upgrade to the Family Plan for automated, real-time scanning and immediate alerts when a breach is detected.
        </p>

        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`font-body text-sm ${!annual ? 'text-on-surface' : 'text-on-surface-variant/60'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`w-11 h-6 rounded-full transition-colors relative ${annual ? 'bg-primary' : 'bg-surface-container-high'}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${annual ? 'left-6' : 'left-1'}`}></span>
          </button>
          <span className={`font-body text-sm ${annual ? 'text-on-surface' : 'text-on-surface-variant/60'}`}>Annually</span>
          <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">Save 20%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Free */}
          <div className="glass-panel rounded-2xl p-8 border border-white/5 flex flex-col">
            <h3 className="font-display text-2xl font-bold text-on-surface mb-1">Free</h3>
            <p className="font-body text-sm text-on-surface-variant/70 mb-6">Basic protection for individuals.</p>
            <div className="mb-6">
              <span className="font-display text-4xl font-bold text-on-surface">$0</span>
              <span className="font-body text-sm text-on-surface-variant/60">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 font-body text-sm text-on-surface-variant"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> 1 Email Address</li>
              <li className="flex items-center gap-2 font-body text-sm text-on-surface-variant"><span className="material-symbols-outlined text-primary text-lg">touch_app</span> Manual Scans</li>
              <li className="flex items-center gap-2 font-body text-sm text-on-surface-variant"><span className="material-symbols-outlined text-primary text-lg">history</span> Basic Breach History</li>
            </ul>
            <button className="w-full py-3 rounded-lg border border-white/10 text-on-surface-variant font-mono text-xs uppercase tracking-widest cursor-default">
              Current Plan
            </button>
          </div>

          {/* Family */}
          <div className="relative glass-panel rounded-2xl p-8 border border-primary/40 flex flex-col glow-primary">
            <span className="absolute -top-3 right-8 bg-primary text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">Recommended</span>
            <h3 className="font-display text-2xl font-bold text-primary mb-1">Family Plan</h3>
            <p className="font-body text-sm text-on-surface-variant/70 mb-6">Comprehensive automated security for the household.</p>
            <div className="mb-6">
              <span className="font-display text-4xl font-bold text-on-surface">${annual ? '10' : '12'}</span>
              <span className="font-body text-sm text-on-surface-variant/60">/month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center gap-2 font-body text-sm text-on-surface-variant"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Up to 5 Email Addresses</li>
              <li className="flex items-center gap-2 font-body text-sm text-on-surface-variant"><span className="material-symbols-outlined text-primary text-lg">sync</span> Automated Daily Scans</li>
              <li className="flex items-center gap-2 font-body text-sm text-on-surface-variant"><span className="material-symbols-outlined text-primary text-lg">mail</span> Instant Email Alerts</li>
              <li className="flex items-center gap-2 font-body text-sm text-on-surface-variant"><span className="material-symbols-outlined text-primary text-lg">travel_explore</span> Dark Web Monitoring</li>
              <li className="flex items-center gap-2 font-body text-sm text-on-surface-variant"><span className="material-symbols-outlined text-primary text-lg">support_agent</span> Priority Support</li>
            </ul>
            <button
              onClick={() => setShowComingSoon(true)}
              className="w-full py-3 rounded-lg bg-primary text-white font-mono text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">lock</span> Upgrade Plan
            </button>
            {showComingSoon && (
              <p className="font-mono text-[11px] text-tertiary text-center mt-3">
                Payments are coming soon — check back shortly!
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 font-mono text-[11px] text-outline-variant">
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">shield</span> 256-bit Encryption</span>
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">verified_user</span> Secure Checkout</span>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-outline-variant">© 2026 BreachAlert Security. All rights reserved.</p>
          <div className="flex gap-6 font-body text-xs text-outline-variant">
            <Link to="/support" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Pricing;