const DATA_CLASS_META = {
  'Passwords': { icon: 'key', severity: 'danger' },
  'Credit cards': { icon: 'credit_card', severity: 'danger' },
  'Phone numbers': { icon: 'call', severity: 'warning' },
  'Email addresses': { icon: 'mail', severity: 'warning' },
  'Dates of birth': { icon: 'cake', severity: 'warning' }
};

function metaFor(dataClasses = []) {
  const hasCritical = dataClasses.some(dc => DATA_CLASS_META[dc]?.severity === 'danger');
  const primaryClass = dataClasses[0];
  const fallback = { icon: 'warning', severity: hasCritical ? 'danger' : 'warning' };
  const meta = DATA_CLASS_META[primaryClass] || fallback;
  return { ...meta, severity: hasCritical ? 'danger' : meta.severity };
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function BreachTimeline({ events }) {
  return (
    <section className="bg-[#121212] rounded-3xl p-6 border border-white/[0.08] flex flex-col relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 via-[#FF6A2A] to-transparent" />

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-mono text-xs text-red-400 uppercase tracking-widest flex items-center gap-2 font-semibold">
          <span className="material-symbols-outlined text-red-400 text-sm">warning</span> Priority Security Incidents
        </h3>
        {events.length > 0 && (
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold">
            {events.length} Incident{events.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {events.length === 0 ? (
        <div className="py-8 text-center bg-[#0D0D0D] border border-dashed border-white/[0.08] rounded-2xl">
          <span className="material-symbols-outlined text-emerald-400 text-3xl mb-1">verified_user</span>
          <p className="text-xs text-neutral-300 font-medium">No Breaches Detected</p>
          <p className="text-[11px] text-[#626262] mt-0.5">Your identities are currently clean across scanned breach databases.</p>
        </div>
      ) : (
        <div className="space-y-3 flex-1">
          {events.map(ev => {
            const { icon, severity } = metaFor(ev.data_classes);
            const isDanger = severity === 'danger';
            const badgeBg = isDanger ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20';

            return (
              <div
                key={ev.id}
                className="bg-[#161616] border border-white/[0.06] hover:border-[#FF6A2A]/30 p-4 rounded-2xl flex gap-3.5 items-start transition-all"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${badgeBg}`}>
                  <span className="material-symbols-outlined text-base">{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h4 className={`text-xs font-bold font-display ${isDanger ? 'text-red-400' : 'text-amber-400'} truncate`}>
                      {ev.breach_name}
                    </h4>
                    <span className="font-mono text-[10px] text-[#626262] shrink-0">{timeAgo(ev.discovered_at)}</span>
                  </div>
                  <p className="text-xs text-[#969696] mb-2">
                    Breached on {new Date(ev.breach_date).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(ev.data_classes || []).map(dc => (
                      <span key={dc} className="font-mono text-[10px] uppercase tracking-wide bg-black/40 text-neutral-300 px-2 py-0.5 rounded-full border border-white/[0.06]">
                        {dc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default BreachTimeline;