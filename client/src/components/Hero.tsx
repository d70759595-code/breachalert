import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  ArrowRight, 
  Lock, 
  Activity, 
  ShieldCheck, 
  Eye, 
  Search, 
  Bell, 
  AlertTriangle, 
  Mail, 
  Key, 
  Server, 
  CheckCircle2,
  RefreshCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  token?: string | null;
}

export const Hero: React.FC<HeroProps> = ({ token }) => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 sm:pt-40 md:pt-44 pb-20 overflow-hidden min-h-screen flex flex-col justify-between">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[950px] h-[450px] bg-radial from-[#FF6A2A]/20 via-[#FF4500]/05 to-transparent blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-[58%] left-1/2 -translate-x-1/2 w-[1000px] sm:w-[1400px] h-[550px] bg-radial from-[#FF5514]/30 via-[#FF6A2A]/10 to-transparent blur-[150px] pointer-events-none rounded-full" />

      {/* HERO MAIN CONTAINER */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* 1. ANNOUNCEMENT PILL */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => scrollToSection('#threat-intel')}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#141414]/90 border border-white/[0.12] hover:border-[#FF6A2A]/50 backdrop-blur-md shadow-xl transition-all duration-300 group cursor-pointer mb-6 sm:mb-8"
        >
          <span className="text-xs sm:text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
            Real-time breach monitoring is now live
          </span>
          <span className="w-5 h-5 rounded-full bg-[#FF6A2A] text-black flex items-center justify-center transition-transform group-hover:rotate-45 shadow-[0_0_10px_rgba(255,106,42,0.6)]">
            <ArrowRight className="w-3 h-3 stroke-[3]" />
          </span>
        </motion.div>

        {/* 2. LARGE CENTERED HERO HEADING */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-[70px] font-semibold tracking-tight leading-[1.1] max-w-4xl text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 mb-6"
        >
          Stay Ahead of Data Breaches With AI
        </motion.h1>

        {/* 3. HERO SUBTITLE */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#929292] text-base sm:text-lg md:text-xl max-w-2xl font-normal leading-relaxed mb-8 sm:mb-10"
        >
          AI-powered breach monitoring and identity protection. Detect exposed data early, monitor your digital identity, and take action before threats become problems.
        </motion.p>

        {/* 4. CTA BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14 sm:mb-18"
        >
          {/* Primary CTA */}
          <Link 
            to={token ? '/dashboard' : '/login?mode=signup'}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(255,106,42,0.45)] hover:shadow-[0_0_45px_rgba(255,106,42,0.7)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>{token ? 'Go to Dashboard' : 'Start Monitoring'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          {/* Secondary CTA */}
          <button 
            onClick={() => scrollToSection('#how-it-works')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-white/[0.25] text-white font-medium text-sm sm:text-base transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>See How It Works</span>
          </button>
        </motion.div>

        {/* 5. SIGNATURE ORANGE CURVED HORIZON */}
        <div className="relative w-full max-w-5xl my-4 sm:my-6">
          
          {/* Layered Glowing Arc Horizon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="horizon-arc-container"
          >
            <div className="horizon-arc-glow-bg" />
            <div className="horizon-arc-line" />
            
            {/* SECURITY TRUST AREA OVER HORIZON */}
            <div className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 z-20 w-full text-center px-4">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-neutral-400 font-semibold mb-4 sm:mb-5">
                Trusted by security-conscious teams
              </p>

              {/* Monochrome Security Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-70 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300">
                  <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>256-bit Encrypted</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300">
                  <Activity className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Real-Time Monitoring</span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Privacy First</span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-300">
                  <Eye className="w-3.5 h-3.5 text-neutral-400" />
                  <span>24/7 Threat Recon</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 6. FLOATING BREACHALERT PRODUCT DASHBOARD PREVIEW */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative w-full max-w-5xl -mt-8 sm:-mt-12 z-30 animate-float"
        >
          {/* Glowing Horizon Reflection on Top Edge of Dashboard */}
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#FF6A2A] to-transparent z-40 blur-[0.5px]" />
          
          {/* Main Glass Shell */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#0D0D0D]/95 border border-white/[0.12] shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden backdrop-blur-2xl">
            
            {/* Top Window Bar */}
            <div className="h-10 px-4 bg-[#141414]/90 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF3B30]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FFB020]/80" />
                <div className="w-3 h-3 rounded-full bg-[#35D07F]/80" />
              </div>
              
              <div className="text-[11px] font-mono text-neutral-400 bg-black/50 px-3 py-0.5 rounded-full border border-white/[0.06] flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-[#35D07F]" />
                <span>app.breachalert.io/security-overview</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-ping" />
                <span className="text-[10px] font-mono text-[#35D07F] font-semibold hidden sm:inline">LIVE VIGILANCE</span>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="flex min-h-[440px] sm:min-h-[500px]">
              
              {/* LEFT SIDEBAR */}
              <div className="hidden md:flex flex-col w-56 bg-[#111111]/90 border-r border-white/[0.06] p-4 text-left">
                <div className="flex items-center gap-2.5 px-2 py-3 mb-4 border-b border-white/[0.06]">
                  <div className="w-7 h-7 rounded-full bg-[#FF6A2A] flex items-center justify-center shadow-[0_0_12px_rgba(255,106,42,0.5)]">
                    <Shield className="w-4 h-4 text-black stroke-[2.5]" />
                  </div>
                  <span className="font-bold text-white text-sm tracking-tight">BREACHALERT</span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-medium">
                  <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#FF6A2A]/15 text-[#FF6A2A] border border-[#FF6A2A]/30">
                    <Activity className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>

                  <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Breach Timeline</span>
                  </button>

                  <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>Monitored Identities</span>
                  </button>

                  <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                    <Server className="w-4 h-4" />
                    <span>Threat Intelligence</span>
                  </button>

                  <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors">
                    <Key className="w-4 h-4" />
                    <span>Reports & Logs</span>
                  </button>
                </div>

                {/* Sidebar Active Engine Box */}
                <div className="mt-auto p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-200">
                    <span>AI Scanner Engine</span>
                    <span className="text-[#35D07F]">Active</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1">Checking dark web dumps</div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#FF6A2A] to-[#35D07F] h-full w-[92%] animate-pulse" />
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="flex-1 p-4 sm:p-6 bg-[#090909] flex flex-col gap-5 overflow-hidden text-left">
                
                {/* Search Header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search identities, breach dumps, or dark web records..." 
                      readOnly 
                      className="w-full bg-[#141414] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="w-8 h-8 rounded-xl bg-[#141414] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white relative">
                      <Bell className="w-4 h-4" />
                      <span className="w-2 h-2 rounded-full bg-[#FF3B30] absolute top-1.5 right-1.5" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6A2A] to-amber-300 p-[1.5px]">
                      <div className="w-full h-full rounded-full bg-[#141414] flex items-center justify-center font-bold text-xs text-white">
                        BA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Title */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div>
                    <h2 className="text-base font-semibold text-white">Security Overview</h2>
                    <p className="text-[11px] text-neutral-400">Continuous dark web monitoring & identity threat status</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#35D07F]/10 border border-[#35D07F]/20 text-[#35D07F] text-[11px] font-mono font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse" />
                    SYSTEM OPERATIONAL
                  </div>
                </div>

                {/* 4 Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#141414] border border-white/[0.08]">
                    <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">Protected Identities</div>
                    <div className="text-xl font-bold text-white mt-1">3 / 5</div>
                    <div className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#35D07F]" /> Active Protection
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#141414] border border-[#FF3B30]/30 shadow-[0_0_15px_rgba(255,59,48,0.1)]">
                    <div className="text-[10px] font-mono uppercase text-[#FF3B30] font-semibold tracking-wider">Breaches Detected</div>
                    <div className="text-xl font-bold text-[#FF3B30] mt-1">2</div>
                    <div className="text-[10px] text-[#FF3B30]/80 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Action Recommended
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#141414] border border-white/[0.08]">
                    <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">Active Monitoring</div>
                    <div className="text-xl font-bold text-[#35D07F] mt-1">ONLINE</div>
                    <div className="text-[10px] text-neutral-500 mt-1">24/7 Botnet Recon</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#141414] border border-white/[0.08]">
                    <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider">Last Scan</div>
                    <div className="text-xl font-bold text-white mt-1">4 MIN AGO</div>
                    <div className="text-[10px] text-neutral-500 mt-1 flex items-center gap-1">
                      <RefreshCcw className="w-3 h-3 text-[#FF6A2A]" /> Auto Sync
                    </div>
                  </div>
                </div>

                {/* Threat Activity & Recent Breaches */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* Threat Activity Orange Chart (5 cols) */}
                  <div className="lg:col-span-5 bg-[#141414] border border-white/[0.08] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xs font-semibold text-white">Threat Activity Feed</h3>
                        <p className="text-[10px] text-neutral-400">Breach detection velocity spikes</p>
                      </div>
                      <span className="text-[10px] font-mono text-[#FF6A2A] bg-[#FF6A2A]/10 px-2 py-0.5 rounded border border-[#FF6A2A]/20">
                        LIVE RECON
                      </span>
                    </div>

                    {/* Security Bar Chart */}
                    <div className="h-28 w-full flex items-end justify-between gap-1.5 pt-3">
                      {[30, 45, 25, 80, 50, 90, 65, 40, 95, 70, 85].map((height, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                          <div 
                            className="w-full rounded-t-sm transition-all duration-300 bg-gradient-to-t from-[#FF6A2A]/20 via-[#FF6A2A]/80 to-[#FF6A2A] group-hover:brightness-125"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Breaches Table (7 cols) */}
                  <div className="lg:col-span-7 bg-[#141414] border border-white/[0.08] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-xs font-semibold text-white">Recent Security Incident Alerts</h3>
                        <p className="text-[10px] text-neutral-400">Discovered in recent database leaks</p>
                      </div>
                      <Link to={token ? "/dashboard" : "/login"} className="text-[11px] text-[#FF6A2A] hover:underline font-medium">
                        View All
                      </Link>
                    </div>

                    {/* Table */}
                    <div className="w-full overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/[0.06] text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                            <th className="pb-2">Threat Event</th>
                            <th className="pb-2">Severity</th>
                            <th className="pb-2">Leaked Data</th>
                            <th className="pb-2 text-right">Detected</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-white/[0.04]">
                          <tr>
                            <td className="py-2.5 font-medium text-white flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                              Credential Exposure
                            </td>
                            <td className="py-2.5">
                              <span className="text-[10px] font-mono bg-[#FF3B30]/15 text-[#FF3B30] px-2 py-0.5 rounded border border-[#FF3B30]/30 font-semibold">
                                CRITICAL
                              </span>
                            </td>
                            <td className="py-2.5 text-neutral-400 text-[11px]">Passwords, SSN</td>
                            <td className="py-2.5 text-right text-neutral-400 font-mono text-[11px]">2 hours ago</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-medium text-white flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#FFB020]" />
                              Email Exposure
                            </td>
                            <td className="py-2.5">
                              <span className="text-[10px] font-mono bg-[#FFB020]/15 text-[#FFB020] px-2 py-0.5 rounded border border-[#FFB020]/30 font-semibold">
                                WARNING
                              </span>
                            </td>
                            <td className="py-2.5 text-neutral-400 text-[11px]">Emails, IP Address</td>
                            <td className="py-2.5 text-right text-neutral-400 font-mono text-[11px]">Yesterday</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
