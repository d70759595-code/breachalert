import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/HeaderFooter';
import { fetchWithAuth } from '../api';

function Pricing({ user }) {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  async function handleUpgrade() {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setStatusMsg('');
    try {
      const res = await fetchWithAuth('/billing/create-checkout-session', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Checkout failed');
      if (data.url) {
        window.location.href = data.url;
      } else {
        setStatusMsg('Subscription upgrade initialized successfully.');
      }
    } catch (err) {
      setStatusMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F5F5] selection:bg-[#FF6A2A] selection:text-black bg-noise flex flex-col">
      <Navbar user={user} />

      <main className="flex-1 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center w-full">
        
        {/* Header */}
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-display mb-4">
          Secure Your Digital Identity
        </h1>
        <p className="text-[#969696] text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Choose the level of vigilance you need. Upgrade to the Family Plan for automated daily scanning, SMS alerts, and up to 5 monitored targets.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-[#141414] border border-white/[0.08] mb-12">
          <button 
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${!annual ? 'bg-[#FF6A2A] text-black shadow-md' : 'text-[#969696] hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${annual ? 'bg-[#FF6A2A] text-black shadow-md' : 'text-[#969696] hover:text-white'}`}
          >
            Annually (Save 20%)
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left items-stretch">
          
          {/* FREE PLAN */}
          <div className="p-8 rounded-3xl bg-[#121212] border border-white/[0.08] flex flex-col justify-between backdrop-blur-xl">
            <div>
              <h3 className="text-2xl font-bold text-white font-display mb-1">Free</h3>
              <p className="text-xs text-[#969696] mb-6">Basic surveillance protection for individuals.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white font-display">$0</span>
                <span className="text-xs text-[#969696]"> / month</span>
              </div>
              <ul className="space-y-3.5 mb-8 text-xs text-[#F5F5F5]">
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-lg">check_circle</span>
                  <span>1 Monitored Email Address</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-lg">touch_app</span>
                  <span>Manual Threat Scans</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-lg">history</span>
                  <span>Basic Breach History</span>
                </li>
              </ul>
            </div>
            
            <button className="w-full py-3 rounded-full bg-white/[0.04] border border-white/[0.1] text-[#969696] font-mono text-xs uppercase tracking-wider cursor-default">
              {user?.plan === 'family' ? 'Free Tier Available' : 'Current Active Plan'}
            </button>
          </div>

          {/* FAMILY PLAN (FEATURED) */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#181818] to-[#121212] border-2 border-[#FF6A2A] flex flex-col justify-between backdrop-blur-xl shadow-[0_0_40px_rgba(255,106,42,0.25)]">
            <span className="absolute -top-3.5 right-8 bg-[#FF6A2A] text-black font-mono text-[10px] uppercase font-bold tracking-widest px-3.5 py-1 rounded-full">
              Recommended
            </span>
            <div>
              <h3 className="text-2xl font-bold text-[#FF6A2A] font-display mb-1">Family Plan</h3>
              <p className="text-xs text-[#969696] mb-6">Comprehensive automated security for households.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white font-display">${annual ? '10' : '12'}</span>
                <span className="text-xs text-[#969696]"> / month</span>
              </div>
              <ul className="space-y-3.5 mb-8 text-xs text-[#F5F5F5]">
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-lg">check_circle</span>
                  <span>Up to 5 Monitored Email Addresses</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-lg">sync</span>
                  <span>Automated Daily Dark Web Scans</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-lg">sms</span>
                  <span>SMS Breach Emergency Alerts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-lg">travel_explore</span>
                  <span>Deep Web Reconnaissance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#FF6A2A] text-lg">support_agent</span>
                  <span>Priority Security Analyst Support</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-3.5 rounded-full bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,106,42,0.5)] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>{loading ? 'Processing Checkout...' : user?.plan === 'family' ? 'Family Plan Active' : 'Upgrade Protection'}</span>
              </button>
              {statusMsg && (
                <p className="font-mono text-[11px] text-[#FF6A2A] text-center mt-3 bg-[#FF6A2A]/10 p-2 rounded-xl border border-[#FF6A2A]/20">
                  {statusMsg}
                </p>
              )}
            </div>
          </div>

        </div>

        <div className="flex items-center justify-center gap-8 mt-12 font-mono text-xs text-[#626262]">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#FF6A2A]">shield</span> 256-bit Encryption
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#FF6A2A]">verified_user</span> Secure Stripe Checkout
          </span>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Pricing;