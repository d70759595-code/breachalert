import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-all animate-fadeIn ${
              toast.type === 'success'
                ? 'bg-[#0D1F17]/95 border-[#35D07F]/40 text-[#35D07F]'
                : toast.type === 'error'
                ? 'bg-[#210D0F]/95 border-[#FF3B30]/40 text-[#FF3B30]'
                : toast.type === 'warning'
                ? 'bg-[#241A0B]/95 border-[#FFB020]/40 text-[#FFB020]'
                : 'bg-[#141414]/95 border-white/20 text-white'
            }`}
          >
            <div className="flex items-center gap-2.5 text-xs font-medium">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-[#35D07F]" />}
              {toast.type === 'error' && <XCircle className="w-4 h-4 shrink-0 text-[#FF3B30]" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 shrink-0 text-[#FFB020]" />}
              {toast.type === 'info' && <Info className="w-4 h-4 shrink-0 text-[#FF6A2A]" />}
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white p-0.5 rounded-lg transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
