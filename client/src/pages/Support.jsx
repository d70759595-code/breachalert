import { Link } from 'react-router-dom';
import { useState } from 'react';

const TOPICS = [
  { icon: 'shield_person', color: 'primary', title: 'Account Security', desc: 'MFA setup, password resets, and session management.' },
  { icon: 'warning', color: 'error', title: 'Breach Reports', desc: 'Understanding threat vectors, timeline analysis, and export formats.' },
  { icon: 'credit_card', color: 'tertiary', title: 'Billing & Enterprise', desc: 'Invoices, plan changes, and upgrading your protection.' }
];

function Support() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">shield_person</span>
          <span className="font-display font-bold text-on-surface">BreachAlert</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-on-surface-variant">
          <Link to="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <a href="#" className="hover:text-primary transition-colors">Enterprise</a>
          <span className="text-primary">Support</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="font-body text-sm text-on-surface-variant hover:text-primary transition-colors">Login</Link>
          <Link to="/login" className="bg-primary text-white font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-blue-600 transition-all glow-primary">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-4">How can we assist your security ops?</h1>
        <p className="font-body text-on-surface-variant/80 mb-8">
          Search our knowledge base or get in touch with our security response team for immediate assistance.
        </p>
        <form className="flex gap-2 max-w-xl mx-auto" onSubmit={e => e.preventDefault()}>
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search Help Center (e.g., 'API Keys', 'Breach Report')"
              className="w-full bg-surface-container-low border border-white/10 rounded-lg pl-10 pr-4 py-3 font-body text-sm text-on-surface focus:outline-none focus:border-primary/60"
            />
          </div>
          <button className="bg-primary text-white font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-lg hover:bg-blue-600 transition-all">
            Search
          </button>
        </form>
      </section>

      <section className="px-6 md:px-10 max-w-6xl mx-auto pb-16">
        <h2 className="font-display text-xl font-bold text-on-surface mb-6">Common Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {TOPICS.map((t, i) => (
            <div key={i} className={`glass-panel rounded-2xl p-6 border-t-2 border-${t.color} border-x border-b border-white/5`}>
              <div className={`w-10 h-10 rounded-lg bg-${t.color}/10 flex items-center justify-center mb-4`}>
                <span className={`material-symbols-outlined text-${t.color}`}>{t.icon}</span>
              </div>
              <h3 className="font-display font-bold text-on-surface mb-2">{t.title}</h3>
              <p className="font-body text-sm text-on-surface-variant/70 mb-3">{t.desc}</p>
              <span className="font-mono text-xs text-primary flex items-center gap-1">View Articles <span className="material-symbols-outlined text-sm">arrow_forward</span></span>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-2xl p-8 border border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display text-xl font-bold text-on-surface mb-2">Need Dedicated Support?</h3>
            <p className="font-body text-sm text-on-surface-variant/70 mb-6">
              Our security analysts are available to assist with critical alerts and platform configurations.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-surface-container/40 border border-white/5 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">chat</span>
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-on-surface">Live Chat</p>
                  <p className="font-body text-xs text-on-surface-variant/60">Average response time: &lt; 2 mins</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-surface-container/40 border border-white/5 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-on-surface">Submit a Ticket</p>
                  <p className="font-body text-xs text-on-surface-variant/60">For complex technical issues or log analysis.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-10 flex flex-col items-center justify-center border border-white/5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
            </div>
            <p className="font-mono text-sm text-primary tracking-widest mb-1">SYSTEM STATUS: OPERATIONAL</p>
            <p className="font-body text-xs text-on-surface-variant/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success"></span> All Monitoring Nodes Active
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-outline-variant">© 2026 BreachAlert Security. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Support;
