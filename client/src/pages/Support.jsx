import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/HeaderFooter';

const TOPICS = [
  { icon: 'shield_person', title: 'Account Security', desc: 'MFA setup, password resets, and identity session management.' },
  { icon: 'warning', title: 'Breach Reports', desc: 'Understanding threat vectors, timeline analysis, and leak payload details.' },
  { icon: 'credit_card', title: 'Billing & Enterprise', desc: 'Invoices, plan upgrades, and enterprise API access.' }
];

function Support() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        
        {/* Search Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
            How can we help?
          </h1>
          <p className="text-[#969696] text-sm sm:text-base mb-8">
            Search our knowledge base or get in touch with our security response team for immediate assistance.
          </p>

          <form className="flex gap-2 max-w-xl mx-auto" onSubmit={e => e.preventDefault()}>
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">search</span>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search Help Center (e.g., 'API Keys', 'Breach Report')"
                className="w-full bg-[#141414] border border-white/[0.1] rounded-full pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>
            <button className="bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-semibold text-xs px-6 py-3 rounded-full transition-all shadow-md">
              Search
            </button>
          </form>
        </div>

        {/* Common Topics */}
        <div className="mb-16">
          <h2 className="text-lg font-bold text-white mb-6 font-display">Common Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOPICS.map((t, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#121212] border border-white/[0.08] hover:border-[#FF6A2A]/40 transition-all backdrop-blur-xl group">
                <div className="w-10 h-10 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-xl">{t.icon}</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2 font-display">{t.title}</h3>
                <p className="text-xs text-[#969696] mb-4 leading-relaxed">{t.desc}</p>
                <span className="font-mono text-xs text-[#FF6A2A] flex items-center gap-1">
                  View Articles <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-white/[0.08] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center backdrop-blur-xl">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">Need Dedicated Support?</h3>
            <p className="text-xs text-[#969696] mb-6 leading-relaxed">
              Our security response analysts are available 24/7 to assist with critical breach alerts and account configurations.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-[#181818] border border-white/[0.06] rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF6A2A]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#FF6A2A]">chat</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Live Chat Support</p>
                  <p className="text-[11px] text-[#626262]">Average response time: &lt; 2 mins</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#181818] border border-white/[0.06] rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF6A2A]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#FF6A2A]">mail</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Submit a Ticket</p>
                  <p className="text-[11px] text-[#626262]">For complex technical investigations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] rounded-2xl p-8 flex flex-col items-center justify-center border border-white/[0.06] text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/30 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#FF6A2A] text-2xl">support_agent</span>
            </div>
            <p className="font-mono text-xs text-[#FF6A2A] font-semibold tracking-wider mb-1">SYSTEM STATUS: OPERATIONAL</p>
            <p className="text-xs text-[#969696] flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> All Monitoring Nodes Active
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Support;
