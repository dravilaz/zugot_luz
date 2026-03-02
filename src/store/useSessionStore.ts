import { create } from 'zustand'
import { WeeklySession, Intentions, DatePlan } from '../types'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import { getCurrentWeekStart, isSameWeek } from '../utils/dates'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const DEFAULT_INTENTIONS: Intentions = {
  personal: '',
  professional: '',
  couple: '',
  family: '',
}

const DEFAULT_DATE_PLAN: DatePlan = {
  planned: false,
  when: '',
  type: 'other',
  notes: '',
}

interface SessionStore {
  sessions: WeeklySession[]

  // Helpers
  getCurrentWeekSession: () => WeeklySession | null
  getSessionHistory: () => WeeklySession[]
  getStreak: () => number
  createNewSession: () => WeeklySession
  updateSession: (id: string, updates: Partial<WeeklySession>) => void
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessions: loadFromStorage<WeeklySession[]>(STORAGE_KEYS.SESSIONS, []),

  getCurrentWeekSession: () => {
    const weekStart = getCurrentWeekStart()
    return (
      get().sessions.find((s) => isSameWeek(s.weekStartDate, weekStart)) ?? null
    )
  },

  getSessionHistory: () => {
    const weekStart = getCurrentWeekStart()
    return get()
      .sessions.filter((s) => !isSameWeek(s.weekStartDate, weekStart))
      .sort(
        (a, b) =>
          new Date(b.weekStartDate).getTime() -
          new Date(a.weekStartDate).getTime()
      )
  },

  getStreak: () => {
    const completed = get()
      .sessions.filter((s) => s.completed)
      .sort(
        (a, b) =>
          new Date(b.weekStartDate).getTime() -
          new Date(a.weekStartDate).getTime()
      )

    if (completed.length === 0) return 0

    let streak = 1
    for (let i = 1; i < completed.length; i++) {
      const prev = new Date(completed[i - 1].weekStartDate)
      const curr = new Date(completed[i].weekStartDate)
      const diffDays =
        (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24)
      if (diffDays <= 8) {
        streak++
      } else {
        break
      }
    }
    return streak
  },

  createNewSession: () => {
    const now = new Date().toISOString()
    const weekStart = getCurrentWeekStart()
    const hasPreviousSessions = get().sessions.some(
      (s) => !isSameWeek(s.weekStartDate, weekStart)
    )
    const newSession: WeeklySession = {
      id: generateId(),
      weekStartDate: weekStart,
      createdAt: now,
      currentStep: hasPreviousSessions ? 0 : 1,
      partner1Mood: '',
      partner2Mood: '',
      partner1Intentions: { ...DEFAULT_INTENTIONS },
      partner2Intentions: { ...DEFAULT_INTENTIONS },
      scheduledIntentions: [],
      calendarItems: [],
      datePlan: { ...DEFAULT_DATE_PLAN },
      additionalTasks: [],
      gratitudeNote: '',
      midWeekCheckins: [],
      weekReview: null,
      completed: false,
    }

    set((state) => {
      const next = [...state.sessions, newSession]
      saveToStorage(STORAGE_KEYS.SESSIONS, next)
      return { sessions: next }
    })

    return newSession
  },

  updateSession: (id, updates) =>
    set((state) => {
      const next = state.sessions.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      )
      saveToStorage(STORAGE_KEYS.SESSIONS, next)
      return { sessions: next }
    }),
}))
