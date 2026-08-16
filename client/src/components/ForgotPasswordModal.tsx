import React, { useState } from 'react';
import { Modal } from './Modal';
import { Mail, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useToast } from './Toast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast(`Password reset link sent to ${email}`, 'success');
    }, 1200);
  };

  const handleClose = () => {
    setEmail('');
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Recover Account Passphrase">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-neutral-400">
            Enter your registered operator email to receive passphrase recovery instructions.
          </p>

          <div>
            <label className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5 block">
              Operative Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@breachalert.io"
                className="w-full bg-[#080808] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF6A2A]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleClose}
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
                  <span>Sending Reset Link...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#35D07F]/15 border border-[#35D07F]/30 flex items-center justify-center mx-auto text-[#35D07F]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-semibold text-white">Reset Link Dispatched</h4>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Password reset instructions have been sent to <span className="text-white font-mono">{email}</span>. Please check your spam or inbox folders.
          </p>

          <div className="pt-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full bg-[#FF6A2A] text-black font-bold text-xs hover:bg-[#FF783A] transition-colors"
            >
              Return to Sign In
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
