import React, { useState } from 'react';

export default function HomeDashboard({
  courses,
  selectedCourse,
  onSelectCourse,
  notes,
  onStartRecording,
  onSelectNote,
  onToggleBookmark,
  onOpenFlashcards,
  onOpenScheduleModal,
  activePlayingNoteId,
  onTogglePlayNote
}) {
  const [activeFilter, setActiveFilter] = useState('All Notes');
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);

  // Filter notes based on active chip
  const filteredNotes = notes.filter((note) => {
    if (activeFilter === 'All Notes') return true;
    if (activeFilter === 'Bookmarks') return note.isBookmarked;
    if (activeFilter === 'Today') return note.dateFilter === 'Today';
    return (
      note.courseId.toLowerCase().includes(activeFilter.toLowerCase()) ||
      note.courseCode.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      {/* Top Greeting & Context Bar */}
      <section className="px-margin-mobile pt-space-md pb-space-sm flex flex-col gap-space-xs">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high dark:bg-[#1f1f26] text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] text-secondary dark:text-primary">
                calendar_today
              </span>
              <span>Monday, Oct 28</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed/40 dark:bg-rose-950/40 text-on-secondary-fixed-variant dark:text-rose-300 font-label-sm text-label-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-primary"></span>
              <span>18.4 hrs quota</span>
            </span>
          </div>

          <button
            aria-label="Quick calendar view"
            onClick={onOpenScheduleModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/[0.08] transition-colors"
            type="button"
            title="View Lecture Schedule"
          >
            <span className="material-symbols-outlined text-[18px]">event_note</span>
          </button>
        </div>

        <div className="mt-1">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-medium">
            Good morning, Ola
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Ready for today's lectures?{' '}
            <span className="text-primary dark:text-[#ff4d6d] font-semibold">3 classes scheduled.</span>
          </p>
        </div>
      </section>

      {/* Hero Record Action Card */}
      <section className="px-margin-mobile py-space-sm">
        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-primary via-primary-container to-tertiary dark:from-[#2a0e16] dark:via-[#42101e] dark:to-[#1a080d] p-space-md text-white shadow-[0_16px_36px_-8px_rgba(92,21,36,0.38)] dark:shadow-[0_16px_40px_-8px_rgba(255,77,109,0.2)] border border-white/10">
          {/* Ambient Decorative Backdrop Graphic */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-secondary-container/20 dark:bg-rose-500/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-6 -bottom-6 w-36 h-36 rounded-full bg-tertiary-container/30 dark:bg-rose-800/20 blur-xl pointer-events-none"></div>

          {/* Top Tag Controls */}
          <div className="relative z-20 flex items-center justify-between gap-2 mb-space-md">
            {/* Course Selector Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 dark:bg-white/10 hover:bg-white/25 backdrop-blur-md text-white font-label-sm text-label-sm shadow-sm transition-all active:scale-95 border border-white/10"
              >
                <span className="material-symbols-outlined text-[15px] text-secondary-fixed-dim dark:text-rose-300">
                  school
                </span>
                <span className="font-medium max-w-[170px] truncate">
                  {selectedCourse ? `${selectedCourse.code} — ${selectedCourse.name}` : 'Select Course'}
                </span>
                <span className="material-symbols-outlined text-[14px] opacity-75">
                  {isCourseDropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Course Selection Dropdown Menu */}
              {isCourseDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-64 bg-surface-container-lowest dark:bg-[#1a1a24] text-on-surface rounded-xl shadow-xl border border-outline-variant/30 dark:border-white/10 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                    Select Lecture Course
                  </div>
                  {courses.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        onSelectCourse(c);
                        setIsCourseDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-sm transition-colors hover:bg-surface-container dark:hover:bg-white/5 ${
                        selectedCourse?.id === c.id
                          ? 'bg-secondary-fixed/30 dark:bg-rose-950/40 text-primary dark:text-[#ff4d6d] font-semibold'
                          : 'text-on-surface'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="font-medium">{c.code}</div>
                        <div className="text-xs text-on-surface-variant truncate">{c.name} • {c.venue}</div>
                      </div>
                      {selectedCourse?.id === c.id && (
                        <span className="material-symbols-outlined text-[18px] text-primary dark:text-[#ff4d6d]">
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 dark:bg-white/10 backdrop-blur-md text-white font-label-sm text-label-sm border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim dark:bg-rose-400 animate-pulse"></span>
              <span className="font-medium">Live AI</span>
            </div>
          </div>

          {/* Center Big Record Interaction */}
          <div className="relative z-10 flex flex-col items-center text-center py-2">
            <div className="relative flex items-center justify-center my-3">
              {/* Animated Ring Echoes */}
              <div className="absolute w-24 h-24 rounded-full bg-secondary-container/25 dark:bg-rose-500/20 animate-ping opacity-75"></div>
              <div className="absolute w-20 h-20 rounded-full bg-primary-fixed-dim/20 dark:bg-rose-400/20 scale-110"></div>

              {/* Tactile Record Button */}
              <button
                aria-label="Start Lecture Recording"
                onClick={() => onStartRecording(selectedCourse)}
                className="relative z-20 w-16 h-16 rounded-full bg-white text-primary dark:text-[#ff4d6d] shadow-[0_6px_24px_rgba(0,0,0,0.35)] flex items-center justify-center active:scale-95 hover:scale-105 transition-all duration-200 group"
                type="button"
                id="record-hero-btn"
              >
                <span
                  className="material-symbols-outlined text-[34px] group-hover:scale-110 transition-transform"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  mic
                </span>
              </button>
            </div>

            <h3 className="font-title-md text-title-md text-white font-semibold mt-2">
              Start Lecture Recording
            </h3>
            <p className="font-body-sm text-body-sm text-white/80 max-w-xs mt-1">
              Real-time speech-to-text, concept map extraction, and smart key terms.
            </p>
          </div>

          {/* Live Features Badge Footer inside card */}
          <div className="relative z-10 mt-space-md pt-3 flex items-center justify-between text-white/90 font-label-sm text-label-sm border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed-dim dark:text-rose-300">
                graphic_eq
              </span>
              <span>Noise filter active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary-fixed-dim dark:text-rose-300">
                bolt
              </span>
              <span>Auto-summary: Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Academic Stats Row */}
      <section className="px-margin-mobile py-space-sm">
        <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest dark:bg-[#16161f] p-3 rounded-xl shadow-[0_2px_8px_-2px_rgba(92,21,36,0.05)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)] border border-outline-variant/20 dark:border-white/[0.06]">
          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-surface-container-low/70 dark:bg-[#1c1c24]">
            <span className="font-headline-sm text-headline-sm text-primary dark:text-[#ff4d6d] font-bold">
              {notes.length + 39}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 leading-tight">
              Lectures Jot
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-surface-container-low/70 dark:bg-[#1c1c24]">
            <span className="font-headline-sm text-headline-sm text-secondary dark:text-rose-400 font-bold">
              184
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 leading-tight">
              Flashcards
            </span>
          </div>

          <div className="flex flex-col items-center text-center p-2 rounded-lg bg-surface-container-low/70 dark:bg-[#1c1c24]">
            <span className="font-headline-sm text-headline-sm text-primary-container dark:text-amber-400 font-bold">
              98%
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 leading-tight">
              Accuracy
            </span>
          </div>
        </div>
      </section>

      {/* Recent Notes Section */}
      <section className="px-margin-mobile pt-space-md pb-space-sm flex flex-col gap-3">
        {/* Header & Link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-title-md text-title-md text-on-surface font-semibold">
              Recent Notes
            </h3>
            <span className="w-5 h-5 rounded-full bg-secondary-fixed dark:bg-rose-900/60 text-on-secondary-fixed dark:text-rose-200 font-label-sm text-label-sm flex items-center justify-center font-bold">
              {filteredNotes.length}
            </span>
          </div>

          <button
            onClick={() => setActiveFilter('All Notes')}
            className="font-label-sm text-label-sm text-primary dark:text-[#ff4d6d] hover:underline font-semibold flex items-center gap-0.5"
            type="button"
          >
            <span>View All ({notes.length})</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Category Chips Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile no-scrollbar">
          {['All Notes', 'Today', 'GST111', 'EDU 102', 'BIO 204', 'Bookmarks'].map((filterName) => (
            <button
              key={filterName}
              onClick={() => setActiveFilter(filterName)}
              className={`shrink-0 px-3 py-1 rounded-full font-label-md text-label-md font-semibold transition-all ${
                activeFilter === filterName
                  ? 'bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] shadow-sm'
                  : 'bg-surface-container dark:bg-[#1c1c24] text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-[#252530]'
              }`}
              type="button"
            >
              {filterName}
            </button>
          ))}
        </div>

        {/* Note Cards List */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-8 bg-surface-container-lowest dark:bg-[#16161f] rounded-xl border border-dashed border-outline-variant/30 text-on-surface-variant">
            <span className="material-symbols-outlined text-[32px] text-outline mb-1">
              folder_off
            </span>
            <p className="font-body-sm text-body-sm">No notes match the selected filter.</p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isPlaying = activePlayingNoteId === note.id;

            return (
              <article
                key={note.id}
                className="bg-surface-container-lowest dark:bg-[#16161f] rounded-xl p-space-md shadow-[0_2px_12px_-2px_rgba(92,21,36,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-outline-variant/20 dark:border-white/[0.06] flex flex-col gap-3 transition-all hover:border-secondary/40"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                    onClick={() => onSelectNote(note)}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg ${note.iconBg || 'bg-primary-container/10'} ${
                        note.iconColor || 'text-primary-container'
                      } dark:bg-rose-950/50 dark:text-[#ff4d6d] flex items-center justify-center shrink-0`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {note.icon || 'menu_book'}
                      </span>
                    </div>

                    <div className="truncate">
                      <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight truncate">
                        {note.courseCode}
                      </h4>
                      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm mt-0.5 truncate">
                        <span className="text-secondary dark:text-rose-400 font-medium">
                          {note.dateLabel}
                        </span>
                        <span>•</span>
                        <span>{note.duration}</span>
                        <span>•</span>
                        <span>{note.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    aria-label="Bookmark note"
                    onClick={() => onToggleBookmark(note.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/10 transition-colors"
                    type="button"
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

                {/* AI Summary Content Snippet */}
                <div
                  className="bg-surface-container-low/60 dark:bg-[#1b1b22] rounded-lg p-2.5 cursor-pointer hover:bg-surface-container-low transition-colors"
                  onClick={() => onSelectNote(note)}
                >
                  <div className="flex items-center gap-1 text-secondary dark:text-rose-400 mb-1">
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                      AI Summary
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    {note.aiSummary}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${
                        idx === 0
                          ? 'bg-secondary-fixed/50 dark:bg-rose-950/60 text-on-secondary-fixed-variant dark:text-rose-300'
                          : 'bg-surface-container dark:bg-[#20202a] text-on-surface-variant'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Audio Scrubber / Mini Waveform Bar */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    aria-label="Play audio lecture"
                    onClick={() => onTogglePlayNote(note.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm active:scale-90 transition-transform ${
                      isPlaying
                        ? 'bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] animate-pulse'
                        : 'bg-surface-container-high dark:bg-[#252530] text-primary dark:text-[#ff4d6d] hover:bg-primary hover:text-white dark:hover:bg-[#ff4d6d] dark:hover:text-[#0e0e11]'
                    }`}
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  <div className="flex-1 flex flex-col gap-1">
                    {/* Simulated Waveform / Progress bar */}
                    <div className="flex items-center gap-0.5 h-4 w-full">
                      {[
                        8, 12, 16, 10, 14, 8, 6, 12, 16, 8, 12, 6, 8, 14, 8, 4, 10
                      ].map((height, i) => {
                        const isBarActive = i < (note.audioProgressPercent / 100) * 17;
                        return (
                          <span
                            key={i}
                            className={`flex-1 rounded-full transition-all duration-300 ${
                              isBarActive
                                ? 'bg-primary dark:bg-[#ff4d6d]'
                                : 'bg-outline-variant/40 dark:bg-white/10'
                            } ${isPlaying && isBarActive ? 'animate-pulse' : ''}`}
                            style={{
                              height: `${height}px`,
                              animationDelay: `${i * 50}ms`
                            }}
                          ></span>
                        );
                      })}
                    </div>

                    <div className="flex justify-between text-on-surface-variant font-label-sm text-label-sm">
                      <span>{note.progressFormatted}</span>
                      <span>{note.totalFormatted}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Flashcard Quick Review Banner */}
      <section className="px-margin-mobile pt-space-xs pb-space-lg">
        <div className="bg-gradient-to-r from-secondary-fixed/40 via-surface-container-high to-surface-container dark:from-[#2a131a] dark:via-[#1e1c24] dark:to-[#16161f] p-space-md rounded-xl flex items-center justify-between gap-3 shadow-sm border border-outline-variant/20 dark:border-white/[0.06]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">quiz</span>
            </div>
            <div className="min-w-0">
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold truncate leading-tight">
                Exam Prep: 28 Cards Due
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                GST111 &amp; EDU 102 review queues
              </p>
            </div>
          </div>

          <button
            onClick={onOpenFlashcards}
            className="shrink-0 px-3.5 py-2 rounded-lg bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] font-label-md text-label-md font-bold hover:bg-primary-container active:scale-95 transition-all shadow-sm"
            type="button"
          >
            Practice
          </button>
        </div>
      </section>
    </div>
  );
}
