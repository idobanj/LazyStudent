import React from 'react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'cottage' },
    { id: 'recordings', label: 'Recordings', icon: 'mic' },
    { id: 'review', label: 'Review', icon: 'auto_awesome' },
    { id: 'settings', label: 'Settings', icon: 'tune' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 dark:bg-[#131318]/95 backdrop-blur-xl border-t border-outline-variant/20 dark:border-white/[0.06] shadow-[0_-4px_20px_rgba(92,21,36,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)] transition-colors duration-200">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-space-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] h-12 transition-all group ${
                isActive
                  ? 'text-primary dark:text-[#ff4d6d] font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <div
                className={`w-10 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-secondary-fixed/50 dark:bg-rose-950/50'
                    : 'group-hover:bg-surface-container-high dark:group-hover:bg-white/5'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
              </div>
              <span className="font-label-md text-label-md">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
