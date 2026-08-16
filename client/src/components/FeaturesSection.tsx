import React from 'react';
import { Eye, Bell, Lock, Cpu, Radar, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Cpu className="w-6 h-6 text-[#FF6A2A]" />,
    title: "AI Breach Detection",
    description: "Neural pattern matching continuously analyzes dark web forums, paste sites, and database dumps for your data.",
    tag: "AI Engine",
    span: "col-span-1 md:col-span-2 lg:col-span-1"
  },
  {
    icon: <Eye className="w-6 h-6 text-[#FF6A2A]" />,
    title: "Continuous Monitoring",
    description: "24/7 background reconnaissance scans new stealer malware logs and corporate compromise dumps as they happen.",
    tag: "24/7 Active",
    span: "col-span-1 md:col-span-2 lg:col-span-1"
  },
  {
    icon: <Bell className="w-6 h-6 text-[#FF6A2A]" />,
    title: "Instant Security Alerts",
    description: "Get real-time push, SMS, and email notifications the second an identity match is discovered anywhere on the web.",
    tag: "Zero Latency",
    span: "col-span-1 md:col-span-2 lg:col-span-1"
  },
  {
    icon: <Lock className="w-6 h-6 text-[#FF6A2A]" />,
    title: "Identity Protection",
    description: "Monitor email addresses, passwords, phone numbers, credit card leaks, and sensitive personal identifiers.",
    tag: "Comprehensive",
    span: "col-span-1 md:col-span-3 lg:col-span-2"
  },
  {
    icon: <Radar className="w-6 h-6 text-[#FF6A2A]" />,
    title: "Contextual Risk Scoring",
    description: "Evaluate severity levels and receive step-by-step remediation protocols tailored to each breach type.",
    tag: "Actionable",
    span: "col-span-1 md:col-span-3 lg:col-span-1"
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 text-[#FF6A2A] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5" /> Next-Gen Cyber Defense
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
          Your Digital Identity. Always Protected.
        </h2>
        <p className="text-[#929292] text-sm sm:text-base leading-relaxed">
          BreachAlert combines neural threat intelligence with deep dark web reconnaissance to keep your credentials and sensitive data secure.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`p-7 rounded-3xl bg-[#121212]/90 border border-white/[0.08] hover:border-[#FF6A2A]/50 transition-all duration-300 hover:-translate-y-1 group backdrop-blur-md shadow-xl flex flex-col justify-between ${item.span}`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF6A2A]/20 transition-all shadow-[0_0_15px_rgba(255,106,42,0.15)]">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#FF6A2A] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#929292] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center gap-2 text-xs font-medium text-[#FF6A2A] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Learn capability detail</span>
              <span>→</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
