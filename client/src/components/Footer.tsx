import React from 'react';
import { Shield, ShieldCheck, Mail, Globe, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070707] pt-16 pb-12 relative z-20 text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white stroke-[2.2]" />
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                BREACH<span className="text-[#FF6A2A]">ALERT</span>
              </span>
            </Link>
            
            <p className="text-xs text-[#929292] max-w-sm leading-relaxed">
              Autonomous AI-powered cybersecurity platform protecting digital identities, corporate domains, and credentials against dark web breaches.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#FF6A2A]/50 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#FF6A2A]/50 transition-colors">
                <Globe className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#FF6A2A]/50 transition-colors">
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#FF6A2A]/50 transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links 1: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-white">Platform</div>
            <ul className="space-y-2 text-xs text-[#929292]">
              <li><a href="#features" className="hover:text-white transition-colors">AI Recon Engine</a></li>
              <li><a href="#threat-intel" className="hover:text-white transition-colors">Threat Feed</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Links 2: Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-white">Solutions</div>
            <ul className="space-y-2 text-xs text-[#929292]">
              <li><Link to="/login" className="hover:text-white transition-colors">Personal Identity</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Family Protection</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Enterprise SOC</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">API Integration</Link></li>
            </ul>
          </div>

          {/* Links 3: Resources */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-white">Resources</div>
            <ul className="space-y-2 text-xs text-[#929292]">
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Disclosure</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>© {new Date().getFullYear()} BreachAlert Inc. All rights reserved.</div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#35D07F]">
            <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse" />
            <span>ALL MONITORING NODES OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
