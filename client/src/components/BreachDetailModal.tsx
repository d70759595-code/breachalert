import React from 'react';
import { Modal } from './Modal';
import { ShieldAlert, Key, Calendar, Lock, CheckCircle2 } from 'lucide-react';

interface BreachEvent {
  id: number;
  breach_name: string;
  breach_date: string;
  discovered_at: string;
  data_classes: string[];
}

interface BreachDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: BreachEvent | null;
}

export const BreachDetailModal: React.FC<BreachDetailModalProps> = ({
  isOpen,
  onClose,
  event
}) => {
  if (!event) return null;

  const isCritical = event.data_classes.some(
    (dc) => dc.toLowerCase().includes('password') || dc.toLowerCase().includes('credit')
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Breach Incident: ${event.breach_name}`} maxWidth="max-w-xl">
      <div className="space-y-6">
        
        {/* Severity Banner */}
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between ${
            isCritical
              ? 'bg-[#FF3B30]/15 border-[#FF3B30]/30 text-[#FF3B30]'
              : 'bg-[#FFB020]/15 border-[#FFB020]/30 text-[#FFB020]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              {isCritical ? 'CRITICAL SEVERITY INCIDENT' : 'WARNING SEVERITY EXPOSURE'}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-black/40 px-2.5 py-0.5 rounded border border-current">
            ID #{event.id}
          </span>
        </div>

        {/* Breach Metadata */}
        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-[#0D0D0D] border border-white/[0.06]">
            <span className="text-neutral-500 block mb-1">COMPROMISE DATE</span>
            <span className="text-white font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FF6A2A]" />
              {new Date(event.breach_date).toLocaleDateString()}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0D0D0D] border border-white/[0.06]">
            <span className="text-neutral-500 block mb-1">DISCOVERED DATE</span>
            <span className="text-white font-semibold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#FF6A2A]" />
              {new Date(event.discovered_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Compromised Data Classes */}
        <div>
          <h4 className="text-xs font-mono font-semibold uppercase text-neutral-400 mb-2 tracking-wider">
            Compromised Information Vectors
          </h4>
          <div className="flex flex-wrap gap-2">
            {event.data_classes.map((dc) => (
              <span
                key={dc}
                className="font-mono text-xs px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5 text-[#FF6A2A]" />
                {dc}
              </span>
            ))}
          </div>
        </div>

        {/* Step-by-Step Remediation Protocols */}
        <div className="p-4 rounded-2xl bg-[#080808] border border-white/[0.08] space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#35D07F]" /> Required Remediation Protocol
          </h4>
          <ol className="text-xs text-[#929292] space-y-2 list-decimal list-inside leading-relaxed">
            <li>Immediately rotate your password on all accounts sharing credentials with this identity.</li>
            <li>Enable Multi-Factor Authentication (MFA/2FA) on your primary email and associated accounts.</li>
            <li>Revoke active session tokens and OAuth authorizations connected to this compromise.</li>
          </ol>
        </div>

        <div className="flex justify-end pt-4 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#FF6A2A] text-black font-bold text-xs hover:bg-[#FF783A] transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </Modal>
  );
};
