import React, { useState } from 'react';
import { Modal } from './Modal';
import { Mail, Plus, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from './Toast';

const API_BASE = 'http://localhost:3000';

interface AddIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  onSuccess: () => void;
}

export const AddIdentityModal: React.FC<AddIdentityModalProps> = ({
  isOpen,
  onClose,
  token,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add target identity');

      showToast(`Verification link sent for ${email}. Please check inbox!`, 'success');
      setEmail('');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Could not add email address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Target Identity to Monitor">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs text-neutral-400">
          Enter an email address to add to your 24/7 dark web vigilance watch list.
        </p>

        <div>
          <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
            Target Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="target@company.com"
              className="w-full bg-[#080808] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] text-xs font-mono">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

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
                <span>Adding Identity...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Identity</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
