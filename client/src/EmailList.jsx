import { useState } from 'react';

function StatusChip({ verified }) {
  if (verified) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 w-fit">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="font-mono text-xs text-primary font-medium tracking-wide">SECURE</span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-tertiary/10 border border-tertiary/30 w-fit">
      <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary animate-pulse"></span>
      <span className="font-mono text-xs text-tertiary font-medium tracking-wide">PENDING</span>
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
    <section className="glass-panel rounded-2xl p-8 flex flex-col h-full border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">shield_person</span> Monitored Identities
          </h3>
          <p className="font-body text-sm text-on-surface-variant/70">
            {verifiedCount} of {emails.length} identit{emails.length === 1 ? 'y' : 'ies'} secured.
          </p>
        </div>
      </div>

      {emails.length === 0 ? (
        <p className="font-body text-sm text-on-surface-variant/70 py-8 text-center">
          No emails monitored yet — add one on the left to get started.
        </p>
      ) : (
        <div className="flex-1 overflow-x-auto">
          <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-4 border-b border-white/10 font-mono text-xs text-outline-variant uppercase tracking-wider">
            <div className="pl-4">Target Identity</div>
            <div>Protection Status</div>
            <div>Added</div>
            <div className="pr-4">Action</div>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {emails.map(e => (
              <div
                key={e.id}
                className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center p-4 rounded-xl hover:bg-surface-container-high/30 border border-transparent hover:border-white/5 transition-all group bg-surface-container/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border border-white/5 group-hover:border-primary/30 transition-colors shrink-0">
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">mail</span>
                  </div>
                  <div className="font-mono text-on-surface font-medium text-sm truncate">{e.email}</div>
                </div>
                <div><StatusChip verified={e.verified} /></div>
                <div className="font-mono text-sm text-outline-variant">
                  {new Date(e.created_at).toLocaleDateString()}
                </div>
                <div>
                  {e.verified && (
                    <button
                      onClick={() => handleScan(e.id)}
                      disabled={scanningIds[e.id]}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high/50 border border-white/10 text-on-surface-variant text-xs font-mono hover:border-primary/40 hover:text-primary transition-all disabled:opacity-50"
                    >
                      <span className={`material-symbols-outlined text-sm ${scanningIds[e.id] ? 'animate-spin' : ''}`}>
                        {scanningIds[e.id] ? 'progress_activity' : 'sync'}
                      </span>
                      {scanningIds[e.id] ? 'Queued' : 'Scan Now'}
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
}

export default EmailList;