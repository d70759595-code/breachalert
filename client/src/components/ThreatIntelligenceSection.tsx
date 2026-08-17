import React from 'react';
import { motion } from 'framer-motion';
import { Radio, AlertOctagon, Database, Terminal, ShieldAlert, Clock } from 'lucide-react';

const THREAT_FEED = [
  {
    icon: <Terminal className="w-4 h-4 text-[#FF3B30]" />,
    title: "Credential Dump Discovered",
    description: "Database leak containing 21.4M credentials indexed on dark web forum [Redacted].",
    time: "2 mins ago",
    severity: "CRITICAL",
    severityBg: "bg-[#FF3B30]/15 text-[#FF3B30] border-[#FF3B30]/30"
  },
  {
    icon: <Database className="w-4 h-4 text-[#FFB020]" />,
    title: "Stealer Malware Activity Surge",
    description: "RedLine & Lumma Stealer logs detected targeting browser saved autofill records.",
    time: "14 mins ago",
    severity: "HIGH",
    severityBg: "bg-[#FFB020]/15 text-[#FFB020] border-[#FFB020]/30"
  },
  {
    icon: <ShieldAlert className="w-4 h-4 text-[#FF6A2A]" />,
    title: "SaaS Enterprise Domain Exposure",
    description: "Corporate email matching known OAuth token compromise pattern identified.",
    time: "48 mins ago",
    severity: "WARNING",
    severityBg: "bg-[#FF6A2A]/15 text-[#FF6A2A] border-[#FF6A2A]/30"
  }
];

export const ThreatIntelligenceSection: React.FC = () => {
  return (
    <section id="threat-intel" className="py-24 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/20 text-[#FF3B30] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Live Recon Feed
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-6">
            Real-Time Threat Intelligence & Dark Web Recon
          </h2>

          <p className="text-[#929292] text-sm sm:text-base leading-relaxed mb-8">
            BreachAlert’s global network of sensor nodes constantly indexes stealer logs, dark web forums, Telegram breach channels, and corporate data leaks.
          </p>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#141414] border border-white/[0.08]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#35D07F] animate-ping" />
              <span className="text-white font-medium">12,480,000+ Records Analyzed Daily</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#141414] border border-white/[0.08]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF6A2A]" />
              <span className="text-white font-medium">Zero-Day Telegram & Forum Ingestion</span>
            </div>
          </div>
        </div>

        {/* Right Threat Card Display */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-[#0D0D0D] border border-white/[0.1] shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <AlertOctagon className="w-5 h-5 text-[#FF6A2A]" />
                <span className="font-mono text-sm font-semibold text-white uppercase tracking-wider">
                  Live Global Threat Stream
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#35D07F] bg-[#35D07F]/10 px-3 py-1 rounded-full border border-[#35D07F]/20">
                <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse" />
                STATUS: LIVE
              </div>
            </div>

            <div className="space-y-4">
              {THREAT_FEED.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-4 rounded-2xl bg-[#141414] border border-white/[0.06] hover:border-white/[0.15] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-bold ${item.severityBg}`}>
                          {item.severity}
                        </span>
                      </div>
                      <p className="text-xs text-[#929292] mt-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 shrink-0 self-end sm:self-center">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
