import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CtaBannerSection: React.FC = () => {
  return (
    <section className="py-20 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#141414] via-[#1A1A1A] to-[#141414] border border-white/[0.12] p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF6A2A]/20 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#FF6A2A] text-black flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,106,42,0.6)]">
            <Shield className="w-6 h-6 stroke-[2.5]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Protect Your Digital Footprint Today
          </h2>

          <p className="text-[#929292] text-base sm:text-lg mb-8 leading-relaxed">
            Data breaches happen every day. Take control of your exposure before hackers use your credentials against you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black font-semibold text-base transition-all duration-300 shadow-[0_0_35px_rgba(255,106,42,0.45)] hover:shadow-[0_0_50px_rgba(255,106,42,0.7)] flex items-center justify-center gap-2"
            >
              <span>Start Free Monitoring</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-medium text-base transition-all backdrop-blur-md flex items-center justify-center gap-2"
            >
              <span>View All Plans</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
