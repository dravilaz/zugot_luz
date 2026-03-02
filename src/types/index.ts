export interface CoupleSettings {
  partner1Name: string;
  partner2Name: string;
  preferredDay: number; // 0=Sunday..6=Saturday, default 1 (Monday)
  setupComplete: boolean;
}

export interface Intentions {
  personal: string;      // באישי
  professional: string;  // במקצועי/קריירה
  couple: string;        // בזוגי
  family: string;        // במשפחתי
}

export interface ScheduledIntention {
  id: string;
  category: keyof Intentions;
  intention: string;
  scheduledDay: string;
  scheduledTime: string;
  enabler: string;
}

export interface CalendarItem {
  id: string;
  description: string;
  assignedTo: 'partner1' | 'partner2' | 'both';
}

export interface DatePlan {
  planned: boolean;
  when: string;
  type: 'outing' | 'intimate' | 'phone' | 'coffee' | 'other';
  notes: string;
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface MidWeekCheckin {
  id: string;
  date: string;
  partner1Update: string;
  partner2Update: string;
  feelingOnTrack: number; // 1-5
}

export interface WeekReview {
  completedAt: string;
  partner1Reflection: string;
  partner2Reflection: string;
  whatWorked: string;
  whatToImprove: string;
  surprises: string;
  overallFeeling: number; // 1-5
}

export interface WeeklySession {
  id: string;
  weekStartDate: string;
  createdAt: string;
  currentStep: number; // 0-7 for pause/resume
  partner1Mood: string;
  partner2Mood: string;
  partner1Intentions: Intentions;
  partner2Intentions: Intentions;
  scheduledIntentions: ScheduledIntention[];
  calendarItems: CalendarItem[];
  datePlan: DatePlan;
  additionalTasks: TaskItem[];
  gratitudeNote: string;
  midWeekCheckins: MidWeekCheckin[];
  weekReview: WeekReview | null;
  completed: boolean;
}
