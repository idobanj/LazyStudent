import React from 'react';

export default function NotificationsModal({ onClose }) {
  const notifications = [
    {
      id: 1,
      title: 'Midterm Submission Reminder',
      description: 'GST111 paper due Nov 14th by 11:59 PM on Canvas.',
      time: '10 mins ago',
      icon: 'priority_high',
      iconBg: 'bg-primary-container text-white'
    },
    {
      id: 2,
      title: 'Cloud Sync Completed',
      description: 'Audio & notes for BIO 204 successfully backed up to cloud vault.',
      time: '2 hours ago',
      icon: 'cloud_done',
      iconBg: 'bg-secondary-fixed text-primary'
    },
    {
      id: 3,
      title: 'Audio Storage Quota',
      description: '18.4 hours of high-fidelity recording remaining for Term II.',
      time: 'Yesterday',
      icon: 'mic',
      iconBg: 'bg-surface-container-high text-on-surface'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-surface-container-lowest dark:bg-[#16161f] rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-white/10 p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary dark:text-[#ff4d6d]">
              notifications
            </span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 rounded-xl bg-surface-container-low dark:bg-[#1c1c24] flex items-start gap-3"
            >
              <div
                className={`w-8 h-8 rounded-lg ${n.iconBg} flex items-center justify-center shrink-0 mt-0.5 text-sm`}
              >
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-label-sm text-label-sm text-on-surface font-bold truncate">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-on-surface-variant shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-snug">
                  {n.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}
