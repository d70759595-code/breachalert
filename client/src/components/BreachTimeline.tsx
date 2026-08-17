import React from 'react';
import { AlertTriangle, Key, CreditCard, Phone, Mail, Calendar, ShieldAlert } from 'lucide-react';

interface BreachEvent {
  id: number;
  breach_name: string;
  breach_date: string;
  discovered_at: string;
  data_classes: string[];
  monitored_email_id: number;
}

interface BreachTimelineProps {
  events: BreachEvent[];
}

const DATA_CLASS_META: Record<string, { icon: React.ReactNode; severity: 'error' | 'warning' }> = {
  'Passwords': { icon: <Key className="w-4 h-4" />, severity: 'error' },
  'Credit cards': { icon: <CreditCard className="w-4 h-4" />, severity: 'error' },
  'Phone numbers': { icon: <Phone className="w-4 h-4" />, severity: 'warning' },
  'Email addresses': { icon: <Mail className="w-4 h-4" />, severity: 'warning' },
  'Dates of birth': { icon: <Calendar className="w-4 h-4" />, severity: 'warning' }
};

function metaFor(dataClasses: string[] = []) {
  const hasCritical = dataClasses.some(dc => DATA_CLASS_META[dc]?.severity === 'error');
  const primaryClass = dataClasses[0];
  const fallbackIcon = <AlertTriangle className="w-4 h-4" />;
  const meta = DATA_CLASS_META[primaryClass] || { icon: fallbackIcon, severity: hasCritical ? 'error' : 'warning' };
  return { ...meta, severity: hasCritical ? ('error' as const) : meta.severity };
}

function timeAgo(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export const BreachTimeline: React.FC<BreachTimelineProps> = ({ events }) => {
  return (
    <section className="rounded-3xl bg-[#141414] border border-white/[0.08] p-6 flex flex-col shadow-2xl relative overflow-hidden text-left">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF3B30] via-[#FFB020] to-transparent"></div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-mono text-xs text-[#FF3B30] uppercase tracking-widest flex items-center gap-2 font-semibold">
          <ShieldAlert className="w-4 h-4 text-[#FF3B30]" /> Priority Threat Incidents
        </h3>
        {events.length > 0 && (
          <span className="bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
            {events.length} Discovered
          </span>
        )}
      </div>

      {events.length === 0 ? (
        <div className="py-8 text-center border border-dashed border-white/[0.06] rounded-2xl">
          <p className="text-xs font-mono text-[#35D07F] font-semibold flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#35D07F]" /> ZERO BREACHES FOUND
          </p>
          <p className="text-xs text-neutral-500">Your monitored identities have clean telemetry records.</p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px]">
          {events.map((ev) => {
            const { icon, severity } = metaFor(ev.data_classes);
            const isCritical = severity === 'error';

            return (
              <div
                key={ev.id}
                data-breach-id={ev.id}
                className="bg-[#0D0D0D] border border-white/[0.06] p-4 rounded-2xl flex gap-3.5 items-start hover:border-[#FF6A2A]/40 transition-all cursor-pointer group"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isCritical
                      ? 'bg-[#FF3B30]/15 text-[#FF3B30] border-[#FF3B30]/30'
                      : 'bg-[#FFB020]/15 text-[#FFB020] border-[#FFB020]/30'
                  }`}
                >
                  {icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h4 className={`text-xs font-semibold group-hover:underline truncate ${isCritical ? 'text-[#FF3B30]' : 'text-[#FFB020]'}`}>
                      {ev.breach_name}
                    </h4>
                    <span className="font-mono text-[10px] text-neutral-500 shrink-0">{timeAgo(ev.discovered_at)}</span>
                  </div>

                  <p className="text-[11px] text-neutral-400 mb-2">
                    Leaked: {new Date(ev.breach_date).toLocaleDateString()}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {(ev.data_classes || []).map((dc) => (
                      <span
                        key={dc}
                        className="font-mono text-[9px] uppercase tracking-wide bg-white/[0.04] text-neutral-300 px-2 py-0.5 rounded border border-white/[0.06]"
                      >
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
};
