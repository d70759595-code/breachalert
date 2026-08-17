import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/HeaderFooter';

const MAIN_FEATURES = [
  {
    title: 'CONTINUOUS MONITORING',
    heading: 'Always-on identity protection.',
    desc: 'Keep your email addresses under 24/7 dark web reconnaissance across millions of breach archives.'
  },
  {
    title: 'INSTANT BREACH ALERTS',
    heading: 'Know the moment your information is exposed.',
    desc: 'Receive immediate notifications via email or SMS when an identity appears in a newly discovered breach.'
  },
  {
    title: 'ACTIONABLE INTELLIGENCE',
    heading: 'Understand what was leaked and what to do next.',
    desc: 'Get structured AI risk explanations detailing exposed passwords, payment cards, SSNs, and mitigation steps.'
  }
];

const SECURITY_PILLARS = [
  { icon: 'lock', title: '256-Bit Encrypted', desc: 'Zero plaintext passwords stored in database.' },
  { icon: 'visibility_off', title: 'Private & Anonymous', desc: 'Your surveillance target data is strictly isolated.' },
  { icon: 'radar', title: 'Continuous Recon', desc: 'Real-time dark web crawlers monitoring paste bins.' },
  { icon: 'shield', title: 'Proactive Defense', desc: 'Instant advice to mitigate identity theft risks.' }
];

function Landing({ user, onLogout }) {
  const [scanInput, setScanInput] = useState('');

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise relative">
      <Navbar user={user} onLogout={onLogout} />

      {/* HERO SECTION */}
      <section className="relative pt-32 sm:pt-40 md:pt-44 pb-20 overflow-hidden flex flex-col justify-between">
        
        {/* Background Atmospheric Lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[500px] bg-radial from-[#FF6A2A]/20 via-[#FF4500]/05 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[1100px] sm:w-[1500px] h-[550px] bg-radial from-[#FF6A2A]/25 via-[#FF7540]/08 to-transparent blur-[160px] pointer-events-none rounded-full" />

        {/* Hero Content Wrapper */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D0D0D]/90 border border-white/[0.07] hover:border-[#FF6A2A]/40 backdrop-blur-md shadow-xl transition-all duration-300 group cursor-pointer mb-8">
            <span className="text-xs font-medium text-[#9A9A9A] group-hover:text-white transition-colors">
              Real-time breach protection is now live
            </span>
            <span className="w-5 h-5 rounded-full bg-[#FF6A2A] text-black flex items-center justify-center transition-transform group-hover:translate-x-0.5 shadow-[0_0_10px_rgba(255,106,42,0.6)]">
              <span className="material-symbols-outlined text-xs font-bold">arrow_forward</span>
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-[76px] font-medium tracking-tight leading-[1.02] max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-[#9A9A9A] mb-6 font-display">
            Stay Ahead of Every Data Breach.
          </h1>

          {/* Hero Description */}
          <p className="text-[#9A9A9A] text-base sm:text-lg max-w-[600px] font-normal leading-relaxed mb-10">
            Monitor your identities, detect exposed credentials, and get notified instantly when your data appears in a breach.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF7540] hover:from-[#FF783A] hover:to-[#FF854D] text-black font-semibold text-sm transition-all duration-300 shadow-[0_0_30px_rgba(255,106,42,0.45)] hover:shadow-[0_0_40px_rgba(255,106,42,0.7)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shield</span>
              <span>Start Monitoring</span>
            </Link>

            <a 
              href="#how-it-works"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/[0.2] text-white font-medium text-sm transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined text-base text-[#9A9A9A] group-hover:text-white transition-colors">play_circle</span>
              <span>See How It Works</span>
            </a>
          </div>

          {/* Quick Email Scanner Input */}
          <div className="w-full max-w-md bg-[#121212]/90 border border-white/[0.07] rounded-full p-1.5 flex items-center shadow-2xl mb-14 backdrop-blur-xl">
            <span className="material-symbols-outlined text-[#606060] pl-3.5 text-base">search</span>
            <input 
              type="email" 
              value={scanInput}
              onChange={e => setScanInput(e.target.value)}
              placeholder="Enter email address to scan..." 
              className="bg-transparent border-none text-xs sm:text-sm text-white placeholder-[#606060] focus:outline-none flex-1 px-3"
            />
            <Link 
              to={`/login?email=${encodeURIComponent(scanInput)}`}
              className="bg-[#FF6A2A] hover:bg-[#FF7540] text-black font-semibold text-xs px-4 py-2 rounded-full transition-all flex items-center gap-1"
            >
              <span>Scan Now</span>
            </Link>
          </div>

          {/* HUGE ORANGE HORIZON — SIGNATURE EFFECT */}
          <div className="relative w-full max-w-6xl my-4 sm:my-6">
            <div className="horizon-arc-wrapper">
              <div className="horizon-arc-glow" />
              <div className="horizon-arc-line" />
              
              {/* TRUSTED BY SECTION inside horizon */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 w-full text-center px-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#606060] font-medium mb-4 font-mono">
                  Trusted by security-conscious teams
                </p>

                <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-40 hover:opacity-75 transition-opacity font-mono text-xs text-[#9A9A9A]">
                  <span className="tracking-widest font-semibold">NORTHSTAR</span>
                  <span className="tracking-widest font-semibold">VERTEX</span>
                  <span className="tracking-widest font-semibold">CLOUDBASE</span>
                  <span className="tracking-widest font-semibold">SECURELABS</span>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING PRODUCT DASHBOARD PREVIEW (Partially Hidden Bottom) */}
          <div className="relative w-full max-w-5xl -mt-10 sm:-mt-14 z-30">
            <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#FF6A2A]/90 to-transparent z-40 blur-[0.5px]" />
            
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#0D0D0D]/95 border border-white/[0.07] shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-2xl">
              
              {/* Window Title Bar */}
              <div className="h-10 px-4 bg-[#121212]/90 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[11px] font-mono text-[#606060] bg-black/40 px-3 py-0.5 rounded-full border border-white/[0.05]">
                  app.breachalert.net/security-overview
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse" />
                  <span className="text-[10px] text-[#35D07F] font-mono hidden sm:inline">PROTECTED</span>
                </div>
              </div>

              {/* Dashboard Internal Layout Preview */}
              <div className="flex min-h-[380px] sm:min-h-[440px] text-left">
                
                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-56 bg-[#121212]/90 border-r border-white/[0.06] p-4">
                  <div className="flex items-center gap-2 px-2 py-2 mb-4 border-b border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-[#FF6A2A] flex items-center justify-center">
                      <span className="material-symbols-outlined text-black text-sm font-bold">shield</span>
                    </div>
                    <span className="font-semibold text-white text-sm font-display">BreachAlert</span>
                  </div>

                  <div className="flex flex-col gap-1 text-xs font-medium">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30">
                      <span className="material-symbols-outlined text-sm">dashboard</span>
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#9A9A9A]">
                      <span className="material-symbols-outlined text-sm">warning</span>
                      <span>Breach Timeline</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#9A9A9A]">
                      <span className="material-symbols-outlined text-sm">mail</span>
                      <span>Monitored Identities</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#9A9A9A]">
                      <span className="material-symbols-outlined text-sm">radar</span>
                      <span>Threat Feed</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#9A9A9A] mt-4">
                      <span className="material-symbols-outlined text-sm">settings</span>
                      <span>Settings</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#9A9A9A]">
                      <span className="material-symbols-outlined text-sm">help</span>
                      <span>Support</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Main Content */}
                <div className="flex-1 p-4 sm:p-6 bg-[#090909] flex flex-col gap-5 overflow-hidden">
                  
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-white font-display">Security Overview</h3>
                      <p className="text-[11px] text-[#9A9A9A]">Continuous reconnaissance telemetry</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-neutral-400 text-lg">notifications</span>
                      <div className="w-7 h-7 rounded-full bg-[#FF6A2A]/20 text-[#FF6A2A] flex items-center justify-center font-bold text-xs font-mono">BA</div>
                    </div>
                  </div>

                  {/* 4 Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#121212] border border-white/[0.07] p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-[#606060] uppercase">Protected Identities</div>
                      <div className="text-lg font-bold text-white mt-0.5">3 / 5</div>
                    </div>
                    <div className="bg-[#121212] border border-white/[0.07] p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-[#606060] uppercase">Active Monitoring</div>
                      <div className="text-lg font-bold text-[#35D07F] mt-0.5">ONLINE</div>
                    </div>
                    <div className="bg-[#121212] border border-white/[0.07] p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-[#606060] uppercase">Breaches Detected</div>
                      <div className="text-lg font-bold text-[#FF6A2A] mt-0.5">2</div>
                    </div>
                    <div className="bg-[#121212] border border-white/[0.07] p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-[#606060] uppercase">Last Scan</div>
                      <div className="text-lg font-bold text-neutral-200 mt-0.5">4 min ago</div>
                    </div>
                  </div>

                  {/* Line Graph & Recent Breach Entries */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
                    <div className="bg-[#121212] border border-white/[0.07] rounded-xl p-3.5 flex flex-col justify-between">
                      <span className="text-xs font-semibold text-white font-mono uppercase tracking-wider">Threat Activity</span>
                      <div className="h-20 w-full flex items-end gap-1.5 pt-2">
                        {[20, 35, 25, 70, 40, 85, 50, 90, 30, 65, 80].map((h, i) => (
                          <div key={i} className="flex-1 bg-[#181818] rounded-t-sm overflow-hidden flex items-end">
                            <div className="w-full bg-[#FF6A2A]" style={{ height: `${h}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#121212] border border-white/[0.07] rounded-xl p-3.5 space-y-2">
                      <span className="text-xs font-semibold text-white font-mono uppercase tracking-wider block mb-2">Recent Breach Activity</span>
                      <div className="bg-[#181818] p-2 rounded-lg flex justify-between items-center text-xs">
                        <div>
                          <p className="font-semibold text-[#FF453A]">Credential Exposure</p>
                          <p className="text-[10px] text-[#606060]">2 hours ago</p>
                        </div>
                        <span className="font-mono text-[10px] bg-red-500/10 text-[#FF453A] px-2 py-0.5 rounded border border-red-500/20">Critical</span>
                      </div>
                      <div className="bg-[#181818] p-2 rounded-lg flex justify-between items-center text-xs">
                        <div>
                          <p className="font-semibold text-[#FFB340]">Email Database Leak</p>
                          <p className="text-[10px] text-[#606060]">Yesterday</p>
                        </div>
                        <span className="font-mono text-[10px] bg-amber-500/10 text-[#FFB340] px-2 py-0.5 rounded border border-amber-500/20">Warning</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* BELOW-HERO FEATURES */}
      <section id="features" className="py-24 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-tight font-display mb-4">
            Protection that never sleeps.
          </h2>
          <p className="text-[#9A9A9A] text-base sm:text-lg">
            BreachAlert continuously watches your digital identity so you don't have to.
          </p>
        </div>

        <div className="space-y-16">
          {MAIN_FEATURES.map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 sm:p-12 rounded-3xl bg-[#121212] border border-white/[0.07] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 backdrop-blur-md"
            >
              <div className="max-w-xl">
                <span className="font-mono text-xs text-[#FF6A2A] font-semibold tracking-widest block mb-2">{item.title}</span>
                <h3 className="text-2xl sm:text-3xl font-medium text-white font-display mb-3">{item.heading}</h3>
                <p className="text-sm text-[#9A9A9A] leading-relaxed">{item.desc}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#FF6A2A] text-3xl">shield</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 z-20 relative">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121212] border border-white/[0.07] text-center">
          <h2 className="text-2xl sm:text-3xl font-medium text-white mb-8 font-display">
            Your data. Under constant watch.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SECURITY_PILLARS.map((p, idx) => (
              <div key={idx} className="p-5 bg-[#0D0D0D] border border-white/[0.06] rounded-2xl text-left">
                <span className="material-symbols-outlined text-[#FF6A2A] text-2xl mb-3">{p.icon}</span>
                <h4 className="text-sm font-semibold text-white mb-1">{p.title}</h4>
                <p className="text-xs text-[#9A9A9A]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;