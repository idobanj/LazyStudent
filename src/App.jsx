import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeDashboard from './components/HomeDashboard';
import ActiveRecording from './components/ActiveRecording';
import RecordingsView from './components/RecordingsView';
import ReviewView from './components/ReviewView';
import SettingsModal from './components/SettingsModal';
import NoteDetailModal from './components/NoteDetailModal';
import FlashcardsModal from './components/FlashcardsModal';
import SearchModal from './components/SearchModal';
import NotificationsModal from './components/NotificationsModal';
import ScheduleModal from './components/ScheduleModal';
import BottomNav from './components/BottomNav';
import { INITIAL_COURSES, INITIAL_NOTES, INITIAL_FLASHCARDS } from './data/mockData';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('lecturejot_theme') === 'dark';
  });

  const [isDimHall, setIsDimHall] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [courses] = useState(INITIAL_COURSES);
  const [selectedCourse, setSelectedCourse] = useState(INITIAL_COURSES[0]);
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [flashcards] = useState(INITIAL_FLASHCARDS);

  // Active Live Recording Mode
  const [isRecordingActive, setIsRecordingActive] = useState(false);

  // Audio Playback in Dashboard / List
  const [activePlayingNoteId, setActivePlayingNoteId] = useState(null);

  // Modals
  const [inspectingNote, setInspectingNote] = useState(null);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Theme synchronization with DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lecturejot_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lecturejot_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleDimHall = () => {
    setIsDimHall((prev) => !prev);
  };

  const handleStartRecording = (courseToRecord) => {
    if (courseToRecord) setSelectedCourse(courseToRecord);
    setIsRecordingActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStopAndSaveRecording = (newNote) => {
    setNotes([newNote, ...notes]);
    setIsRecordingActive(false);
    setActiveTab('home');
  };

  const handleToggleBookmark = (noteId) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, isBookmarked: !note.isBookmarked } : note
      )
    );
    if (inspectingNote && inspectingNote.id === noteId) {
      setInspectingNote((prev) => ({ ...prev, isBookmarked: !prev.isBookmarked }));
    }
  };

  const handleTogglePlayNote = (noteId) => {
    setActivePlayingNoteId((prev) => (prev === noteId ? null : noteId));
  };

  return (
    <div
      className={`min-h-screen bg-surface dark:bg-[#0e0e11] font-body-md text-on-surface antialiased flex flex-col transition-colors duration-200 ${
        isDimHall ? 'brightness-90 contrast-105' : ''
      }`}
    >
      {/* Fixed Global Header */}
      <Header
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        activeTab={activeTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        isRecordingActive={isRecordingActive}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface dark:bg-[#0e0e11]">
        {isRecordingActive ? (
          <ActiveRecording
            course={selectedCourse}
            onStopAndSave={handleStopAndSaveRecording}
            onCancel={() => setIsRecordingActive(false)}
            isDimHall={isDimHall}
            onToggleDimHall={handleToggleDimHall}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeDashboard
                courses={courses}
                selectedCourse={selectedCourse}
                onSelectCourse={setSelectedCourse}
                notes={notes}
                onStartRecording={handleStartRecording}
                onSelectNote={setInspectingNote}
                onToggleBookmark={handleToggleBookmark}
                onOpenFlashcards={() => setIsFlashcardsOpen(true)}
                onOpenScheduleModal={() => setIsScheduleOpen(true)}
                activePlayingNoteId={activePlayingNoteId}
                onTogglePlayNote={handleTogglePlayNote}
              />
            )}

            {activeTab === 'recordings' && (
              <RecordingsView
                notes={notes}
                onSelectNote={setInspectingNote}
                onToggleBookmark={handleToggleBookmark}
                onStartRecording={() => handleStartRecording(selectedCourse)}
                activePlayingNoteId={activePlayingNoteId}
                onTogglePlayNote={handleTogglePlayNote}
              />
            )}

            {activeTab === 'review' && (
              <ReviewView
                notes={notes}
                onSelectNote={setInspectingNote}
                onOpenFlashcards={() => setIsFlashcardsOpen(true)}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsModal
                isDark={isDark}
                onToggleTheme={handleToggleTheme}
                isDimHall={isDimHall}
                onToggleDimHall={handleToggleDimHall}
              />
            )}
          </>
        )}
      </main>

      {/* Docked Navigation Bar (hidden during active recording so dock controls take priority) */}
      {!isRecordingActive && (
        <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
      )}

      {/* Modals & Dialogs */}
      {inspectingNote && (
        <NoteDetailModal
          note={inspectingNote}
          onClose={() => setInspectingNote(null)}
          onToggleBookmark={handleToggleBookmark}
          isPlaying={activePlayingNoteId === inspectingNote.id}
          onTogglePlay={() => handleTogglePlayNote(inspectingNote.id)}
        />
      )}

      {isFlashcardsOpen && (
        <FlashcardsModal
          flashcards={flashcards}
          onClose={() => setIsFlashcardsOpen(false)}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          notes={notes}
          onClose={() => setIsSearchOpen(false)}
          onSelectNote={setInspectingNote}
        />
      )}

      {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )}

      {isScheduleOpen && (
        <ScheduleModal
          courses={courses}
          onSelectCourse={setSelectedCourse}
          onStartRecording={handleStartRecording}
          onClose={() => setIsScheduleOpen(false)}
        />
      )}

      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-surface-container-lowest dark:bg-[#16161f] rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-white/10 p-5">
            <SettingsModal
              isDark={isDark}
              onToggleTheme={handleToggleTheme}
              isDimHall={isDimHall}
              onToggleDimHall={handleToggleDimHall}
              onClose={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
