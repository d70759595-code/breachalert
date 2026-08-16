import React, { useState } from 'react';
import { Shield, ChevronDown, Menu, X, ArrowRight, Lock, Eye, Bell, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  token?: string | null;
  onLogoutClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ token, onLogoutClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${id}`);
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-[#0F0F0F]/80 border border-white/[0.08] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl transition-all duration-300">
        
        {/* LEFT: Logo & Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <Shield className="w-4 h-4 text-white stroke-[2.2]" />
          </div>
          <span className="text-white font-semibold text-base sm:text-lg tracking-tight">
            BREACH<span className="text-[#FF6A2A]">ALERT</span>
          </span>
        </Link>

        {/* CENTER: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium">
          {/* Features Dropdown */}
          <div className="relative group">
            <button 
              onClick={() => setFeaturesOpen(!featuresOpen)}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors py-1"
            >
              Features
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform group-hover:rotate-180" />
            </button>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 p-2.5 rounded-2xl bg-[#141414] border border-white/[0.1] shadow-2xl backdrop-blur-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 text-left">
              <button 
                onClick={() => scrollToSection('#features')}
                className="w-full flex items-start gap-2.5 p-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <Eye className="w-4 h-4 text-[#FF6A2A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">AI Breach Recon</div>
                  <div className="text-[11px] text-neutral-400">Deep web & stealer log monitoring</div>
                </div>
              </button>

              <button 
                onClick={() => scrollToSection('#features')}
                className="w-full flex items-start gap-2.5 p-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors mt-1"
              >
                <Bell className="w-4 h-4 text-[#FF6A2A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Real-Time Alerts</div>
                  <div className="text-[11px] text-neutral-400">Instant notification of leaks</div>
                </div>
              </button>

              <button 
                onClick={() => scrollToSection('#features')}
                className="w-full flex items-start gap-2.5 p-2 rounded-xl text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors mt-1"
              >
                <Lock className="w-4 h-4 text-[#FF6A2A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Identity Safeguard</div>
                  <div className="text-[11px] text-neutral-400">Protect email & credentials</div>
                </div>
              </button>
            </div>
          </div>

          <button onClick={() => scrollToSection('#how-it-works')} className="text-neutral-300 hover:text-white transition-colors">
            How It Works
          </button>

          <Link to="/pricing" className={`transition-colors ${location.pathname === '/pricing' ? 'text-[#FF6A2A]' : 'text-neutral-300 hover:text-white'}`}>
            Pricing
          </Link>
          
          <button onClick={() => scrollToSection('#threat-intel')} className="text-neutral-300 hover:text-white transition-colors">
            Security
          </button>

          <Link to="/support" className={`transition-colors ${location.pathname === '/support' ? 'text-[#FF6A2A]' : 'text-neutral-300 hover:text-white'}`}>
            Support
          </Link>
        </nav>

        {/* RIGHT: Login & Get Started CTA / User Account Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {token ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-xs sm:text-sm font-medium text-[#FF6A2A] hover:text-[#FF783A] transition-colors flex items-center gap-1.5 px-2 py-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>

              {onLogoutClick && (
                <button
                  onClick={onLogoutClick}
                  className="text-xs font-mono text-[#FF3B30] hover:text-red-400 p-1.5 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition-colors px-2 py-1">
                Login
              </Link>

              <Link 
                to="/login?mode=signup"
                className="group relative inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black font-semibold text-xs sm:text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,106,42,0.4)] hover:shadow-[0_0_30px_rgba(255,106,42,0.7)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white p-1 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-5xl mx-auto rounded-3xl bg-[#111111]/95 border border-white/[0.1] backdrop-blur-2xl p-5 shadow-2xl transition-all">
          <div className="flex flex-col gap-4 text-sm font-medium text-left">
            <button onClick={() => scrollToSection('#features')} className="text-left py-2 text-neutral-200 hover:text-[#FF6A2A]">Features</button>
            <button onClick={() => scrollToSection('#how-it-works')} className="text-left py-2 text-neutral-200 hover:text-[#FF6A2A]">How It Works</button>
            <Link to="/pricing" className="py-2 text-neutral-200 hover:text-[#FF6A2A]" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <button onClick={() => scrollToSection('#threat-intel')} className="text-left py-2 text-neutral-200 hover:text-[#FF6A2A]">Security</button>
            <Link to="/support" className="py-2 text-neutral-200 hover:text-[#FF6A2A]" onClick={() => setMobileMenuOpen(false)}>Support</Link>
            
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
              {token ? (
                <Link to="/dashboard" className="text-[#FF6A2A] font-semibold text-sm" onClick={() => setMobileMenuOpen(false)}>Go To Dashboard →</Link>
              ) : (
                <>
                  <Link to="/login" className="text-neutral-300 hover:text-white font-medium text-sm" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                  <Link to="/login?mode=signup" className="px-5 py-2 rounded-full bg-[#FF6A2A] text-black font-semibold text-xs" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
