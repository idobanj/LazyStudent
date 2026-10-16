import React, { useState } from 'react';

export default function SearchModal({ notes, onClose, onSelectNote }) {
  const [query, setQuery] = useState('');

  const searchResults = notes.filter((n) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      n.courseCode.toLowerCase().includes(q) ||
      n.aiSummary.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q)) ||
      n.transcription.some((t) => t.text.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-surface-container-lowest dark:bg-[#16161f] rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-white/10 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-outline-variant/20 dark:border-white/10 flex items-center gap-2.5">
          <span className="material-symbols-outlined text-secondary dark:text-[#ff4d6d] text-[22px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lectures, summaries, concepts..."
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="w-6 h-6 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
          >
            Esc
          </button>
        </div>

        {/* Quick Tag Suggestion Chips */}
        <div className="px-3.5 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-outline-variant/10 dark:border-white/5 bg-surface/30">
          <span className="text-xs text-on-surface-variant font-medium shrink-0">Tags:</span>
          {['Definitions', 'Exam Review', 'High Yield', 'Dewey', 'GST111'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 rounded-full bg-surface-container dark:bg-white/10 text-xs text-on-surface-variant hover:bg-surface-container-high transition-colors shrink-0"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto p-3 space-y-2 no-scrollbar flex-1">
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant">
              <span className="material-symbols-outlined text-[28px] mb-1">search_off</span>
              <p className="text-xs">No lecture notes matched "{query}"</p>
            </div>
          ) : (
            searchResults.map((note) => (
              <div
                key={note.id}
                onClick={() => {
                  onSelectNote(note);
                  onClose();
                }}
                className="p-3 rounded-xl bg-surface-container-low dark:bg-[#1c1c24] hover:bg-surface-container dark:hover:bg-[#222230] cursor-pointer transition-colors space-y-1 border border-transparent hover:border-secondary/30"
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-primary dark:text-[#ff4d6d]">{note.courseCode}</span>
                  <span className="text-on-surface-variant font-normal">{note.dateLabel}</span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2">{note.aiSummary}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {note.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.2 rounded bg-surface-container dark:bg-white/5 text-[10px] text-on-surface-variant"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
