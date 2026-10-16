import React from 'react';

export default function ReviewView({ onOpenFlashcards, onSelectNote, notes }) {
  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-margin-mobile pt-space-md pb-28 space-y-4">
      <div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-medium">
          Exam Prep &amp; Review
        </h2>
        <p className="text-xs text-on-surface-variant">
          Synthesized AI study decks, flashcards &amp; key term reviews
        </p>
      </div>

      {/* Main Flashcard Card Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary text-white shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold">
            Spaced Repetition
          </span>
          <span className="text-xs font-mono font-bold">28 Cards Due</span>
        </div>

        <div>
          <h3 className="font-title-md text-title-md font-bold">Daily Review Queue</h3>
          <p className="text-xs text-white/80 mt-1">
            Covers GST111 deductive fallacies, EDU 102 Dewey constructs, and BIO 204 bioenergetics.
          </p>
        </div>

        <button
          onClick={onOpenFlashcards}
          className="w-full py-2.5 rounded-xl bg-white text-primary dark:text-[#ff4d6d] font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">play_circle</span>
          <span>Start 10-Minute Drill</span>
        </button>
      </div>

      {/* Course Review Queues */}
      <div className="space-y-3 pt-2">
        <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
          High-Yield Decks by Course
        </h3>

        {notes.map((note) => (
          <div
            key={note.id}
            className="p-3.5 rounded-xl bg-surface-container-lowest dark:bg-[#16161f] border border-outline-variant/20 dark:border-white/10 flex items-center justify-between gap-2 shadow-sm"
          >
            <div className="min-w-0 flex-1">
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                {note.courseCode}
              </h4>
              <p className="text-xs text-on-surface-variant">
                {note.tags.join(' • ')}
              </p>
            </div>

            <button
              onClick={() => onSelectNote(note)}
              className="px-3 py-1.5 rounded-lg bg-surface-container dark:bg-white/10 hover:bg-surface-container-high text-xs font-bold text-primary dark:text-[#ff4d6d] transition-colors"
            >
              Study Note
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
