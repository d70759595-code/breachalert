import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-[#0A0A0A]/75 border border-white/[0.08] rounded-[20px] px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl transition-all duration-300">
        
        {/* LEFT: Logo & Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6A2A] to-[#FF8A54] flex items-center justify-center shadow-lg shadow-[#FF6A2A]/30 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-black font-bold text-lg">shield</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight font-display">BreachAlert</span>
        </Link>

        {/* CENTER: Navigation items */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-300">
          <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How it works</a>
          <Link to="/pricing" className="hover:text-white transition-colors duration-200">Pricing</Link>
          <Link to="/support" className="hover:text-white transition-colors duration-200">Support</Link>
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-xs font-semibold text-white px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-all"
              >
                Command Center
              </Link>
              <button 
                onClick={onLogout}
                className="hidden sm:block text-xs font-semibold text-neutral-400 hover:text-red-400 px-3 py-2 transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hidden sm:inline-block text-xs font-medium text-neutral-300 hover:text-white transition-colors px-3 py-2"
              >
                Log in
              </Link>
              <Link 
                to="/login" 
                className="bg-[#FF6A2A] hover:bg-[#FF7A3D] text-black font-semibold text-xs px-4 sm:px-5 py-2 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,106,42,0.4)] hover:shadow-[0_0_28px_rgba(255,106,42,0.65)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Get started
              </Link>
            </>
          )}

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white p-1 rounded-lg focus:outline-none"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto rounded-2xl bg-[#0D0D0D]/95 border border-white/[0.1] backdrop-blur-2xl p-5 shadow-2xl transition-all">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <a href="#features" className="py-2 text-neutral-200 hover:text-white border-b border-white/[0.06]" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="py-2 text-neutral-200 hover:text-white border-b border-white/[0.06]" onClick={() => setMobileMenuOpen(false)}>How it works</a>
            <Link to="/pricing" className="py-2 text-neutral-200 hover:text-white border-b border-white/[0.06]" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/support" className="py-2 text-neutral-200 hover:text-white border-b border-white/[0.06]" onClick={() => setMobileMenuOpen(false)}>Support</Link>
            
            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" className="text-center py-2 text-neutral-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                <Link to="/login" className="text-center py-2.5 rounded-full bg-[#FF6A2A] text-black font-semibold text-xs" onClick={() => setMobileMenuOpen(false)}>Get started</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/dashboard" className="text-center py-2.5 rounded-full bg-[#FF6A2A] text-black font-semibold text-xs" onClick={() => setMobileMenuOpen(false)}>Command Center</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070707] pt-16 pb-12 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#FF6A2A] flex items-center justify-center">
                <span className="material-symbols-outlined text-black font-bold text-base">shield</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight font-display">BreachAlert</span>
            </Link>
            <p className="text-xs text-[#969696] max-w-sm leading-relaxed">
              Autonomous identity reconnaissance & real-time dark web breach detection. Keeping your credentials, emails, and data safe 24/7.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Threat Intelligence Engine Active
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-mono">Product</div>
            <ul className="space-y-2 text-xs text-[#969696]">
              <li><a href="#features" className="hover:text-white transition-colors">Continuous Surveillance</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Zero-Day Alerts</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Breach Intelligence</a></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-mono">Resources</div>
            <ul className="space-y-2 text-xs text-[#969696]">
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Security Advisories</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Compliance */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-mono">Compliance</div>
            <ul className="space-y-2 text-xs text-[#969696]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">256-bit Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SOC2 Certified</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#626262]">
          <div>© {new Date().getFullYear()} BreachAlert Security Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
              <span className="material-symbols-outlined text-sm text-[#FF6A2A]">verified_user</span>
              Proactive Identity Protection
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
