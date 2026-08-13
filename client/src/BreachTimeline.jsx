// Maps HIBP-style data classes to a Material Symbol icon + severity color.
const DATA_CLASS_META = {
  'Passwords': { icon: 'password', severity: 'error' },
  'Credit cards': { icon: 'credit_card', severity: 'error' },
  'Phone numbers': { icon: 'call', severity: 'tertiary' },
  'Email addresses': { icon: 'mail', severity: 'tertiary' },
  'Dates of birth': { icon: 'cake', severity: 'tertiary' }
};

function metaFor(dataClasses = []) {
  // Escalate to the most severe icon among the leaked data types.
  const hasCritical = dataClasses.some(dc => DATA_CLASS_META[dc]?.severity === 'error');
  const primaryClass = dataClasses[0];
  const fallback = { icon: 'warning', severity: hasCritical ? 'error' : 'tertiary' };
  const meta = DATA_CLASS_META[primaryClass] || fallback;
  return { ...meta, severity: hasCritical ? 'error' : meta.severity };
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
    <section className="glass-panel rounded-2xl p-6 flex flex-col border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error via-tertiary to-transparent"></div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-mono text-xs text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-error text-sm">warning</span> Priority Alerts
        </h3>
        {events.length > 0 && (
          <span className="bg-error/10 text-error px-2 py-0.5 rounded text-xs font-mono">{events.length} New</span>
        )}
      </div>

      {events.length === 0 ? (
        <p className="font-body text-sm text-on-surface-variant/70 text-center py-6">
          No breaches found (yet) — good news!
        </p>
      ) : (
        <div className="space-y-3 flex-1">
          {events.map(ev => {
            const { icon, severity } = metaFor(ev.data_classes);
            const colorClasses = severity === 'error'
              ? 'bg-error/10 text-error border-error/20'
              : 'bg-tertiary/10 text-tertiary border-tertiary/20';
            const titleColor = severity === 'error' ? 'text-error' : 'text-tertiary';

            return (
              <div
                key={ev.id}
                className="bg-surface-container/30 border border-white/5 p-4 rounded-xl flex gap-4 items-start hover:bg-surface-container/50 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${colorClasses}`}>
                  <span className="material-symbols-outlined text-lg">{icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h4 className={`font-body text-sm font-semibold ${titleColor} truncate`}>{ev.breach_name}</h4>
                    <span className="font-mono text-[10px] text-outline-variant shrink-0">{timeAgo(ev.discovered_at)}</span>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant/80 mb-2">
                    Breached {new Date(ev.breach_date).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(ev.data_classes || []).map(dc => (
                      <span key={dc} className="font-mono text-[10px] uppercase tracking-wide bg-surface-container-high/50 text-on-surface-variant px-2 py-0.5 rounded border border-white/5">
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