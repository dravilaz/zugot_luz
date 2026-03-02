// Single source of truth for ALL Hebrew UI strings
// NEVER hardcode Hebrew directly in components — use this file

export const strings = {
  // ─── Onboarding ──────────────────────────────────────────────────────────
  onboarding: {
    welcome: 'שיחת לו״ז זוגית 💛',
    subtitle:
      'הכלי שעוזר לכם להגשים חלומות, להשקיע בקשר, ולהספיק את מה שחשוב — ביחד',
    partner1Label: 'השם של בן/בת הזוג הראשון/ה',
    partner2Label: 'השם של בן/בת הזוג השני/ה',
    dayLabel: 'באיזה יום לקבוע את השיחה?',
    startButton: 'בואו נתחיל! 💛',
    days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  },

  // ─── Session general ─────────────────────────────────────────────────────
  session: {
    encouragement:
      'תהיו חברים ותעזרו אחד לשני להצליח ביחד 💛 ההצלחה היא הביחד שלכם. גם כמה דקות זה בסדר.',
    sensitiveNote:
      'לפעמים עולים דברים רגישים — תהיו עדינים. הסכימו מראש לצאת ביחד מהשיחה.',
    pauseButton: 'שומרים וחוזרים אחר כך 💾',
    continueButton: 'ממשיכים ▶️',
    backButton: 'חזרה',
    welcomeBack: 'שמחים שחזרתם 💛',
  },

  // ─── Step 1 — Check-in ───────────────────────────────────────────────────
  step1: {
    header: 'לפני הכל... מה שלומכם? 🌿',
    subtitle: 'כל אחד/ת מספר/ת מה עובר עליו/ה בימים אלו',
    placeholder: 'מה עובר עליך? איך את/ה מרגיש/ה?',
    time: '⏱️ 5-10 דקות',
  },

  // ─── Step 2 — Intentions ─────────────────────────────────────────────────
  step2: {
    header: 'מה הכוונות שלכם להשבוע? ✨',
    subtitle:
      '⭐ כוונו את התשובות למהות, להוויה ולא רק להישגים. זו לא שיחת משימות, אלא כוונות.',
    personal: '🧘 באישי',
    personalPlaceholder: 'מה חשוב לך השבוע ברמה האישית?',
    professional: '💼 במקצועי/קריירה',
    professionalPlaceholder: 'מה הכוונה שלך בעבודה?',
    coupleLabel: '💑 בזוגי',
    couplePlaceholder: 'מה תרצו לחוות ביחד?',
    family: '👨‍👩‍👧‍👦 במשפחתי',
    familyPlaceholder: 'מה חשוב לך במשפחה השבוע?',
    exampleTitle: 'דוגמה 💡',
    time: '⏱️ 15-20 דקות',
  },

  // ─── Step 3 — Calendar ───────────────────────────────────────────────────
  step3: {
    header: 'בואו נעבור על היומן 📅',
    subtitle: 'תכנון קדימה של כל מה שיכול להוריד עומס מתקשורת יום-יום',
    helper: 'מי עם הילדים? מתי לחזור הביתה? אירועים שיש?',
    addItem: 'הוסיפו פריט +',
    assignedPartner1: 'בן/בת הזוג 1',
    assignedPartner2: 'בן/בת הזוג 2',
    assignedBoth: 'שניכם',
    time: '⏱️ 10 דקות',
  },

  // ─── Checkpoint 1 ────────────────────────────────────────────────────────
  checkpoint1: {
    message: 'מעולה! עברתם את החלק הארגוני 🎉',
    subtitle: 'קחו נשימה לפני שממשיכים',
    continueBtn: 'ממשיכים ▶️',
    pauseBtn: 'שומרים וחוזרים אחר כך 💾',
  },

  // ─── Step 4 — Schedule Intentions ────────────────────────────────────────
  step4: {
    header: 'עכשיו הקסם — מכניסים את הכוונות ללו״ז! 🪄',
    subtitle: 'מפנים זמן למה שאנחנו באמת רוצים ומזיזים דברים בהתאם',
    whenLabel: 'מתי?',
    enablerLabel: 'מה צריך לקרות כדי שזה יתאפשר?',
    tip: '💡 טיפ: גם מנוחה היא כוונה לגיטימית! כמו שדניאל אומר — ׳פוך וסדרה׳ ביומן זו הצלחה. אתם קובעים מה היא הצלחה.',
    time: '⏱️ 10 דקות',
  },

  // ─── Step 5 — Date ───────────────────────────────────────────────────────
  step5: {
    header: 'ועכשיו הכי חשוב — דייט! 💕',
    subtitle:
      'לשאוף לזמן רק של שניכם. עדיף שעתיים בנחת, ואם אין — רבע שעה בסוף היום.',
    types: {
      outing: '🎭 בילוי בחוץ',
      intimate: '🕯️ דייט אינטימי',
      coffee: '☕ קפה בתחילת יום',
      phone: '📱 דייט בטלפון',
      other: '✨ משהו אחר',
    },
    sweet: 'אתם חמודים 💛 פנו לעצמיכם זמן איכותי!',
    time: '⏱️ 5 דקות',
    plannedYes: 'כן, תכננו!',
    plannedNo: 'עוד לא',
    whenLabel: 'מתי?',
    whenPlaceholder: 'יום ושעה',
    notesPlaceholder: 'פרטים נוספים...',
  },

  // ─── Checkpoint 2 ────────────────────────────────────────────────────────
  checkpoint2: {
    message: 'כמעט סיימנו! עוד רגע ונסגור את השיחה 🌟',
    subtitle: 'עוד שני צעדים קטנים',
    continueBtn: 'ממשיכים ▶️',
    pauseBtn: 'שומרים וחוזרים אחר כך 💾',
  },

  // ─── Step 6 — Tasks ──────────────────────────────────────────────────────
  step6: {
    header: 'עלו עוד דברים שצריך לטפל בהם? 📝',
    subtitle: 'משימות נוספות שקשורות לבית או לזוגיות',
    addTask: 'הוסיפו משימה +',
    taskPlaceholder: 'מה צריך לעשות?',
    time: '⏱️ 5 דקות',
  },

  // ─── Step 7 — Closing ────────────────────────────────────────────────────
  step7: {
    header: 'תודה על מה שהיה 🙏',
    gratitudePlaceholder: 'רוצים לכתוב תודה או מילה טובה?',
    nextWeekReminder:
      'בשבוע הבא מתחילים בלקרוא את הכוונות מהשבוע שעבר — תתפלאו כמה דברים קרו!',
    finishButton: 'סיימנו! כל הכבוד אלופים! 🏆',
    celebration: 'כל הכבוד! עשיתם את זה ביחד 💛',
  },

  // ─── Dashboard ───────────────────────────────────────────────────────────
  dashboard: {
    greeting: (name1: string, name2: string) => `היי ${name1} ו${name2}! 👋`,
    newSession: 'להתחיל שיחת לו״ז חדשה ✨',
    continueSession: 'להמשיך את השיחה ▶️',
    midWeekCheckin: 'צ׳ק-אין אמצע שבוע 🌱',
    weekReview: 'סיכום שבועי 📋',
    history: 'היסטוריה 📖',
    noSessionYet: 'עדיין לא התחלתם השבוע',
    streakLabel: (n: number) => `${n} שבועות ברצף 🔥`,
    summaryLink: 'תלוי על הדלת 🚪',
    weekStarted: 'שיחת השבוע בעיצומה',
    weekCompleted: 'שיחת השבוע הושלמה ✓',
    intentionsThisWeek: 'הכוונות של השבוע',
  },

  // ─── Mid-week checkin ─────────────────────────────────────────────────────
  midweek: {
    header: 'צ׳ק-אין אמצע שבוע 🌱',
    subtitle: 'איך מרגישים? מה קרה עם הכוונות?',
    partner1Update: 'עדכון מ',
    partner2Update: 'עדכון מ',
    updatePlaceholder: 'מה קרה? איך זה הולך?',
    onTrackLabel: 'כמה את/ה מרגיש/ה שאנחנו במסלול?',
    saveButton: 'שומרים 💾',
    savedMessage: 'נשמר! 💛',
  },

  // ─── Week Review ──────────────────────────────────────────────────────────
  review: {
    header: 'סיכום שבועי 📋',
    subtitle: 'בואו נסתכל אחורה על השבוע שעבר',
    partner1Reflection: 'השתקפות של',
    partner2Reflection: 'השתקפות של',
    reflectionPlaceholder: 'מה היה השבוע עבורך?',
    whatWorked: 'מה עבד טוב?',
    whatWorkedPlaceholder: 'מה הצלחתם לעשות ביחד?',
    whatToImprove: 'מה נשפר בשבוע הבא?',
    whatToImprovePlaceholder: 'מה הייתם עושים אחרת?',
    surprises: 'מה הפתיע אתכם?',
    surprisesPlaceholder: 'רגעים בלתי צפויים...',
    overallFeeling: 'הרגשה כללית על השבוע',
    finishButton: 'סיימנו את הסיכום 🎉',
  },

  // ─── History ──────────────────────────────────────────────────────────────
  history: {
    header: 'היסטוריה 📖',
    subtitle: 'השיחות הקודמות שלכם',
    noHistory: 'עדיין אין שיחות קודמות',
    weekLabel: 'שבוע',
    completedLabel: 'הושלם',
    inProgressLabel: 'בתהליך',
    viewSession: 'צפייה',
  },

  // ─── Summary ("תלוי על הדלת") ─────────────────────────────────────────────
  summary: {
    header: 'תלוי על הדלת 🚪',
    subtitle: 'הכוונות של השבוע שלנו',
    printButton: 'הדפסה 🖨️',
    partner1Intentions: 'הכוונות שלי',
    partner2Intentions: 'הכוונות שלך',
    datePlan: 'הדייט שלנו 💕',
    tasks: 'משימות',
  },

  // ─── Common ───────────────────────────────────────────────────────────────
  common: {
    save: 'שמירה',
    cancel: 'ביטול',
    delete: 'מחיקה',
    edit: 'עריכה',
    done: 'סיום',
    next: 'הבא',
    back: 'חזרה',
    loading: 'טוען...',
    error: 'משהו השתבש',
    yes: 'כן',
    no: 'לא',
  },
} as const
