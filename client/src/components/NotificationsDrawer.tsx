import React, { useState } from 'react';
import { Bell, X, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: 'critical' | 'warning' | 'info';
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Credential Leak Discovered',
    desc: 'Password dump indexed on dark web forum matching monitored domain.',
    time: '10 mins ago',
    unread: true,
    type: 'critical'
  },
  {
    id: 'n2',
    title: 'Identity Scan Completed',
    desc: 'Background scanner completed telemetry check with 0 new exposures.',
    time: '2 hours ago',
    unread: true,
    type: 'info'
  },
  {
    id: 'n3',
    title: 'Target Identity Verified',
    desc: 'Email identity verification token successfully validated.',
    time: '1 day ago',
    unread: false,
    type: 'info'
  }
];

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel Shell */}
      <div className="relative w-full max-w-sm bg-[#141414] border-l border-white/[0.1] h-full shadow-2xl z-10 flex flex-col justify-between p-6 text-left animate-slideLeft">
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#FF6A2A]" />
              <h3 className="font-semibold text-white text-base">Security Alerts</h3>
              {unreadCount > 0 && (
                <span className="bg-[#FF3B30] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Row */}
          {unreadCount > 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={markAllRead}
                className="text-[11px] font-mono text-[#FF6A2A] hover:underline"
              >
                Mark all as read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.unread
                    ? 'bg-[#181818] border-[#FF6A2A]/40'
                    : 'bg-[#0D0D0D] border-white/[0.06] opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    {item.type === 'critical' ? (
                      <ShieldAlert className="w-3.5 h-3.5 text-[#FF3B30]" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35D07F]" />
                    )}
                    {item.title}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.06] text-center">
          <p className="text-[10px] font-mono text-neutral-500">
            Real-time security alert telemetry node
          </p>
        </div>

      </div>
    </div>
  );
};
