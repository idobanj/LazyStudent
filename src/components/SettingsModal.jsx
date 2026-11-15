import React, { useState } from 'react';

export default function SettingsModal({
  isDark,
  onToggleTheme,
  isDimHall,
  onToggleDimHall,
  onClose
}) {
  const [audioQuality, setAudioQuality] = useState('High (320 kbps)');
  const [noiseIsolation, setNoiseIsolation] = useState('Adaptive Hall Mic');
  const [autoCards, setAutoCards] = useState(true);
  const [cloudBackup, setCloudBackup] = useState(true);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-margin-mobile pt-space-md pb-28 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-medium">
            Settings &amp; Preferences
          </h2>
          <p className="text-xs text-on-surface-variant">
            Academic modernism profile &amp; audio calibration
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Student Profile Card */}
      <div className="p-4 rounded-xl bg-surface-container-lowest dark:bg-[#16161f] border border-outline-variant/20 dark:border-white/10 flex items-center gap-3 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold shadow-sm">
          OI
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-title-sm text-title-sm text-on-surface font-bold truncate">
            Olabanji Idowu
          </h4>
          <p className="text-xs text-on-surface-variant truncate">
            Computer Science • 300 Level • Term II
          </p>
          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-fixed/50 dark:bg-rose-950/60 text-on-secondary-fixed-variant dark:text-rose-300">
            LAZY STUDENT PRO
          </span>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">
          Appearance &amp; Auditorium Ergonomics
        </h3>

        <div className="rounded-xl bg-surface-container-lowest dark:bg-[#16161f] border border-outline-variant/20 dark:border-white/10 divide-y divide-outline-variant/10 dark:divide-white/5 shadow-sm">
          {/* Dark Mode */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h5 className="font-title-sm text-title-sm text-on-surface font-medium">
                Academic Obsidian Dark Mode
              </h5>
              <p className="text-xs text-on-surface-variant">
                Low-fatigue obsidian palette with ruby accents
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleTheme}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                isDark ? 'bg-primary dark:bg-[#ff4d6d]' : 'bg-surface-container-highest'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Dim Hall Mode */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h5 className="font-title-sm text-title-sm text-on-surface font-medium">
                Dim Auditorium Hall Filter
              </h5>
              <p className="text-xs text-on-surface-variant">
                Reduces glare for lecture halls and dark classrooms
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleDimHall}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                isDimHall ? 'bg-primary dark:bg-[#ff4d6d]' : 'bg-surface-container-highest'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  isDimHall ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Audio & AI Processing */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">
          Recording &amp; AI Intelligence
        </h3>

        <div className="rounded-xl bg-surface-container-lowest dark:bg-[#16161f] border border-outline-variant/20 dark:border-white/10 divide-y divide-outline-variant/10 dark:divide-white/5 shadow-sm">
          {/* Audio Quality */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h5 className="font-title-sm text-title-sm text-on-surface font-medium">
                Audio Capture Quality
              </h5>
              <p className="text-xs text-on-surface-variant">Enhanced speech clarity codec</p>
            </div>
            <select
              value={audioQuality}
              onChange={(e) => setAudioQuality(e.target.value)}
              className="bg-surface-container dark:bg-white/10 text-xs font-semibold text-on-surface rounded-lg px-2.5 py-1.5 border border-outline-variant/30 focus:outline-none"
            >
              <option value="High (320 kbps)">High (320 kbps)</option>
              <option value="Standard (128 kbps)">Standard (128 kbps)</option>
              <option value="Voice Optimized (64 kbps)">Voice Optimized (64 kbps)</option>
            </select>
          </div>

          {/* Noise Suppression */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h5 className="font-title-sm text-title-sm text-on-surface font-medium">
                Noise Suppression
              </h5>
              <p className="text-xs text-on-surface-variant">Filter auditorium echoes &amp; AC hum</p>
            </div>
            <select
              value={noiseIsolation}
              onChange={(e) => setNoiseIsolation(e.target.value)}
              className="bg-surface-container dark:bg-white/10 text-xs font-semibold text-on-surface rounded-lg px-2.5 py-1.5 border border-outline-variant/30 focus:outline-none"
            >
              <option value="Adaptive Hall Mic">Adaptive Hall Mic</option>
              <option value="Aggressive Isolation">Aggressive Isolation</option>
              <option value="Studio Crisp">Studio Crisp</option>
            </select>
          </div>

          {/* Auto Flashcard */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h5 className="font-title-sm text-title-sm text-on-surface font-medium">
                Auto-Generate Flashcards
              </h5>
              <p className="text-xs text-on-surface-variant">
                Generate study review decks immediately upon save
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAutoCards(!autoCards)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                autoCards ? 'bg-primary dark:bg-[#ff4d6d]' : 'bg-surface-container-highest'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  autoCards ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>

          {/* Cloud Vault Sync */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h5 className="font-title-sm text-title-sm text-on-surface font-medium">
                Automatic Cloud Sync
              </h5>
              <p className="text-xs text-on-surface-variant">
                Sync encrypted recordings to Academic Vault
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCloudBackup(!cloudBackup)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                cloudBackup ? 'bg-primary dark:bg-[#ff4d6d]' : 'bg-surface-container-highest'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  cloudBackup ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* App Version Info */}
      <div className="text-center pt-2 text-xs text-on-surface-variant">
        lazyStudent v2.4.0 • Academic Modernism Suite
      </div>
    </div>
  );
}
