import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-[#0A0A0A]/75 border border-white/[0.07] rounded-[20px] px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300">
        
        {/* LEFT: Logo & Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF6A2A] to-[#FF7540] flex items-center justify-center shadow-md shadow-[#FF6A2A]/30 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-black font-bold text-base">shield</span>
          </div>
          <span className="text-white font-semibold text-base tracking-tight font-display">BreachAlert</span>
        </Link>

        {/* CENTER: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#9A9A9A]">
          <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a>
          <Link to="/pricing" className="hover:text-white transition-colors duration-200">Pricing</Link>
          <Link to="/support" className="hover:text-white transition-colors duration-200">Support</Link>
        </nav>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-xs font-semibold text-white px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.07] transition-all"
              >
                Dashboard
              </Link>
              <button 
                onClick={onLogout}
                className="hidden sm:block text-xs font-medium text-[#9A9A9A] hover:text-red-400 px-3 py-2 transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="hidden sm:inline-block text-xs font-medium text-[#9A9A9A] hover:text-white transition-colors px-3 py-2"
              >
                Log in
              </Link>
              <Link 
                to="/login" 
                className="bg-[#FF6A2A] hover:bg-[#FF7540] text-black font-semibold text-xs px-4 sm:px-5 py-2 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,106,42,0.45)] hover:shadow-[0_0_28px_rgba(255,106,42,0.65)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Get started
              </Link>
            </>
          )}

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#9A9A9A] hover:text-white p-1 rounded-lg focus:outline-none"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto rounded-2xl bg-[#0D0D0D]/95 border border-white/[0.07] backdrop-blur-2xl p-5 shadow-2xl transition-all">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <a href="#features" className="py-2 text-[#9A9A9A] hover:text-white border-b border-white/[0.06]" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="py-2 text-[#9A9A9A] hover:text-white border-b border-white/[0.06]" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <Link to="/pricing" className="py-2 text-[#9A9A9A] hover:text-white border-b border-white/[0.06]" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/support" className="py-2 text-[#9A9A9A] hover:text-white border-b border-white/[0.06]" onClick={() => setMobileMenuOpen(false)}>Support</Link>
            
            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" className="text-center py-2 text-[#9A9A9A] hover:text-white" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                <Link to="/login" className="text-center py-2.5 rounded-full bg-[#FF6A2A] text-black font-semibold text-xs" onClick={() => setMobileMenuOpen(false)}>Get started</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/dashboard" className="text-center py-2.5 rounded-full bg-[#FF6A2A] text-black font-semibold text-xs" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
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
    <footer className="border-t border-white/[0.07] bg-[#070707] pt-16 pb-12 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#FF6A2A] flex items-center justify-center">
                <span className="material-symbols-outlined text-black font-bold text-base">shield</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight font-display">BreachAlert</span>
            </Link>
            <p className="text-xs text-[#9A9A9A] max-w-sm leading-relaxed">
              Continuous identity monitoring that detects exposed credentials before they become your problem.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#35D07F] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse"></span>
              All Threat Reconnaissance Systems Operational
            </div>
          </div>

          {/* Product */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-mono">Product</div>
            <ul className="space-y-2 text-xs text-[#9A9A9A]">
              <li><a href="#features" className="hover:text-white transition-colors">Continuous Surveillance</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Instant Alerts</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Breach Intelligence</a></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-mono">Resources</div>
            <ul className="space-y-2 text-xs text-[#9A9A9A]">
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Security Advisories</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
            </ul>
          </div>

          {/* Compliance */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white font-mono">Security</div>
            <ul className="space-y-2 text-xs text-[#9A9A9A]">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">256-bit Encryption</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SOC2 Certified</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#606060]">
          <div>© {new Date().getFullYear()} BreachAlert Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#9A9A9A] font-mono text-[11px]">
              <span className="material-symbols-outlined text-sm text-[#FF6A2A]">verified_user</span>
              Continuous Identity Protection
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
