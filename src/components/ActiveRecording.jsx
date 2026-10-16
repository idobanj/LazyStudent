import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { LIVE_SPEECH_STREAM, LIVE_JOTS_STREAM } from '../data/mockData';

export default function ActiveRecording({
  course,
  onStopAndSave,
  onCancel,
  isDimHall,
  onToggleDimHall
}) {
  const [seconds, setSeconds] = useState(1319); // Starts at ~00:21:59 like design
  const [isPaused, setIsPaused] = useState(false);
  const [highlights, setHighlights] = useState(3);
  const [showHighlightBadge, setShowHighlightBadge] = useState(false);
  const [activeLang, setActiveLang] = useState('EN');
  const [customNote, setCustomNote] = useState('');
  const [userJots, setUserJots] = useState([]);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [speechIndex, setSpeechIndex] = useState(1);
  const [streamSentences, setStreamSentences] = useState(LIVE_SPEECH_STREAM.slice(0, 2));

  // Audio waveform animation simulation / Web Audio
  const [waveHeights, setWaveHeights] = useState([
    16, 32, 48, 28, 56, 40, 24, 48, 56, 20, 44, 32, 52, 24, 12
  ]);

  const streamScrollRef = useRef(null);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (!isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  // Audio wave frequency simulator
  useEffect(() => {
    let waveInterval = null;
    if (!isPaused) {
      waveInterval = setInterval(() => {
        setWaveHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 48) + 12)
        );
      }, 120);
    }
    return () => clearInterval(waveInterval);
  }, [isPaused]);

  // Speech stream progression simulator
  useEffect(() => {
    let speechInterval = null;
    if (!isPaused) {
      speechInterval = setInterval(() => {
        setSpeechIndex((prev) => {
          const nextIdx = (prev + 1) % LIVE_SPEECH_STREAM.length;
          setStreamSentences((curr) => {
            const nextList = [...curr, LIVE_SPEECH_STREAM[nextIdx]];
            if (nextList.length > 5) return nextList.slice(nextList.length - 5);
            return nextList;
          });
          return nextIdx;
        });
      }, 7000);
    }
    return () => clearInterval(speechInterval);
  }, [isPaused]);

  // Scroll to bottom of stream on update
  useEffect(() => {
    if (streamScrollRef.current) {
      streamScrollRef.current.scrollTop = streamScrollRef.current.scrollHeight;
    }
  }, [streamSentences]);

  // Formatted timer
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleAddHighlight = () => {
    setHighlights((prev) => prev + 1);
    setShowHighlightBadge(true);
    setTimeout(() => {
      setShowHighlightBadge(false);
    }, 1000);
  };

  const handleAddCustomJot = (e) => {
    e.preventDefault();
    if (!customNote.trim()) return;
    const newJot = {
      id: Date.now(),
      time: formatTime(seconds),
      text: customNote.trim()
    };
    setUserJots([newJot, ...userJots]);
    setCustomNote('');
  };

  const handleFinish = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // safe fallback
    }

    const durationMins = Math.ceil(seconds / 60);
    const newNote = {
      id: `note-${Date.now()}`,
      courseId: course?.id || 'GST111',
      courseCode: `${course?.code || 'GST111'} — ${course?.name || 'English & Logic'}`,
      dateLabel: 'Just now',
      dateFilter: 'Today',
      duration: `${durationMins} mins`,
      durationSeconds: seconds,
      venue: course?.venue || 'Hall B',
      icon: 'menu_book',
      iconBg: 'bg-primary-container/10',
      iconColor: 'text-primary-container',
      isBookmarked: highlights > 0,
      aiSummary: `Captured ${highlights} bookmarked highlights on deductive arguments, formal fallacy analysis, and syllogistic structures.`,
      tags: ['Live Recording', 'AI Synthesized', 'Exam Review'],
      progressSeconds: 0,
      progressFormatted: '00:00',
      totalFormatted: formatTime(seconds),
      audioProgressPercent: 0,
      transcription: streamSentences.map((s, idx) => ({
        time: `00:${String(idx * 20).padStart(2, '0')}`,
        speaker: course?.lecturer || 'Prof. Vance',
        text: s
      })),
      keyPoints: [
        'Universal quantification: The major premise must state a complete categorical rule.',
        'Structural validity: Validity assesses only structural cohesion.',
        'Soundness: Both validity and empirical truth are required.'
      ],
      deadlines: [
        { title: 'Midterm Paper Submission', date: 'Nov 14th by 11:59 PM', venue: 'Canvas Portal', urgent: true }
      ]
    };

    onStopAndSave(newNote);
  };

  // Language translation simulations
  const getTranslatedTitle = (title) => {
    if (activeLang === 'Hausa') {
      if (title.includes('Deductive')) return 'Bambancin Hujjoji (Deductive vs Inductive)';
      if (title.includes('Action')) return 'Abubuwan da za a Yi';
      return 'Babban Ka’idojin Lakca';
    }
    if (activeLang === 'French') {
      if (title.includes('Deductive')) return 'Inférences Déductives vs Inductives';
      if (title.includes('Action')) return 'Éléments d\'action identifiés';
      return 'Arguments Principaux du Cours';
    }
    if (activeLang === 'Spanish') {
      if (title.includes('Deductive')) return 'Inferencias Deductivas vs Inductivas';
      if (title.includes('Action')) return 'Puntos de Acción Identificados';
      return 'Argumentos Principales de la Clase';
    }
    if (activeLang === 'Yoruba') {
      if (title.includes('Deductive')) return 'Àyẹ̀wò Ọgbọ́n Èrò (Deductive vs Inductive)';
      if (title.includes('Action')) return 'Àwọn Ohun Tó Yẹ Kí A Ṣe';
      return 'Àwọn Kókó Pàtàkì Ẹ̀kọ́';
    }
    return title;
  };

  return (
    <div
      className={`flex flex-col w-full max-w-md mx-auto px-margin-mobile pb-28 pt-2 space-y-4 transition-all duration-300 ${
        isDimHall ? 'brightness-90 contrast-105' : ''
      }`}
    >
      {/* Lecture Status Header Pill & Meta */}
      <div className="flex flex-col bg-surface-container-lowest dark:bg-[#16161f] p-space-md rounded-xl shadow-[0_2px_12px_-2px_rgba(92,21,36,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] border border-outline-variant/20 dark:border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between gap-2">
          {/* Course Code Tag & Rec Status */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed dark:bg-[#2a131a] dark:border dark:border-[#ff4d6d]/30 text-on-secondary-fixed-variant dark:text-[#ffb2ba] font-label-md text-label-md font-bold tracking-tight shadow-sm">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-outline' : 'bg-primary dark:bg-[#ff4d6d] animate-ping'}`}></span>
              {isPaused ? 'PAUSED' : 'REC'}
            </span>
            <span
              className={`font-headline-sm text-headline-sm tracking-tight font-bold tabular-nums transition-colors ${
                isPaused ? 'text-on-surface-variant' : 'text-primary dark:text-[#ff4d6d]'
              }`}
            >
              {formatTime(seconds)}
            </span>
          </div>

          {/* Quick Dim / Dark Lecture Mode Toggle */}
          <button
            aria-label="Toggle Lecture Hall Dim Mode"
            onClick={onToggleDimHall}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
              isDimHall
                ? 'bg-primary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] font-semibold'
                : 'bg-surface-container dark:bg-[#20202a] text-on-surface-variant hover:bg-surface-container-high'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDimHall ? 'light_mode' : 'dark_mode'}
            </span>
            <span>{isDimHall ? 'Bright' : 'Dim Hall'}</span>
          </button>
        </div>

        {/* Course & Lecturer Context */}
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-label-sm text-label-sm text-secondary dark:text-rose-400 font-bold tracking-wider uppercase">
                {course?.code || 'GST111'}
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {course?.name || 'English & Logic'}
              </span>
            </div>
            <p className="font-title-sm text-title-sm text-on-surface font-semibold truncate mt-0.5">
              {course?.lecturer || 'Prof. Vance'} • {course?.venue || 'Lecture Hall B'}
            </p>
          </div>

          {/* Cloud Sync & Export Menu */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 px-2.5 py-1 bg-surface-container-low dark:bg-[#1f1f28] rounded-lg">
              <span className="material-symbols-outlined text-[16px] text-secondary dark:text-rose-400">
                wifi
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                Sync
              </span>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container dark:bg-[#222230] text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-primary dark:text-[#ff4d6d]">
                  file_download
                </span>
                <span>Export</span>
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                  arrow_drop_down
                </span>
              </button>

              {isExportMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-surface-container-lowest dark:bg-[#1a1a24] text-on-surface rounded-xl shadow-xl border border-outline-variant/30 dark:border-white/10 py-1 flex flex-col z-50 animate-in fade-in zoom-in-95">
                  <button
                    type="button"
                    onClick={() => {
                      alert('PDF Summary of GST111 generated and downloaded.');
                      setIsExportMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-left hover:bg-surface-container dark:hover:bg-white/5 text-sm"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary dark:text-rose-400">
                      picture_as_pdf
                    </span>
                    <span>PDF Summary</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert('Syncing live audio & transcript to your Google Drive...');
                      setIsExportMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-left hover:bg-surface-container dark:hover:bg-white/5 text-sm"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary dark:text-rose-400">
                      cloud_upload
                    </span>
                    <span>Sync to Drive</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const text = `# ${course?.code || 'GST111'} - Lecture Notes\n\n${streamSentences.join('\n\n')}`;
                      const blob = new Blob([text], { type: 'text/markdown' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${course?.code || 'Lecture'}_notes.md`;
                      a.click();
                      setIsExportMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-left hover:bg-surface-container dark:hover:bg-white/5 text-sm"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary dark:text-rose-400">
                      description
                    </span>
                    <span>Download MD</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Audio Waveform Visualizer & Noise Suppression Card */}
      <div className="flex flex-col bg-primary-container dark:bg-gradient-to-br dark:from-[#2e0c17] dark:via-[#42101e] dark:to-[#1f070e] text-white rounded-xl p-space-md shadow-[0_8px_24px_-4px_rgba(92,21,36,0.22)] dark:shadow-[0_8px_24px_-4px_rgba(255,77,109,0.25)] relative overflow-hidden border border-white/10">
        {/* Ambient Rose Glow Accent */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-secondary-container/20 dark:bg-rose-500/20 blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed dark:text-rose-300 text-[20px] animate-pulse">
              graphic_eq
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed dark:text-rose-300 font-bold">
              Live AI Stream
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/40 dark:bg-black/30 backdrop-blur text-secondary-fixed dark:text-rose-200 font-label-sm text-label-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container dark:bg-rose-400 animate-pulse"></span>
            <span>99.2% Clarity</span>
          </div>
        </div>

        {/* Real-Time Frequency Waveform Animation */}
        <div className="py-4 flex items-center justify-between gap-1.5 h-20 px-1 z-10">
          {waveHeights.map((h, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-full transition-all duration-100 ${
                isPaused
                  ? 'bg-white/30 h-3'
                  : idx % 3 === 0
                  ? 'bg-secondary-fixed dark:bg-rose-300'
                  : idx % 3 === 1
                  ? 'bg-secondary-container dark:bg-rose-400'
                  : 'bg-white'
              }`}
              style={{
                height: isPaused ? '4px' : `${h}px`
              }}
            ></div>
          ))}
        </div>

        {/* Status Strip Footer */}
        <div className="flex items-center justify-between text-secondary-fixed/90 dark:text-rose-200/90 z-10 pt-1 font-label-sm text-label-sm border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">hearing</span>
            <span>Acoustic Isolation Active</span>
          </div>
          <span className="opacity-80">{course?.venue || 'Hall B'} mic calibrated</span>
        </div>
      </div>

      {/* Raw Speech Feed (Live High-Contrast Transcription) */}
      <div className="flex flex-col bg-surface-container-lowest dark:bg-[#16161f] p-space-md rounded-xl shadow-[0_2px_8px_-2px_rgba(92,21,36,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-outline-variant/20 dark:border-white/[0.06] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary dark:bg-[#ff4d6d]"></span>
            <h2 className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">
              Speech Stream
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            Auto-scrolling
          </span>
        </div>

        {/* Transcribed Stream Viewport */}
        <div
          ref={streamScrollRef}
          className="max-h-48 overflow-y-auto space-y-2 pr-1 no-scrollbar scroll-smooth"
        >
          {streamSentences.slice(0, -1).map((sentence, idx) => (
            <p
              key={idx}
              className="font-body-md text-body-md text-on-surface-variant/80 dark:text-neutral-300/80 leading-relaxed"
            >
              "{sentence}"
            </p>
          ))}

          {/* Current Spoken Sentence (High Visibility Highlight) */}
          <div className="p-3 bg-secondary-fixed/30 dark:bg-rose-950/40 border border-secondary/20 dark:border-rose-500/20 rounded-lg shadow-sm">
            <p className="font-title-md text-title-md text-primary dark:text-[#ff4d6d] font-medium leading-snug">
              "{streamSentences[streamSentences.length - 1]}"
              {!isPaused && (
                <span className="inline-block w-2 h-4 bg-primary dark:bg-[#ff4d6d] align-middle ml-1.5 animate-pulse"></span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Structured Academic Jots */}
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col gap-2 px-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-secondary dark:text-rose-400">
                psychology
              </span>
              <h3 className="font-label-lg text-label-lg text-on-surface font-bold">
                Real-time Lecture Jots
              </h3>
            </div>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container dark:bg-[#20202a] font-label-sm text-label-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px] text-secondary dark:text-rose-400">
                sync
              </span>
              {course?.code || 'GST111'} Syllabus
            </span>
          </div>

          {/* Translation Bar */}
          <div className="flex items-center justify-between gap-2 pt-0.5 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[16px] text-secondary dark:text-rose-400 shrink-0">
                translate
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold shrink-0">
                Translate Jots:
              </span>
              <div className="inline-flex items-center gap-1">
                {['EN', 'Hausa', 'French', 'Spanish', 'Yoruba'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setActiveLang(lang)}
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm transition-colors ${
                      activeLang === lang
                        ? 'bg-secondary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] font-bold'
                        : 'bg-surface-container dark:bg-[#20202a] hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {lang === 'EN' ? 'EN (Original)' : lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Quick Jots (if any entered during lecture) */}
        {userJots.map((uj) => (
          <div
            key={uj.id}
            className="bg-secondary-fixed/20 dark:bg-rose-950/30 border border-secondary/30 dark:border-rose-500/30 rounded-xl p-space-md space-y-1 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs text-secondary dark:text-rose-400 font-bold">
              <span>Personal Note • {uj.time}</span>
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface">{uj.text}</p>
          </div>
        ))}

        {/* Jot 1: Key Concept Definition */}
        <div className="bg-surface-container-lowest dark:bg-[#16161f] rounded-xl p-space-md shadow-[0_2px_8px_-2px_rgba(92,21,36,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-outline-variant/20 dark:border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-fixed dark:bg-rose-950/60 flex items-center justify-center text-primary dark:text-[#ff4d6d] shrink-0">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
            </div>
            <div className="min-w-0">
              <span className="font-label-sm text-label-sm font-bold text-secondary dark:text-rose-400 uppercase tracking-wide">
                Key Concept
              </span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                {getTranslatedTitle(LIVE_JOTS_STREAM[0].title)}
              </h4>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-normal pl-9">
            {LIVE_JOTS_STREAM[0].content}
          </p>
        </div>

        {/* Jot 2: Dates & Deadlines Alert */}
        <div className="bg-surface-container-lowest dark:bg-[#16161f] rounded-xl p-space-md shadow-[0_2px_8px_-2px_rgba(92,21,36,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-outline-variant/20 dark:border-white/[0.06] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-secondary-fixed dark:bg-rose-950/60 flex items-center justify-center text-on-secondary-fixed-variant dark:text-rose-300 shrink-0">
                <span className="material-symbols-outlined text-[18px]">event_upcoming</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm font-bold text-secondary dark:text-rose-400 uppercase tracking-wide">
                  Announcements &amp; Dates
                </span>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold leading-tight">
                  {getTranslatedTitle(LIVE_JOTS_STREAM[1].title)}
                </h4>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
              Urgent
            </span>
          </div>

          <div className="space-y-1.5 pl-9">
            {LIVE_JOTS_STREAM[1].items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 bg-surface-container-low dark:bg-[#1c1c24] p-2 rounded-lg"
              >
                <span className="material-symbols-outlined text-[16px] text-primary dark:text-[#ff4d6d] shrink-0 mt-0.5">
                  {item.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-body-sm text-body-sm text-on-surface font-semibold">
                    {item.text}
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {item.meta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jot 3: Structured Arguments Bullet List */}
        <div className="bg-surface-container-lowest dark:bg-[#16161f] rounded-xl p-space-md shadow-[0_2px_8px_-2px_rgba(92,21,36,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-outline-variant/20 dark:border-white/[0.06] space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-surface-container-high dark:bg-[#252530] flex items-center justify-center text-on-surface shrink-0">
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            </div>
            <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
              {getTranslatedTitle(LIVE_JOTS_STREAM[2].title)}
            </h4>
          </div>

          <ul className="space-y-2 pl-9 font-body-sm text-body-sm text-on-surface-variant">
            {LIVE_JOTS_STREAM[2].bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#ff4d6d] mt-2 shrink-0"></span>
                <span>
                  <strong>{b.strong}</strong>
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Add Custom Jot Input */}
        <form onSubmit={handleAddCustomJot} className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Type your own quick note or question..."
            className="flex-1 bg-surface-container-lowest dark:bg-[#16161f] border border-outline-variant/30 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#ff4d6d]"
          />
          <button
            type="submit"
            className="px-3.5 py-2.5 rounded-xl bg-secondary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] font-semibold text-sm active:scale-95 transition-all shadow-sm"
          >
            Add
          </button>
        </form>
      </div>

      {/* Interactive Floating Dock for Bottom Controls */}
      <div className="fixed bottom-4 inset-x-0 z-40 max-w-md mx-auto px-margin-mobile">
        <div className="flex items-center justify-between gap-3 bg-surface-container-highest/95 dark:bg-[#20202c]/95 backdrop-blur-xl p-3 rounded-full shadow-[0_12px_36px_-6px_rgba(92,21,36,0.28)] dark:shadow-[0_12px_36px_-6px_rgba(0,0,0,0.6)] border border-outline-variant/30 dark:border-white/10">
          {/* Pause / Resume Button */}
          <button
            aria-label="Pause Recording"
            onClick={handleTogglePause}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-surface-container-lowest dark:bg-[#131318] text-on-surface hover:bg-surface-container-high active:scale-95 transition-all shadow-sm shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isPaused ? 'play_arrow' : 'pause'}
            </span>
            <span className="font-label-sm text-label-sm font-semibold -mt-0.5">
              {isPaused ? 'Resume' : 'Pause'}
            </span>
          </button>

          {/* Primary Stop & Save Action */}
          <button
            aria-label="Stop recording and synthesize notes"
            onClick={handleFinish}
            className="flex-1 h-14 rounded-full bg-primary hover:bg-primary-container dark:bg-[#ff4d6d] dark:hover:bg-[#e63956] text-white dark:text-[#0e0e11] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(91,2,28,0.35)] dark:shadow-[0_4px_20px_rgba(255,77,109,0.35)] active:scale-98 transition-all px-4 group"
            type="button"
          >
            <span
              className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stop_circle
            </span>
            <span className="font-title-sm text-title-sm font-bold tracking-tight">
              Stop &amp; Save
            </span>
          </button>

          {/* Bookmark / Highlight Action */}
          <button
            aria-label="Add Bookmark Highlight"
            onClick={handleAddHighlight}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-surface-container-lowest dark:bg-[#131318] text-primary dark:text-[#ff4d6d] hover:bg-surface-container-high active:scale-95 transition-all shadow-sm shrink-0 relative"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">bookmark_add</span>
            <span className="font-label-sm text-label-sm font-semibold -mt-0.5">
              {highlights} Marks
            </span>

            {/* Animated +1 Badge */}
            <span
              className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary dark:bg-[#ff4d6d] text-white dark:text-[#0e0e11] font-label-sm text-label-sm flex items-center justify-center font-bold transition-transform duration-300 ${
                showHighlightBadge ? 'scale-110' : 'scale-0'
              }`}
            >
              +1
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
