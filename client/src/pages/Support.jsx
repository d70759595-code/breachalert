import { useState } from 'react';
import { Navbar, Footer } from '../components/HeaderFooter';

function Support({ user }) {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex flex-col justify-between">
      <Navbar user={user} />

      <main className="flex-1 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 max-w-4xl mx-auto text-center w-full">
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
          How can we help?
        </h1>
        <p className="text-[#969696] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Search security advisories, platform documentation, or contact an active threat analyst.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-12">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-lg">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search security topics, HIBP reconnaissance, MFA setup..."
            className="w-full bg-[#121212] border border-white/[0.1] rounded-full pl-11 pr-4 py-3 text-xs text-white placeholder-[#626262] focus:outline-none focus:border-[#FF6A2A] shadow-xl"
          />
        </div>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
          <div className="p-6 rounded-3xl bg-[#121212] border border-white/[0.08] backdrop-blur-xl">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#FF6A2A]">radar</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2 font-display">How often are breach scans executed?</h3>
            <p className="text-xs text-[#969696] leading-relaxed">
              Manual scans can be triggered on demand. Family plan identities are automatically scanned every 24 hours via background BullMQ workers.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#121212] border border-white/[0.08] backdrop-blur-xl">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[#FF6A2A]">shield</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-2 font-display">What should I do if a breach is detected?</h3>
            <p className="text-xs text-[#969696] leading-relaxed">
              Immediately rotate compromised passwords on affected services, activate Multi-Factor Authentication (MFA), and audit credential reuse.
            </p>
          </div>
        </div>

        {/* Contact Analyst Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#141414] to-[#0D0D0D] border border-white/[0.1] text-center max-w-xl mx-auto shadow-2xl">
          <span className="material-symbols-outlined text-[#FF6A2A] text-3xl mb-3">support_agent</span>
          <h3 className="text-lg font-bold text-white font-display mb-1">Need Priority Analyst Support?</h3>
          <p className="text-xs text-[#969696] mb-6">Family plan subscribers get direct access to security intelligence advisors.</p>
          <a
            href="mailto:support@breachalert.net"
            className="inline-flex items-center gap-2 bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-semibold text-xs uppercase font-mono px-6 py-3 rounded-full transition-all shadow-lg"
          >
            <span>Contact Support Dispatch</span>
            <span className="material-symbols-outlined text-sm font-bold">mail</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Support;
