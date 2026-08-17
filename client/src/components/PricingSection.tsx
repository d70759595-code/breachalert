import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingSection: React.FC = () => {
  const [annual, setAnnual] = useState(true);
  const [showNotice, setShowNotice] = useState(false);

  return (
    <section id="pricing" className="py-24 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-xs font-mono font-bold text-[#FF6A2A] uppercase tracking-[0.2em] mb-3">
          Transparent Cyber Security Pricing
        </h2>
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
          Protection That Fits Your Needs.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-[#141414] border border-white/[0.08]">
          <button 
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${!annual ? 'bg-[#FF6A2A] text-black font-semibold shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${annual ? 'bg-[#FF6A2A] text-black font-semibold shadow-md' : 'text-neutral-400 hover:text-white'}`}
          >
            Annual (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Free Starter Plan */}
        <div className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.18] transition-all text-left">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Free Protection</h3>
            <p className="text-xs text-[#929292] mb-6">Basic identity monitoring for individuals.</p>
            
            <div className="text-4xl font-bold text-white mb-6 font-mono">
              $0 <span className="text-sm font-normal text-neutral-500">/mo</span>
            </div>

            <ul className="space-y-3 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>1 Monitored Email Address</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Manual Breach Scans</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Basic Breach History Access</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Community Support</span>
              </li>
            </ul>
          </div>

          <Link 
            to="/login"
            className="w-full py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white text-xs font-semibold transition-all text-center block"
          >
            Get Started Free
          </Link>
        </div>

        {/* Recommended Family Plan (Featured) */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-[#181818] to-[#121212] border-2 border-[#FF6A2A] relative flex flex-col justify-between shadow-[0_0_40px_rgba(255,106,42,0.25)] text-left">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF6A2A] text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
            Recommended
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Family Plan</h3>
            <p className="text-xs text-[#929292] mb-6">Comprehensive automated security for the household.</p>
            
            <div className="text-4xl font-bold text-white mb-6 font-mono">
              ${annual ? '10' : '12'} <span className="text-sm font-normal text-neutral-500">/mo</span>
            </div>

            <ul className="space-y-3 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span className="font-semibold text-white">Up to 5 Email Addresses</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Automated Daily Dark Web Scans</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Instant Email & SMS Threat Alerts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Zero-Day Telegram & Dump Recon</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Priority Security Analyst Support</span>
              </li>
            </ul>
          </div>

          <div>
            <button 
              onClick={() => setShowNotice(true)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black text-xs font-bold transition-all shadow-[0_0_25px_rgba(255,106,42,0.5)] flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Upgrade Plan</span>
            </button>

            {showNotice && (
              <p className="text-[11px] font-mono text-[#FFB020] text-center mt-2.5">
                Payment checkout coming soon — upgrade is currently in early access!
              </p>
            )}
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="p-8 rounded-3xl bg-[#111111] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.18] transition-all text-left">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
            <p className="text-xs text-[#929292] mb-6">Custom architecture for corporate domains & SOCs.</p>
            
            <div className="text-4xl font-bold text-white mb-6 font-mono">
              Custom
            </div>

            <ul className="space-y-3 text-xs text-neutral-300 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Unlimited Domain & Employee Monitoring</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Custom API & Webhook Alert Triggers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>Dedicated Threat Intelligence Analyst</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#FF6A2A] shrink-0" />
                <span>99.99% SLA Guarantee & SOC2 Compliance</span>
              </li>
            </ul>
          </div>

          <Link 
            to="/support"
            className="w-full py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white text-xs font-semibold transition-all text-center block"
          >
            Contact Security Team
          </Link>
        </div>

      </div>
    </section>
  );
};
