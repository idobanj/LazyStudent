export const INITIAL_COURSES = [
  { id: 'GST111', code: 'GST111', name: 'English & Logic', lecturer: 'Prof. Vance', venue: 'Hall B', time: '10:15 AM' },
  { id: 'EDU102', code: 'EDU 102', name: 'Philosophy of Education', lecturer: 'Prof. Vance', venue: 'Hall A', time: '12:00 PM' },
  { id: 'BIO204', code: 'BIO 204', name: 'Cellular Biochemistry', lecturer: 'Dr. Adeleke', venue: 'Lab 3', time: '02:30 PM' },
  { id: 'MTH101', code: 'MTH 101', name: 'Elementary Mathematics', lecturer: 'Prof. Okafor', venue: 'LT 1', time: '08:00 AM' },
  { id: 'PHY107', code: 'PHY 107', name: 'General Physics I', lecturer: 'Dr. Bello', venue: 'Physics Lab', time: '04:00 PM' },
];

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    courseId: 'GST111',
    courseCode: 'GST111 — English & Logic',
    dateLabel: 'Today, 10:15 AM',
    dateFilter: 'Today',
    duration: '54 mins',
    durationSeconds: 3252,
    venue: 'Hall B',
    icon: 'menu_book',
    iconBg: 'bg-primary-container/10',
    iconColor: 'text-primary-container',
    isBookmarked: true,
    aiSummary: 'Explored deductive vs inductive reasoning syllogisms, fallacy identification in academic discourse, and argumentative structure.',
    tags: ['Definitions', 'Exam Review', 'Key Concepts'],
    progressSeconds: 1112, // 18:32
    progressFormatted: '18:32',
    totalFormatted: '54:12',
    audioProgressPercent: 34,
    transcription: [
      { time: '00:04', speaker: 'Prof. Vance', text: 'Welcome back everyone. Today we delve into formal deductive logic and categorical syllogisms.' },
      { time: '05:22', speaker: 'Prof. Vance', text: 'Notice that Aristotle defined validity independent of empirical truth.' },
      { time: '18:32', speaker: 'Prof. Vance', text: 'If all humans are mortal, and Socrates is human, then Socrates is definitively mortal.' },
      { time: '32:10', speaker: 'Prof. Vance', text: 'Do not confuse formal invalidity with practical falsity. An invalid argument can accidentally yield a true statement.' }
    ],
    keyPoints: [
      'Universal quantification: The major premise must state a complete categorical rule.',
      'Structural validity: Validity assesses only structural cohesion, completely detached from empirical accuracy.',
      'Logical soundness: An argument is sound only when both valid syllogistic form and empirically verified premises coincide.'
    ],
    deadlines: [
      { title: 'Midterm Paper Submission', date: 'Nov 14th by 11:59 PM', venue: 'Canvas Portal', urgent: true },
      { title: 'Tutorial Group Defense', date: 'Next Tuesday', venue: 'Hall B breakout suites', urgent: false }
    ]
  },
  {
    id: 'note-2',
    courseId: 'EDU 102',
    courseCode: 'EDU 102 — Philosophy of Education',
    dateLabel: 'Yesterday',
    dateFilter: 'EDU 102',
    duration: '1 hr 12 mins',
    durationSeconds: 4320,
    venue: 'Prof. Vance',
    icon: 'psychology',
    iconBg: 'bg-secondary-container/30',
    iconColor: 'text-on-secondary-container',
    isBookmarked: false,
    aiSummary: 'Analyzed John Dewey’s experiential learning theory, constructivist pedagogy, and modern classroom engagement ethics.',
    tags: ['Definitions', 'Dewey', 'Reading List'],
    progressSeconds: 1720, // 28:40
    progressFormatted: '28:40',
    totalFormatted: '1:12:00',
    audioProgressPercent: 40,
    transcription: [
      { time: '00:15', speaker: 'Prof. Vance', text: 'Education is not preparation for life; education is life itself.' },
      { time: '14:30', speaker: 'Prof. Vance', text: 'Dewey challenged the traditional passive instructional model.' },
      { time: '28:40', speaker: 'Prof. Vance', text: 'Experiential learning requires active reflection on practical engagement.' }
    ],
    keyPoints: [
      'Constructivist epistemology views learners as active constructors of conceptual meaning.',
      'Reflective inquiry transforms spontaneous experience into tested knowledge.'
    ],
    deadlines: [
      { title: 'Philosophy Essay Draft', date: 'Nov 20th', venue: 'Online Submission', urgent: false }
    ]
  },
  {
    id: 'note-3',
    courseId: 'BIO 204',
    courseCode: 'BIO 204 — Cellular Biochemistry',
    dateLabel: 'Oct 24',
    dateFilter: 'BIO 204',
    duration: '48 mins',
    durationSeconds: 2880,
    venue: 'Lab 3',
    icon: 'biotech',
    iconBg: 'bg-tertiary-container/15',
    iconColor: 'text-tertiary',
    isBookmarked: true,
    aiSummary: 'ATP synthesis via oxidative phosphorylation across mitochondrial inner membrane and proton gradient mechanics.',
    tags: ['Diagrams', 'Definitions', 'High Yield'],
    progressSeconds: 2295, // 38:15
    progressFormatted: '38:15',
    totalFormatted: '48:00',
    audioProgressPercent: 80,
    transcription: [
      { time: '01:10', speaker: 'Dr. Adeleke', text: 'Notice how Complex IV transfers electrons directly to molecular oxygen to yield water.' },
      { time: '18:45', speaker: 'Dr. Adeleke', text: 'The chemiosmotic coupling hypothesis formulated by Peter Mitchell.' },
      { time: '38:15', speaker: 'Dr. Adeleke', text: 'ATP synthase F0 and F1 subunits utilize the proton motive force.' }
    ],
    keyPoints: [
      'Proton gradient (ΔpH and Δψ) powers the rotational catalytic mechanism of ATP synthase.',
      'Uncouplers such as DNP dissipate the proton gradient without blocking electron transport.'
    ],
    deadlines: [
      { title: 'Biochemistry Lab 3 Report', date: 'Oct 31st 5:00 PM', venue: 'Science Complex', urgent: true }
    ]
  }
];

export const INITIAL_FLASHCARDS = [
  {
    id: 'fc-1',
    course: 'GST111',
    question: 'What is the critical distinction between deductive validity and logical soundness?',
    answer: 'Validity requires that IF premises are true, the conclusion must follow. Soundness requires both formal validity AND that all premises are factually true.',
    tag: 'Formal Logic'
  },
  {
    id: 'fc-2',
    course: 'GST111',
    question: 'Name the three categorical terms in an Aristotelian syllogism.',
    answer: '1. The Major Term (predicate of the conclusion)\n2. The Minor Term (subject of the conclusion)\n3. The Middle Connector (appears in both premises, never in the conclusion).',
    tag: 'Syllogisms'
  },
  {
    id: 'fc-3',
    course: 'EDU 102',
    question: 'Explain John Dewey’s principle of "Continuity of Experience".',
    answer: 'Every experience both takes up something from those which have gone before and modifies in some way the quality of those which come after.',
    tag: 'Educational Theory'
  },
  {
    id: 'fc-4',
    course: 'BIO 204',
    question: 'Which subunit of ATP synthase rotates in response to proton flow across the inner mitochondrial membrane?',
    answer: 'The c-ring rotor within the membrane-embedded F₀ subunit.',
    tag: 'Bioenergetics'
  },
  {
    id: 'fc-5',
    course: 'GST111',
    question: 'What is the fallacy of affirming the consequent?',
    answer: 'A formal fallacy taking the invalid form: "If P then Q; Q; therefore P".',
    tag: 'Fallacies'
  }
];

export const LIVE_SPEECH_STREAM = [
  "...so we have established that Aristotle framed the categorical syllogism with three specific terms: the major, the minor, and the middle connector.",
  "Now, notice carefully that deductive validity guarantees the absolute truth of the conclusion if all premises are sound...",
  "Let us write down an example on the board: All mammals breathe air. Whales are mammals. Therefore, whales breathe air.",
  "Examine what happens when one of our premises fails empirical scrutiny: All birds can fly. Penguins are birds. Therefore penguins can fly. The form is valid, yet the conclusion is unsound.",
  "Remember this key principle for your midterm assessment on November 14th: validity is purely structural, while soundness is structural plus empirical truth.",
  "Next week in our tutorial defense sessions, each group will formulate and defend three distinct syllogisms against formal fallacies."
];

export const LIVE_JOTS_STREAM = [
  {
    type: 'concept',
    tag: 'Key Concept',
    icon: 'lightbulb',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    title: 'Deductive vs Inductive Inferences',
    content: 'Deduction moves from general universally true laws to inevitable specific instances. Induction generalizes probabilistic conclusions based on finite empirical observations.'
  },
  {
    type: 'dates',
    tag: 'Announcements & Dates',
    icon: 'event_upcoming',
    iconBg: 'bg-secondary-fixed',
    iconColor: 'text-on-secondary-fixed-variant',
    title: 'Action Items Identified',
    urgent: true,
    items: [
      { text: 'Midterm Paper Submission', meta: 'Nov 14th by 11:59 PM • Canvas Portal', icon: 'calendar_month' },
      { text: 'Tutorial Group Defense', meta: 'Next Tuesday in Hall B breakout suites', icon: 'group' }
    ]
  },
  {
    type: 'arguments',
    tag: 'Core Tenets',
    icon: 'format_list_bulleted',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface',
    title: 'Lecture Arguments (Core Tenets)',
    bullets: [
      { strong: 'Universal quantification:', text: ' The major premise must state a complete categorical rule without subjective qualifiers.' },
      { strong: 'Structural validity:', text: ' Validity assesses only structural cohesion, completely detached from empirical or factual accuracy.' },
      { strong: 'Logical soundness:', text: ' An argument is sound only when both valid syllogistic form and empirically verified premises coincide.' }
    ]
  }
];
