import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function FlashcardsModal({ flashcards, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const card = flashcards[currentIndex];

  const handleNext = (mastered) => {
    if (mastered) {
      setMasteredCount((prev) => prev + 1);
    }

    if (currentIndex + 1 < flashcards.length) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // safe
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest dark:bg-[#16161f] rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-white/10 overflow-hidden flex flex-col p-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary dark:text-[#ff4d6d]">
              quiz
            </span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
              Flashcard Review
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isCompleted ? (
          <div className="py-8 text-center flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed/50 dark:bg-rose-950/60 text-secondary dark:text-[#ff4d6d] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[36px]">emoji_events</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Session Completed!
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                You mastered {masteredCount} out of {flashcards.length} cards today.
              </p>
            </div>
            <div className="flex gap-3 pt-2 w-full">
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl bg-surface-container dark:bg-white/10 text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors"
              >
                Study Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] font-semibold text-sm shadow-md"
              >
                Back to Notes
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4 flex flex-col">
            {/* Progress Bar & Indicators */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-on-surface-variant font-medium">
                <span>
                  Card {currentIndex + 1} of {flashcards.length}
                </span>
                <span>{card?.course} • {card?.tag}</span>
              </div>
              <div className="w-full bg-surface-container-highest dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary dark:bg-[#ff4d6d] h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Interactive Flip Card */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[220px] p-6 rounded-2xl bg-surface-container-low dark:bg-[#1c1c26] border border-outline-variant/30 dark:border-white/10 flex flex-col justify-between cursor-pointer hover:border-secondary/40 transition-all select-none shadow-sm active:scale-[0.99]"
            >
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-secondary dark:text-rose-400">
                <span>{isFlipped ? 'Answer & Explanation' : 'Question Prompt'}</span>
                <span className="material-symbols-outlined text-[18px]">sync</span>
              </div>

              <div className="my-auto py-2">
                <p className="font-title-md text-title-md text-on-surface font-medium leading-snug whitespace-pre-line text-center">
                  {isFlipped ? card.answer : card.question}
                </p>
              </div>

              <p className="text-center text-xs text-on-surface-variant italic">
                Tap anywhere on card to flip
              </p>
            </div>

            {/* Response Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleNext(false)}
                className="py-3 px-4 rounded-xl border border-outline-variant/30 dark:border-white/10 text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/5 font-semibold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-amber-500">
                  replay
                </span>
                <span>Review Later</span>
              </button>

              <button
                type="button"
                onClick={() => handleNext(true)}
                className="py-3 px-4 rounded-xl bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] font-semibold text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all hover:bg-primary-container"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Got It Right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
