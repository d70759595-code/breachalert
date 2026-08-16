import { useState } from 'react';

function StatusChip({ verified }) {
  if (verified) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        PROTECTED
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
      PENDING VERIFICATION
    </div>
  );
}

function EmailList({ emails, verifiedCount, onScanNow }) {
  const [scanningIds, setScanningIds] = useState({});

  async function handleScan(id) {
    setScanningIds(prev => ({ ...prev, [id]: true }));
    await onScanNow(id);
    setTimeout(() => {
      setScanningIds(prev => ({ ...prev, [id]: false }));
    }, 1500);
  }

  return (
    <section className="bg-[#121212] rounded-3xl p-6 sm:p-8 border border-white/[0.08] flex flex-col h-full relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF6A2A] via-amber-500 to-transparent" />

      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="font-mono text-xs text-[#FF6A2A] uppercase tracking-widest flex items-center gap-2 mb-1 font-semibold">
            <span className="material-symbols-outlined text-base">shield</span> Monitored Identities
          </h3>
          <p className="text-xs text-[#969696]">
            {verifiedCount} of {emails.length} identit{emails.length === 1 ? 'y' : 'ies'} actively surveillance protected.
          </p>
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="py-12 text-center flex flex-col items-center justify-center border border-dashed border-white/[0.08] rounded-2xl bg-[#0D0D0D]">
          <span className="material-symbols-outlined text-4xl text-neutral-600 mb-2">mark_email_unread</span>
          <p className="text-sm text-[#969696]">No emails monitored yet.</p>
          <p className="text-xs text-[#626262] mt-1">Add a target email address on the left to activate surveillance.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-x-auto">
          <div className="grid grid-cols-[2fr_1.2fr_1fr_auto] min-w-[500px] gap-4 pb-3 border-b border-white/[0.06] font-mono text-[11px] text-[#626262] uppercase tracking-wider">
            <div className="pl-2">Target Email / Identity</div>
            <div>Status</div>
            <div>Added Date</div>
            <div className="pr-2 text-right">Action</div>
          </div>
          
          <div className="flex flex-col gap-2.5 mt-3 min-w-[500px]">
            {emails.map(e => (
              <div
                key={e.id}
                className="grid grid-cols-[2fr_1.2fr_1fr_auto] gap-4 items-center p-3.5 rounded-2xl bg-[#161616] border border-white/[0.06] hover:border-[#FF6A2A]/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/[0.06] group-hover:border-[#FF6A2A]/40 transition-colors shrink-0">
                    <span className="material-symbols-outlined text-neutral-400 group-hover:text-[#FF6A2A] text-lg transition-colors">mail</span>
                  </div>
                  <div className="font-mono text-white font-medium text-xs sm:text-sm truncate">{e.email}</div>
                </div>

                <div>
                  <StatusChip verified={e.verified} />
                </div>

                <div className="font-mono text-xs text-[#969696]">
                  {new Date(e.created_at).toLocaleDateString()}
                </div>

                <div className="text-right">
                  {e.verified ? (
                    <button
                      onClick={() => handleScan(e.id)}
                      disabled={scanningIds[e.id]}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-[#FF6A2A]/15 border border-white/[0.1] hover:border-[#FF6A2A]/40 text-neutral-200 hover:text-[#FF6A2A] text-xs font-mono transition-all disabled:opacity-50"
                    >
                      <span className={`material-symbols-outlined text-sm ${scanningIds[e.id] ? 'animate-spin text-[#FF6A2A]' : ''}`}>
                        {scanningIds[e.id] ? 'sync' : 'search'}
                      </span>
                      {scanningIds[e.id] ? 'Scanning...' : 'Scan Now'}
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-neutral-500 italic">Check inbox</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default EmailList;