import React from 'react';
import { Modal } from './Modal';
import { LogOut, AlertTriangle } from 'lucide-react';
import { useToast } from './Toast';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const { showToast } = useToast();

  const handleLogoutConfirm = () => {
    showToast('You have been signed out.', 'info');
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign Out Confirmation">
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30]">
          <AlertTriangle className="w-6 h-6 shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider">Sign Out of BreachAlert?</h4>
            <p className="text-xs text-neutral-300 mt-0.5">Are you sure you want to sign out of your security operator console session?</p>
          </div>
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
            onClick={handleLogoutConfirm}
            className="px-6 py-2.5 rounded-full bg-[#FF3B30] hover:bg-red-600 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(255,59,48,0.4)] flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
