import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Search, Shield, HelpCircle, MessageSquare, Mail, ArrowRight } from 'lucide-react';

const TOPICS = [
  { icon: <Shield className="w-5 h-5 text-[#FF6A2A]" />, title: "Account & MFA Security", desc: "Setting up multi-factor auth, session management, and password recovery." },
  { icon: <HelpCircle className="w-5 h-5 text-[#FF3B30]" />, title: "Breach Incident Reports", desc: "Understanding threat vectors, leak telemetry, and remediation steps." },
  { icon: <MessageSquare className="w-5 h-5 text-[#FFB020]" />, title: "Billing & Enterprise", desc: "Upgrading your monitoring plan, invoices, and corporate domain seats." }
];

export const SupportPage: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-[#FF6A2A] selection:text-black bg-noise relative">
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Search Hero */}
        <section className="px-4 sm:px-6 max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-4">
            How Can We Assist Your Security Ops?
          </h1>
          <p className="text-[#929292] text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Search our cybersecurity knowledge base or connect directly with our SOC analyst team for immediate support.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles (e.g. 'Telegram dumps', 'Remediation')"
                className="w-full bg-[#141414] border border-white/[0.1] rounded-full pl-11 pr-4 py-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>
            <button className="px-6 py-3.5 rounded-full bg-[#FF6A2A] text-black font-bold text-xs hover:bg-[#FF783A] transition-colors whitespace-nowrap">
              Search Knowledge Base
            </button>
          </form>
        </section>

        {/* Common Topics */}
        <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-16 text-left">
          <h2 className="text-xl font-semibold text-white mb-6">Common Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOPICS.map((topic, i) => (
              <div key={i} className="p-6 rounded-3xl bg-[#141414] border border-white/[0.08] hover:border-[#FF6A2A]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                    {topic.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{topic.title}</h3>
                  <p className="text-xs text-[#929292] leading-relaxed mb-4">{topic.desc}</p>
                </div>
                <span className="text-xs font-mono text-[#FF6A2A] flex items-center gap-1 font-semibold hover:underline cursor-pointer">
                  View Articles <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Support Direct Channels */}
        <section className="px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="rounded-3xl bg-[#141414] border border-white/[0.08] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-left">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Need Dedicated Analyst Support?</h3>
              <p className="text-xs text-[#929292] mb-6">
                Our SOC analysts are on standby to evaluate critical breach events and domain exposures.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0B0B0B] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6A2A]/15 text-[#FF6A2A] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Live Analyst Chat</p>
                    <p className="text-[11px] text-neutral-400">Average response time: &lt; 3 mins</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0B0B0B] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6A2A]/15 text-[#FF6A2A] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Submit Incident Ticket</p>
                    <p className="text-[11px] text-neutral-400">For complex forensic log analysis or enterprise domains</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="rounded-2xl bg-[#080808] border border-white/[0.06] p-8 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FF6A2A]/15 border border-[#FF6A2A]/30 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-[#FF6A2A]" />
              </div>
              <p className="font-mono text-xs text-[#35D07F] font-bold tracking-widest mb-1">SYSTEM STATUS: OPERATIONAL</p>
              <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse" /> All Monitoring Nodes Active Globally
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
