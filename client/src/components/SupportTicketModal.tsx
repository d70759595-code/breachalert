import React, { useState } from 'react';
import { Modal } from './Modal';
import { Send, RefreshCw } from 'lucide-react';
import { useToast } from './Toast';

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isOpen,
  onClose
}) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Incident Response');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showToast('Support ticket submitted! A SOC analyst will contact you.', 'success');
      setSubject('');
      setDescription('');
      onClose();
    }, 1400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit SOC Incident Ticket" maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-neutral-400">
          Directly submit an incident report or inquiry to our Tier-3 security operations team.
        </p>

        <div>
          <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
            Incident Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#080808] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6A2A]"
          >
            <option value="Incident Response">Incident Response & Remediation</option>
            <option value="Account Access">Account & Multi-Factor Access</option>
            <option value="Domain Monitoring">Enterprise Domain Telemetry</option>
            <option value="API Integration">API & Webhook Triggers</option>
          </select>
        </div>

        <div>
          <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
            Ticket Subject
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Critical credential dump investigation request"
            className="w-full bg-[#080808] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
          />
        </div>

        <div>
          <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
            Incident Details & Log Telemetry
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide context regarding the suspected compromise..."
            className="w-full bg-[#080808] border border-white/[0.1] rounded-xl p-4 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A] resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-neutral-300 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(255,106,42,0.4)] flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Submitting Ticket...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Incident Ticket</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
