import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/HeaderFooter';

const FEATURES = [
  {
    icon: 'radar',
    title: 'Continuous Monitoring',
    desc: 'Keep your email addresses under continuous breach surveillance across millions of dark web dumps.'
  },
  {
    icon: 'notifications_active',
    title: 'Instant Alerts',
    desc: 'Know immediately when your information appears in a newly discovered breach or paste bin.'
  },
  {
    icon: 'travel_explore',
    title: 'Breach Intelligence',
    desc: 'Understand what data was exposed, passwords compromised, and how serious the threat vector is.'
  },
  {
    icon: 'fingerprint',
    title: 'Identity Protection',
    desc: 'Track multiple identity vectors and keep your total digital footprint under automated control.'
  }
];

const STEPS = [
  {
    step: '01',
    title: 'Add your email',
    desc: 'Register the email addresses and identities you want to protect under 24/7 surveillance.'
  },
  {
    step: '02',
    title: 'Verify ownership',
    desc: 'Confirm identity ownership via secure instant email verification links.'
  },
  {
    step: '03',
    title: 'Monitor breaches',
    desc: 'Receive immediate alerts & actionable threat intelligence whenever a leak is detected.'
  }
];

function Landing() {
  const [scanInput, setScanInput] = useState('');

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise relative">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 sm:pt-40 md:pt-44 pb-20 overflow-hidden min-h-screen flex flex-col justify-between">
        
        {/* Background Atmospheric Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-radial from-[#FF6A2A]/20 via-[#FF4500]/05 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[1000px] sm:w-[1300px] h-[500px] bg-radial from-[#FF5514]/30 via-[#FF6A2A]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414]/90 border border-white/[0.12] hover:border-[#FF6A2A]/50 backdrop-blur-md shadow-xl transition-all duration-300 group cursor-pointer mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FF6A2A] animate-ping" />
            <span className="text-xs sm:text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
              Real-time breach monitoring is now live
            </span>
            <span className="w-5 h-5 rounded-full bg-[#FF6A2A] text-black flex items-center justify-center transition-transform group-hover:translate-x-0.5 shadow-[0_0_10px_rgba(255,106,42,0.6)]">
              <span className="material-symbols-outlined text-xs font-bold">arrow_forward</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-[76px] font-semibold tracking-tight leading-[1.08] max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 mb-6 font-display">
            Know When Your Data Is Exposed.
          </h1>

          {/* Hero Description */}
          <p className="text-[#969696] text-base sm:text-lg md:text-xl max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10">
            Stay ahead of data breaches with continuous identity monitoring, automated threat reconnaissance, and real-time alerts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12 sm:mb-16">
            <Link 
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(255,106,42,0.45)] hover:shadow-[0_0_45px_rgba(255,106,42,0.7)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">shield</span>
              <span>Protect My Email</span>
            </Link>

            <a 
              href="#how-it-works"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/[0.25] text-white font-medium text-sm sm:text-base transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 group"
            >
              <span className="material-symbols-outlined text-lg text-neutral-400 group-hover:text-white transition-colors">play_circle</span>
              <span>See How It Works</span>
            </a>
          </div>

          {/* Quick Email Scanner Input */}
          <div className="w-full max-w-md bg-[#121212]/90 border border-white/[0.1] rounded-full p-1.5 flex items-center shadow-2xl mb-16 backdrop-blur-xl">
            <span className="material-symbols-outlined text-neutral-500 pl-3.5 text-lg">search</span>
            <input 
              type="email" 
              value={scanInput}
              onChange={e => setScanInput(e.target.value)}
              placeholder="Enter email address to scan..." 
              className="bg-transparent border-none text-xs sm:text-sm text-white placeholder-[#626262] focus:outline-none flex-1 px-3"
            />
            <Link 
              to="/login"
              className="bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-semibold text-xs px-4 py-2 rounded-full transition-all flex items-center gap-1"
            >
              <span>Scan Now</span>
            </Link>
          </div>

          {/* CYBERSECURITY HERO VISUAL: Glowing Orange Horizon Arc */}
          <div className="relative w-full max-w-5xl my-4 sm:my-6">
            <div className="horizon-arc-container">
              <div className="horizon-arc-glow-bg" />
              <div className="horizon-arc-line" />
              
              {/* Trust Indicators Text around the Arc */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 w-full text-center px-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#626262] font-semibold mb-4 font-mono">
                  Trusted by security teams & 200+ organizations
                </p>

                {/* Company Logos */}
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-50 hover:opacity-80 transition-opacity">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-400 tracking-wider">
                    <span className="material-symbols-outlined text-lg text-[#FF6A2A]">security</span>
                    <span>SentinelTech</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-400 tracking-wider">
                    <span className="material-symbols-outlined text-lg text-[#FF6A2A]">lock</span>
                    <span>CipherGrid</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-400 tracking-wider">
                    <span className="material-symbols-outlined text-lg text-[#FF6A2A]">verified_user</span>
                    <span>ArmorCloud</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-400 tracking-wider">
                    <span className="material-symbols-outlined text-lg text-[#FF6A2A]">gavel</span>
                    <span>VanguardSec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING SECURITY DASHBOARD PREVIEW */}
          <div className="relative w-full max-w-5xl -mt-8 sm:-mt-12 z-30">
            {/* Top Border Glow Reflection */}
            <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#FF6A2A]/90 to-transparent z-40 blur-[0.5px]" />
            
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#0D0D0D]/95 border border-white/[0.12] shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-xl">
              
              {/* Window Title Bar */}
              <div className="h-10 px-4 bg-[#141414]/90 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[11px] font-mono text-[#626262] bg-black/40 px-3 py-0.5 rounded-full border border-white/[0.05]">
                  app.breachalert.net/security-overview
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#45D483] animate-ping" />
                  <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">PROTECTION ACTIVE</span>
                </div>
              </div>

              {/* Inner Dashboard Preview */}
              <div className="flex min-h-[380px] sm:min-h-[440px] text-left">
                
                {/* Preview Sidebar */}
                <div className="hidden md:flex flex-col w-56 bg-[#111111]/90 border-r border-white/[0.06] p-4">
                  <div className="flex items-center gap-2 px-2 py-2 mb-4 border-b border-white/[0.06]">
                    <div className="w-6 h-6 rounded-full bg-[#FF6A2A] flex items-center justify-center">
                      <span className="material-symbols-outlined text-black text-sm font-bold">shield</span>
                    </div>
                    <span className="font-bold text-white text-sm font-display">BreachAlert</span>
                  </div>

                  <div className="flex flex-col gap-1 text-xs font-medium">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30">
                      <span className="material-symbols-outlined text-sm">dashboard</span>
                      <span>Overview</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#969696]">
                      <span className="material-symbols-outlined text-sm">mail</span>
                      <span>Monitored Emails</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#969696]">
                      <span className="material-symbols-outlined text-sm">warning</span>
                      <span>Breach Timeline</span>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#969696]">
                      <span className="material-symbols-outlined text-sm">settings</span>
                      <span>Settings</span>
                    </div>
                  </div>

                  <div className="mt-auto p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[11px] font-semibold text-neutral-300 font-mono">Surveillance Engine</div>
                    <div className="text-[10px] text-[#969696] mt-0.5">3 Identities Monitored</div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#45D483] h-full w-[98%]" />
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-4 sm:p-6 bg-[#0E0E0E] flex flex-col gap-5 overflow-hidden">
                  
                  {/* Top Bar Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#141414] border border-white/[0.08] p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-[#626262] uppercase">Security Score</div>
                      <div className="text-xl font-bold text-[#45D483] mt-0.5">98 / 100</div>
                    </div>
                    <div className="bg-[#141414] border border-white/[0.08] p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-[#626262] uppercase">Monitored</div>
                      <div className="text-xl font-bold text-white mt-0.5">3 emails</div>
                    </div>
                    <div className="bg-[#141414] border border-white/[0.08] p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-[#626262] uppercase">Breaches</div>
                      <div className="text-xl font-bold text-[#FF6A2A] mt-0.5">1 detected</div>
                    </div>
                    <div className="bg-[#141414] border border-white/[0.08] p-3 rounded-xl">
                      <div className="text-[10px] font-mono text-[#626262] uppercase">Risk Level</div>
                      <div className="text-xl font-bold text-emerald-400 mt-0.5">Low</div>
                    </div>
                  </div>

                  {/* Chart / Threat Feed Preview */}
                  <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-4 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-white">Live Breach Detection Activity</h3>
                        <p className="text-[11px] text-[#969696]">Dark web reconnaissance timeline</p>
                      </div>
                      <span className="text-[10px] font-mono bg-[#FF6A2A]/10 text-[#FF6A2A] px-2 py-0.5 rounded border border-[#FF6A2A]/20">
                        AUTOMATED RECON
                      </span>
                    </div>

                    <div className="h-24 w-full flex items-end justify-between gap-2 pt-2">
                      {[15, 30, 20, 65, 45, 80, 40, 95, 25, 60, 85, 35].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#1A1A1A] rounded-t-sm overflow-hidden flex items-end">
                          <div 
                            className="w-full bg-gradient-to-t from-[#FF6A2A]/20 to-[#FF6A2A] rounded-t-sm"
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-[#FF6A2A] uppercase tracking-[0.2em] mb-3">Threat Defense Platform</h2>
          <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-display">
            Your digital identity. Under watch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-3xl bg-[#121212]/90 border border-white/[0.08] hover:border-[#FF6A2A]/40 transition-all duration-300 hover:-translate-y-1 group backdrop-blur-md shadow-lg"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#FF6A2A] text-2xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-display">{item.title}</h3>
              <p className="text-sm text-[#969696] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 relative z-20 max-w-6xl mx-auto px-4 sm:px-6 border-t border-white/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold text-[#FF6A2A] uppercase tracking-[0.2em] mb-3">Simple 3-Step Setup</h2>
          <p className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-display">
            How BreachAlert Protects You
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((s, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-[#121212] border border-white/[0.08] flex flex-col justify-between relative">
              <div>
                <span className="font-mono text-3xl font-bold text-[#FF6A2A] block mb-4">{s.step}</span>
                <h3 className="text-lg font-semibold text-white mb-2 font-display">{s.title}</h3>
                <p className="text-xs text-[#969696] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECURITY STATUS SECTION */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 z-20 relative">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#141414] to-[#0D0D0D] border border-white/[0.1] shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#FF6A2A]/20 blur-[80px] pointer-events-none" />
          
          <div className="w-14 h-14 rounded-full bg-[#FF6A2A]/10 border border-[#FF6A2A]/30 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[#FF6A2A] text-3xl animate-pulse">radar</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
            "Your security should never sleep."
          </h2>
          <p className="text-sm text-[#969696] max-w-xl mx-auto mb-8">
            Our automated crawlers continuously cross-reference dark web forums, paste bins, and stealer logs 24/7/365.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#969696] bg-black/50 px-6 py-3 rounded-full border border-white/[0.08]">
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              SYSTEM STATUS: PROTECTION ACTIVE
            </span>
            <span>Continuous Monitoring</span>
            <span>Zero-Day Intelligence</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;