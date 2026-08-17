import React, { useState } from 'react';
import { Mail, RefreshCw, Zap } from 'lucide-react';

interface EmailItem {
  id: number;
  email: string;
  verified: boolean;
  created_at: string;
}

interface EmailListProps {
  emails: EmailItem[];
  verifiedCount: number;
  onScanNow: (emailId: number) => Promise<void>;
}

export const EmailList: React.FC<EmailListProps> = ({ emails, verifiedCount, onScanNow }) => {
  const [scanningIds, setScanningIds] = useState<Record<number, boolean>>({});

  const handleScan = async (id: number) => {
    setScanningIds(prev => ({ ...prev, [id]: true }));
    await onScanNow(id);
    setTimeout(() => {
      setScanningIds(prev => ({ ...prev, [id]: false }));
    }, 1500);
  };

  return (
    <section className="rounded-3xl bg-[#141414] border border-white/[0.08] p-6 sm:p-8 flex flex-col h-full shadow-2xl relative overflow-hidden text-left">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6A2A] via-[#35D07F] to-transparent"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h3 className="font-mono text-xs text-[#FF6A2A] uppercase tracking-widest flex items-center gap-2 mb-2 font-semibold">
            <Zap className="w-4 h-4 text-[#FF6A2A]" /> Monitored Digital Identities
          </h3>
          <p className="text-sm text-[#929292]">
            {verifiedCount} of {emails.length} target identit{emails.length === 1 ? 'y' : 'ies'} actively guarded.
          </p>
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center border border-dashed border-white/[0.08] rounded-2xl">
          <Mail className="w-10 h-10 text-neutral-600 mb-3" />
          <p className="text-sm text-neutral-400 font-medium mb-1">No identities monitored yet</p>
          <p className="text-xs text-neutral-600 max-w-xs">
            Add your primary email address in the Target panel to initiate 24/7 dark web reconnaissance.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto">
          <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-3 border-b border-white/[0.06] font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
            <div className="pl-3">Target Identity</div>
            <div>Protection Status</div>
            <div>Added Date</div>
            <div className="pr-3 text-right">Actions</div>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            {emails.map((e) => (
              <div
                key={e.id}
                className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center p-3.5 rounded-2xl bg-[#0D0D0D] border border-white/[0.06] hover:border-[#FF6A2A]/30 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#FF6A2A]/40 transition-colors shrink-0">
                    <Mail className="w-4 h-4 text-neutral-400 group-hover:text-[#FF6A2A] transition-colors" />
                  </div>
                  <div className="font-mono text-white text-xs font-semibold truncate">{e.email}</div>
                </div>

                <div>
                  {e.verified ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35D07F]/15 border border-[#35D07F]/30 text-[#35D07F] font-mono text-[10px] font-bold tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#35D07F] animate-pulse" />
                      SECURE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB020]/15 border border-[#FFB020]/30 text-[#FFB020] font-mono text-[10px] font-bold tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFB020] animate-pulse" />
                      PENDING
                    </span>
                  )}
                </div>

                <div className="font-mono text-xs text-neutral-400">
                  {new Date(e.created_at).toLocaleDateString()}
                </div>

                <div className="text-right">
                  {e.verified && (
                    <button
                      onClick={() => handleScan(e.id)}
                      disabled={scanningIds[e.id]}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-neutral-200 hover:border-[#FF6A2A] hover:text-[#FF6A2A] transition-all disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${scanningIds[e.id] ? 'animate-spin' : ''}`} />
                      <span>{scanningIds[e.id] ? 'Scanning...' : 'Scan Now'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
