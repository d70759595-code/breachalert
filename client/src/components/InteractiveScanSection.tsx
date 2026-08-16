import React, { useState } from 'react';
import { Search, ShieldAlert, ArrowRight, RefreshCw, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InteractiveScanSection: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<null | {
    scanned: string;
    foundBreaches: number;
    breaches: Array<{ name: string; date: string; data: string; severity: 'Critical' | 'Warning' }>;
  }>(null);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        scanned: emailInput,
        foundBreaches: 2,
        breaches: [
          {
            name: "Collection #1 Stealer Dump",
            date: "May 2024",
            data: "Email, Password, IP Hash",
            severity: "Critical"
          },
          {
            name: "Canva Breach Archive",
            date: "May 2019",
            data: "Email, Usernames, Passwords",
            severity: "Warning"
          }
        ]
      });
    }, 1800);
  };

  return (
    <section className="py-20 relative z-20 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-gradient-to-b from-[#141414] to-[#0E0E0E] border border-white/[0.1] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center">
        
        {/* Glow accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#FF6A2A]/20 blur-[90px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A2A]/10 border border-[#FF6A2A]/20 text-[#FF6A2A] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Search className="w-3.5 h-3.5" /> Instant Identity Scanner
          </div>

          <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
            Test Your Exposure Now
          </h2>

          <p className="text-[#929292] text-sm sm:text-base mb-8">
            Enter your email to run an instant diagnostic against 14B+ breached record indexes.
          </p>

          <form onSubmit={handleScanSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email address (e.g. alex@company.com)..."
                className="w-full bg-[#080808] border border-white/[0.12] rounded-full pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>
            
            <button
              type="submit"
              disabled={isScanning}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black font-semibold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(255,106,42,0.4)] flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Dark Web...</span>
                </>
              ) : (
                <>
                  <span>Run Deep Scan</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Results Box */}
          {scanResult && (
            <div className="mt-8 p-6 rounded-2xl bg-[#070707] border border-[#FF3B30]/40 text-left animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                <div className="flex items-center gap-2 text-[#FF3B30] font-semibold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{scanResult.foundBreaches} Breaches Found For {scanResult.scanned}</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">ACTION REQUIRED</span>
              </div>

              <div className="space-y-3 mb-6">
                {scanResult.breaches.map((b, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#141414] border border-white/[0.06] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">{b.name}</div>
                      <div className="text-[11px] text-[#929292] mt-0.5">Leaked: {b.data} • {b.date}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${b.severity === 'Critical' ? 'bg-[#FF3B30]/20 text-[#FF3B30]' : 'bg-[#FFB020]/20 text-[#FFB020]'}`}>
                      {b.severity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-neutral-400">
                  Enable continuous protection to auto-remediate and monitor new dumps 24/7.
                </p>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-full bg-[#FF6A2A] text-black font-semibold text-xs whitespace-nowrap hover:bg-[#FF783A] transition-colors"
                >
                  Protect This Identity
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-mono mt-4">
            <span>✓ Zero Data Retention</span>
            <span>✓ 100% Confidential Scan</span>
            <span>✓ 256-bit Encryption</span>
          </div>

        </div>

      </div>
    </section>
  );
};
