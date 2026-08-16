import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: "How does BreachAlert detect leaked passwords and credentials?",
    a: "BreachAlert uses autonomous threat reconnaissance crawlers that index public pastes, stealer logs, dark web forums, and verified breach dumps. We use zero-knowledge hashing to match your identity against exposed datasets without storing plaintext credentials."
  },
  {
    q: "Is my personal data safe when monitoring with BreachAlert?",
    a: "Yes, privacy and security are our core principles. We enforce 256-bit AES encryption, zero data retention on unverified queries, and strict SOC2/GDPR compliance. We never sell or share identity telemetry with third parties."
  },
  {
    q: "What happens when a breach containing my email is found?",
    a: "You will immediately receive a priority alert via SMS, email, or webhook detailing the breach source, the specific data types leaked (passwords, credit cards, SSN), and clear step-by-step remediation instructions."
  },
  {
    q: "What is the difference between Free and Family plans?",
    a: "The Free plan includes 1 monitored identity with manual scan capabilities. The Family plan monitors up to 5 email addresses with continuous automated daily background scans, dark web recon, and priority alerts."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 relative z-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 text-[#FF6A2A] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Everything You Need to Know
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx}
            className="rounded-2xl bg-[#111111] border border-white/[0.08] overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white text-base sm:text-lg hover:text-[#FF6A2A] transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${openIndex === idx ? 'rotate-180 text-[#FF6A2A]' : ''}`} />
            </button>

            {openIndex === idx && (
              <div className="px-6 pb-6 text-sm text-[#929292] leading-relaxed border-t border-white/[0.04] pt-4 animate-fadeIn">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
