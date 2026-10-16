import React from 'react';

export default function ScheduleModal({ courses, onSelectCourse, onStartRecording, onClose }) {
  const schedule = [
    { time: '10:15 AM - 11:45 AM', courseCode: 'GST111', title: 'English & Logic', venue: 'Lecture Hall B', lecturer: 'Prof. Vance', status: 'In Progress / Ready' },
    { time: '12:00 PM - 01:30 PM', courseCode: 'EDU 102', title: 'Philosophy of Education', venue: 'Hall A', lecturer: 'Prof. Vance', status: 'Upcoming' },
    { time: '02:30 PM - 04:00 PM', courseCode: 'BIO 204', title: 'Cellular Biochemistry', venue: 'Lab 3', lecturer: 'Dr. Adeleke', status: 'Upcoming' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-surface-container-lowest dark:bg-[#16161f] rounded-2xl shadow-2xl border border-outline-variant/30 dark:border-white/10 p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary dark:text-[#ff4d6d]">
              event_note
            </span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
              Today's Schedule
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-surface-container-low dark:bg-[#1c1c24] border border-outline-variant/20 dark:border-white/5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-secondary dark:text-[#ff4d6d]">
                  {item.time}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status.includes('Ready')
                      ? 'bg-secondary-fixed text-primary font-bold animate-pulse'
                      : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">
                  {item.courseCode} — {item.title}
                </h4>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {item.lecturer} • {item.venue}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const foundCourse = courses.find((c) => c.code === item.courseCode) || courses[0];
                  onSelectCourse(foundCourse);
                  onClose();
                  onStartRecording(foundCourse);
                }}
                className="w-full py-1.5 px-3 rounded-lg bg-primary dark:bg-[#ff4d6d] hover:bg-primary-container text-white dark:text-[#0e0e11] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">mic</span>
                <span>Record this Lecture</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
