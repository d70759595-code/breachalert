import React, { useState } from 'react';
import { Modal } from './Modal';
import { Zap, Check, RefreshCw } from 'lucide-react';
import { useToast } from './Toast';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose
}) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleUpgradeConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Upgrade request submitted! Checkout access enabled.', 'success');
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to Family Plan Protection">
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181818] to-[#121212] border-2 border-[#FF6A2A] relative text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-mono text-[10px] bg-[#FF6A2A] text-black font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                RECOMMENDED
              </span>
              <h4 className="text-xl font-bold text-white mt-2">Family Plan Protection</h4>
            </div>
            <div className="text-right font-mono">
              <span className="text-3xl font-bold text-white">$10</span>
              <span className="text-xs text-neutral-500"> /mo</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-neutral-300 mb-2">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF6A2A]" /> Up to 5 Monitored Email Identities
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF6A2A]" /> Continuous 24/7 Dark Web Scans
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF6A2A]" /> Zero-Day Telegram & Forum Dump Recon
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF6A2A]" /> Instant Priority SMS & Email Alerts
            </li>
          </ul>
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
            type="button"
            disabled={loading}
            onClick={handleUpgradeConfirm}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6A2A] to-[#FF8243] hover:from-[#FF783A] hover:to-[#FF9055] text-black font-bold text-xs transition-all shadow-[0_0_20px_rgba(255,106,42,0.4)] flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-black" />
                <span>Confirm Upgrade</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
