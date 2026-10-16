import React, { useState } from 'react';

export default function RecordingsView({
  notes,
  onSelectNote,
  onToggleBookmark,
  onStartRecording,
  activePlayingNoteId,
  onTogglePlayNote
}) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const courses = ['All', 'GST111', 'EDU 102', 'BIO 204'];

  const filtered = notes.filter((n) => {
    const matchesFilter = filter === 'All' || n.courseCode.includes(filter);
    const matchesSearch =
      !search.trim() ||
      n.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      n.aiSummary.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-margin-mobile pt-space-md pb-28 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-medium">
            All Recordings
          </h2>
          <p className="text-xs text-on-surface-variant">
            {notes.length} lectures captured • 18.4 hrs quota left
          </p>
        </div>

        <button
          onClick={onStartRecording}
          className="px-3.5 py-2 rounded-xl bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-on-surface-variant">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recordings by title, notes, or terms..."
          className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest dark:bg-[#16161f] border border-outline-variant/30 dark:border-white/10 rounded-xl text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#ff4d6d]"
        />
      </div>

      {/* Course Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {courses.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              filter === c
                ? 'bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11]'
                : 'bg-surface-container dark:bg-[#1c1c24] text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3 pt-1">
        {filtered.map((note) => {
          const isPlaying = activePlayingNoteId === note.id;

          return (
            <div
              key={note.id}
              className="bg-surface-container-lowest dark:bg-[#16161f] rounded-xl p-3.5 shadow-sm border border-outline-variant/20 dark:border-white/10 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                  onClick={() => onSelectNote(note)}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-container/10 dark:bg-rose-950/60 text-primary dark:text-[#ff4d6d] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">
                      {note.icon || 'mic'}
                    </span>
                  </div>
                  <div className="truncate">
                    <h4 className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                      {note.courseCode}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant">
                      {note.dateLabel} • {note.duration}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onToggleBookmark(note.id)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      note.isBookmarked ? 'text-primary dark:text-[#ff4d6d]' : ''
                    }`}
                    style={{ fontVariationSettings: note.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {note.isBookmarked ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>

              <p
                className="text-xs text-on-surface-variant line-clamp-2 cursor-pointer"
                onClick={() => onSelectNote(note)}
              >
                {note.aiSummary}
              </p>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => onTogglePlayNote(note.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-xs font-bold text-primary dark:text-[#ff4d6d]"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                  <span>{isPlaying ? 'Playing' : 'Listen'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectNote(note)}
                  className="text-xs font-semibold text-secondary dark:text-rose-400 hover:underline flex items-center gap-0.5"
                >
                  <span>View Notes</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
