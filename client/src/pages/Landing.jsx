import { useState } from 'react';
import { Link } from 'react-router-dom';

const THREAT_FEED = [
  { title: 'Credential Dump Discovered', desc: 'Database leak containing 21.4M records analyzed on dark web forum.', time: 'Just now', severity: 'CRITICAL', color: 'text-[#FF3B30] bg-[#FF3B30]/15 border-[#FF3B30]/30' },
  { title: 'Stealer Malware Activity Surge', desc: 'Surge in RedLine & Lumma stealer logs targeting web browser credentials.', time: '12s ago', severity: 'HIGH', color: 'text-[#FFB020] bg-[#FFB020]/15 border-[#FFB020]/30' },
  { title: 'SaaS Domain Exposure', desc: 'Corporate email addresses matching known OAuth compromise pattern.', time: '46s ago', severity: 'WARNING', color: 'text-[#FF6A2A] bg-[#FF6A2A]/15 border-[#FF6A2A]/30' }
];

const FEATURES = [
  { title: 'AI Breach Detection', desc: 'Continuous neural scraping of dark web forums, telegram channels, and automated botnet logs.' },
  { title: 'Zero-Day Alerts', desc: 'Instant push, SMS, or email notifications the second your data appears in a new database dump.' },
  { title: 'Contextual Risk Scoring', desc: 'Analyze breach severity and provide clear, actionable remediation protocols immediately.' },
  { title: 'Identity Safeguard', desc: 'Monitor email addresses, passwords, credit card leaks, and corporate domain exposures.' }
];

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/[0.08] backdrop-blur-xl bg-[#0F0F0F]/80">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <span className="font-bold text-[#FF6A2A]">🛡</span>
        </div>
        <span className="font-bold text-white tracking-tight">BREACH<span className="text-[#FF6A2A]">ALERT</span></span>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-300">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        <a href="#threat-intel" className="hover:text-white transition-colors">Security</a>
        <Link to="/support" className="hover:text-white transition-colors">Support</Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-xs font-medium text-neutral-300 hover:text-white transition-colors">Login</Link>
        <Link to="/login" className="bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] text-black font-semibold text-xs px-4 py-2 rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,106,42,0.4)]">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

function Landing() {
  const [scanInput, setScanInput] = useState('');

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <NavBar />

      {/* Hero */}
      <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF6A2A]/20 blur-[130px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141414] border border-white/[0.12] text-xs text-neutral-300 mb-6">
            <span>Real-time breach monitoring is now live</span>
            <span className="w-4 h-4 rounded-full bg-[#FF6A2A] text-black flex items-center justify-center text-[10px] font-bold">→</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-6">
            Stay Ahead of Data Breaches With AI
          </h1>

          <p className="text-[#929292] text-base md:text-lg max-w-2xl mb-8">
            AI-powered breach monitoring and identity protection. Detect exposed data early, monitor your digital identity, and take action before threats become problems.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 mb-10 w-full max-w-lg" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              value={scanInput}
              onChange={e => setScanInput(e.target.value)}
              placeholder="Enter email to scan..."
              className="flex-1 bg-[#141414] border border-white/[0.12] rounded-full px-5 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
            />
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] text-black font-bold text-xs px-6 py-3 rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,106,42,0.4)] whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              Start Monitoring →
            </Link>
          </form>

          {/* Horizon Arc Effect */}
          <div className="w-full horizon-arc-container my-4">
            <div className="horizon-arc-glow-bg" />
            <div className="horizon-arc-line" />
            <div className="absolute top-10 text-center w-full">
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">Trusted by security-conscious teams</p>
              <div className="flex justify-center gap-8 text-xs text-neutral-300">
                <span>🔒 256-bit Encrypted</span>
                <span>⚡ Real-Time Monitoring</span>
                <span>🛡 Privacy First</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Threat Feed */}
      <section id="threat-intel" className="px-6 md:px-10 py-16 max-w-6xl mx-auto text-left">
        <div className="rounded-3xl bg-[#141414] border border-white/[0.08] p-8 shadow-2xl">
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/[0.06]">
            <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6A2A] animate-pulse" /> Live Global Threat Stream
            </span>
            <span className="font-mono text-[10px] text-[#35D07F] bg-[#35D07F]/10 px-2.5 py-0.5 rounded-full border border-[#35D07F]/20">● LIVE RECON</span>
          </div>
          <div className="space-y-4">
            {THREAT_FEED.map((t, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#0D0D0D] border border-white/[0.06] flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{t.title}</p>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-bold ${t.color}`}>{t.severity}</span>
                  </div>
                  <p className="text-xs text-[#929292] mt-1">{t.desc}</p>
                </div>
                <span className="font-mono text-[11px] text-neutral-500 shrink-0">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 md:px-10 py-16 max-w-6xl mx-auto text-left">
        <h2 className="text-3xl font-semibold text-white text-center mb-12">Your Digital Identity. Always Protected.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#141414] border border-white/[0.08] hover:border-[#FF6A2A]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 flex items-center justify-center mb-4 text-[#FF6A2A] font-bold">
                🛡
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-[#929292] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-8 border-t border-white/[0.08] bg-[#070707]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} BreachAlert Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/support" className="hover:text-white transition-colors">Support</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;