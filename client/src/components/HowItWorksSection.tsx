import React from 'react';
import { motion } from 'framer-motion';
import { MailCheck, SearchCode, ShieldAlert } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "ADD YOUR IDENTITY",
    subtitle: "Connect the email addresses and domains you want to monitor.",
    icon: <MailCheck className="w-6 h-6 text-[#FF6A2A]" />,
    detail: "Supports personal emails, corporate domains, and custom identity parameters."
  },
  {
    number: "02",
    title: "BREACHALERT MONITORS",
    subtitle: "Our system continuously checks for exposed information across dark web databases.",
    icon: <SearchCode className="w-6 h-6 text-[#FF6A2A]" />,
    detail: "Neural indexing scans stealer logs, Telegram dump channels, and pastes 24/7."
  },
  {
    number: "03",
    title: "GET PROTECTED",
    subtitle: "Receive alerts and take action when threats are detected.",
    icon: <ShieldAlert className="w-6 h-6 text-[#FF6A2A]" />,
    detail: "Instant zero-day alerts with clear step-by-step remediation protocols."
  }
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-xs font-mono font-semibold text-[#FF6A2A] uppercase tracking-[0.2em] mb-3">
          Simplicity & Speed
        </h2>
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
          How BreachAlert Works
        </p>
      </div>

      {/* 3 Step Desktop Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="relative p-8 rounded-3xl bg-[#121212] border border-white/[0.08] hover:border-[#FF6A2A]/40 transition-all group flex flex-col justify-between"
          >
            {/* Step Number Badge */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-3xl font-bold text-[#FF6A2A] group-hover:scale-110 transition-transform">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-sm font-mono font-bold uppercase text-[#FF6A2A] tracking-wider mb-2">
                {step.title}
              </h3>
              <p className="text-lg font-medium text-white mb-3 leading-snug">
                {step.subtitle}
              </p>
              <p className="text-xs text-[#929292] leading-relaxed">
                {step.detail}
              </p>
            </div>

            {/* Connecting line indicator for desktop */}
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-6 h-6 rounded-full bg-[#181818] border border-white/[0.12] flex items-center justify-center text-neutral-500 text-xs font-bold">
                →
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
