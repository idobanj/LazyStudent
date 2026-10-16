import React, { useState, useEffect } from 'react';

export default function NoteDetailModal({
  note,
  onClose,
  onToggleBookmark,
  isPlaying,
  onTogglePlay
}) {
  const [activeTab, setActiveTab] = useState('summary');
  const [audioProgress, setAudioProgress] = useState(note?.progressSeconds || 0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= (note?.durationSeconds || 3000)) return 0;
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, note]);

  if (!note) return null;

  const formatSeconds = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleCopyMarkdown = () => {
    const md = `# ${note.courseCode}\n**Date:** ${note.dateLabel} | **Venue:** ${note.venue} | **Duration:** ${note.duration}\n\n## AI Summary\n${note.aiSummary}\n\n## Key Takeaways\n${note.keyPoints.map((k) => `- ${k}`).join('\n')}\n\n## Transcript\n${note.transcription.map((t) => `**[${t.time}] ${t.speaker}:** ${t.text}`).join('\n\n')}`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-surface-container-lowest dark:bg-[#16161f] rounded-t-[28px] sm:rounded-2xl max-h-[92vh] flex flex-col shadow-2xl border border-outline-variant/30 dark:border-white/10 overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
        {/* Header Bar */}
        <div className="p-4 border-b border-outline-variant/20 dark:border-white/10 flex items-center justify-between shrink-0 bg-surface/50 dark:bg-[#131318]/50">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary-container/10 dark:bg-rose-950/60 text-primary dark:text-[#ff4d6d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">{note.icon || 'menu_book'}</span>
            </div>
            <div className="truncate">
              <h3 className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                {note.courseCode}
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {note.dateLabel} • {note.venue}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleBookmark(note.id)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/10 transition-colors"
              title="Bookmark Note"
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  note.isBookmarked ? 'text-primary dark:text-[#ff4d6d]' : ''
                }`}
                style={{ fontVariationSettings: note.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                {note.isBookmarked ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Floating Audio Player Widget inside modal */}
        <div className="bg-surface-container-low dark:bg-[#1c1c24] p-3.5 border-b border-outline-variant/20 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <div className="flex-1 flex flex-col gap-1.5">
              <input
                type="range"
                min="0"
                max={note.durationSeconds || 3000}
                value={audioProgress}
                onChange={(e) => setAudioProgress(Number(e.target.value))}
                className="w-full accent-primary dark:accent-[#ff4d6d] h-1.5 bg-surface-container-highest dark:bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                <span>{formatSeconds(audioProgress)}</span>
                <span>{note.totalFormatted || note.duration}</span>
              </div>
            </div>

            {/* Speed Switcher */}
            <button
              type="button"
              onClick={() => {
                const speeds = [1, 1.25, 1.5, 2];
                const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                setPlaybackSpeed(speeds[nextIdx]);
              }}
              className="px-2 py-1 rounded bg-surface-container dark:bg-white/10 text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors"
            >
              {playbackSpeed}x
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex border-b border-outline-variant/20 dark:border-white/10 px-4 bg-surface/30 dark:bg-black/20 shrink-0">
          {[
            { id: 'summary', label: 'AI Summary' },
            { id: 'transcript', label: 'Transcript' },
            { id: 'takeaways', label: 'Key Takeaways' },
            { id: 'deadlines', label: 'Deadlines' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary dark:border-[#ff4d6d] text-primary dark:text-[#ff4d6d]'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-surface-container-low dark:bg-[#1b1b22] border border-outline-variant/20 dark:border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-secondary dark:text-rose-400 font-bold text-xs uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                  <span>Synthesized Overview</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {note.aiSummary}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                  Topic Badges
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-secondary-fixed/50 dark:bg-rose-950/60 text-on-secondary-fixed-variant dark:text-rose-300 font-label-sm text-label-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="space-y-3">
              {note.transcription.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-surface-container-low/70 dark:bg-[#1c1c24] space-y-1 hover:border hover:border-secondary/30 transition-all cursor-pointer"
                  onClick={() => {
                    const parts = item.time.split(':');
                    const secs = Number(parts[0]) * 60 + Number(parts[1]);
                    setAudioProgress(secs);
                  }}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-secondary dark:text-rose-400">{item.speaker}</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container dark:bg-white/10 text-on-surface-variant font-mono">
                      {item.time}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">{item.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'takeaways' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Core Conceptual Tenets
              </h4>
              <ul className="space-y-2.5">
                {note.keyPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low dark:bg-[#1b1b22] text-sm text-on-surface"
                  >
                    <span className="material-symbols-outlined text-primary dark:text-[#ff4d6d] text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'deadlines' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Extracted Action Items
              </h4>
              {note.deadlines.map((d, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-surface-container-low dark:bg-[#1b1b22] border border-outline-variant/20 dark:border-white/5 flex items-start justify-between gap-2"
                >
                  <div className="space-y-1">
                    <h5 className="font-title-sm text-title-sm text-on-surface font-bold">
                      {d.title}
                    </h5>
                    <p className="text-xs text-on-surface-variant">
                      {d.date} • {d.venue}
                    </p>
                  </div>
                  {d.urgent && (
                    <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container text-xs font-bold shrink-0">
                      Urgent
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-outline-variant/20 dark:border-white/10 flex items-center justify-between gap-2 bg-surface/50 dark:bg-[#131318]/50 shrink-0">
          <button
            onClick={handleCopyMarkdown}
            className="flex-1 py-2.5 px-3 rounded-xl bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-on-surface font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={() => {
              alert(`Lecture summary for ${note.courseCode} exported to PDF.`);
            }}
            className="py-2.5 px-4 rounded-xl bg-primary dark:bg-[#ff4d6d] hover:bg-primary-container text-white dark:text-[#0e0e11] font-semibold text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            <span>PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
