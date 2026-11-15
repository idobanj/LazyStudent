import React from 'react';

export default function Header({
  isDark,
  onToggleTheme,
  activeTab,
  onOpenSearch,
  onOpenNotifications,
  unreadCount = 2,
  onOpenProfile,
  isRecordingActive,
  onOpenSettings
}) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 dark:bg-[#131318]/90 backdrop-blur-xl border-b border-outline-variant/20 dark:border-white/[0.06] pt-safe shadow-[0_1px_12px_rgba(92,21,36,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-colors duration-200">
      <div className="max-w-md mx-auto h-16 px-margin-mobile flex items-center justify-between gap-space-sm">
        {/* Brand & Context */}
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center shrink-0 shadow-sm text-white font-serif font-bold text-lg select-none">
            LS
          </div>

          <div className="flex flex-col truncate">
            <div className="flex items-center gap-1.5">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary dark:text-primary font-bold">
                LAZY STUDENT
              </span>
              <span className="w-1 h-1 rounded-full bg-secondary-container dark:bg-primary/60"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Term II
              </span>
            </div>
            <h1 className="font-title-sm text-title-sm text-on-surface truncate font-semibold leading-tight">
              {isRecordingActive ? 'Live Lecture Session' : 'Home Dashboard'}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Quick Theme Toggle */}
          <button
            aria-label="Toggle theme"
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container dark:hover:bg-white/[0.06] transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Search Button */}
          <button
            aria-label="Search notes"
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container dark:hover:bg-white/[0.06] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Notifications Button */}
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container dark:hover:bg-white/[0.06] relative transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary-container dark:bg-primary ring-2 ring-surface dark:ring-[#131318] shadow-sm"></span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            aria-label="Student Profile"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container dark:from-primary dark:to-[#9b1d36] flex items-center justify-center ml-1 shrink-0 shadow-sm ring-1 ring-white/10 active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}
