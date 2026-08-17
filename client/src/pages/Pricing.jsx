import { useState } from 'react';
import { Navbar, Footer } from '../components/HeaderFooter';

function Pricing({ user, onLogout }) {
  const [annual, setAnnual] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex flex-col justify-between">
      <Navbar user={user} onLogout={onLogout} />

      <section className="flex-1 pt-32 sm:pt-40 pb-24 px-4 sm:px-6 max-w-5xl mx-auto text-center w-full relative z-10">
        <h1 className="text-3xl sm:text-5xl font-medium text-white tracking-tight font-display mb-4">
          Secure Your Digital Identity
        </h1>
        <p className="text-[#9A9A9A] text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Choose the level of vigilance you need. Upgrade to the Family Plan for automated, real-time scanning and immediate alerts when a breach is detected.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-xs font-mono tracking-widest uppercase transition-colors ${!annual ? 'text-white font-semibold' : 'text-[#606060]'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`w-12 h-6 rounded-full transition-all relative ${annual ? 'bg-[#FF6A2A]' : 'bg-[#181818] border border-white/[0.1]'}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${annual ? 'left-[26px]' : 'left-1'}`}></span>
          </button>
          <span className={`text-xs font-mono tracking-widest uppercase transition-colors ${annual ? 'text-white font-semibold' : 'text-[#606060]'}`}>Annually</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF6A2A] bg-[#FF6A2A]/10 px-2 py-0.5 rounded-full border border-[#FF6A2A]/20">Save 20%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          
          {/* Free Tier */}
          <div className="bg-[#121212] rounded-3xl p-8 border border-white/[0.08] backdrop-blur-xl flex flex-col">
            <h3 className="text-xl font-medium text-white font-display mb-1">Free Tier</h3>
            <p className="text-xs text-[#969696] mb-8">Basic manual protection for individuals.</p>
            
            <div className="mb-8">
              <span className="text-5xl font-medium text-white font-display">$0</span>
              <span className="text-sm text-[#606060]">/month</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-[#9A9A9A]"><span className="material-symbols-outlined text-[#606060] text-lg">check_circle</span> 1 Monitored Email Address</li>
              <li className="flex items-start gap-3 text-sm text-[#9A9A9A]"><span className="material-symbols-outlined text-[#606060] text-lg">search</span> Manual Threat Scans</li>
              <li className="flex items-start gap-3 text-sm text-[#9A9A9A]"><span className="material-symbols-outlined text-[#606060] text-lg">history</span> Basic Breach History</li>
            </ul>
            
            <button className="w-full py-3.5 rounded-full border border-white/[0.1] text-[#9A9A9A] font-semibold text-xs uppercase tracking-wider cursor-default bg-white/[0.02]">
              Current Plan
            </button>
          </div>

          {/* Family Plan */}
          <div className="bg-gradient-to-b from-[#141414] to-[#0D0D0D] rounded-3xl p-8 border border-[#FF6A2A]/40 backdrop-blur-xl flex flex-col relative shadow-[0_0_40px_rgba(255,106,42,0.1)]">
            <div className="absolute -top-3 right-8 bg-[#FF6A2A] text-black font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Recommended</div>
            <h3 className="text-xl font-medium text-[#FF6A2A] font-display mb-1">Family Plan</h3>
            <p className="text-xs text-[#969696] mb-8">Comprehensive automated security for the household.</p>
            
            <div className="mb-8">
              <span className="text-5xl font-medium text-white font-display">${annual ? '10' : '12'}</span>
              <span className="text-sm text-[#606060]">/month</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-start gap-3 text-sm text-white"><span className="material-symbols-outlined text-[#FF6A2A] text-lg">check_circle</span> Up to 5 Email Addresses</li>
              <li className="flex items-start gap-3 text-sm text-white"><span className="material-symbols-outlined text-[#FF6A2A] text-lg">sync</span> Automated Daily Scans</li>
              <li className="flex items-start gap-3 text-sm text-white"><span className="material-symbols-outlined text-[#FF6A2A] text-lg">mark_email_unread</span> Instant Emergency Alerts (SMS/Email)</li>
              <li className="flex items-start gap-3 text-sm text-white"><span className="material-symbols-outlined text-[#FF6A2A] text-lg">radar</span> 24/7 Dark Web Monitoring</li>
              <li className="flex items-start gap-3 text-sm text-white"><span className="material-symbols-outlined text-[#FF6A2A] text-lg">support_agent</span> Priority Analyst Support</li>
            </ul>
            
            <button
              onClick={() => setShowComingSoon(true)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF7540] hover:from-[#FF783A] hover:to-[#FF854D] text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,106,42,0.3)] hover:shadow-[0_0_30px_rgba(255,106,42,0.5)] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">lock</span> Upgrade Protection
            </button>
            {showComingSoon && (
              <p className="font-mono text-[10px] text-[#FF6A2A] text-center mt-4">
                Payment gateway connection pending — check back shortly!
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-16 font-mono text-[10px] text-[#606060] uppercase tracking-widest">
          <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">shield</span> 256-bit Encryption</span>
          <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">verified_user</span> Secure Checkout</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Pricing;