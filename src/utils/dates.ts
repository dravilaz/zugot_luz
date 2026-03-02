/**
 * Returns the ISO date string (YYYY-MM-DD) of the Sunday that starts the current week.
 */
export function getCurrentWeekStart(): string {
  const today = new Date()
  const day = today.getDay() // 0=Sunday
  const sunday = new Date(today)
  sunday.setDate(today.getDate() - day)
  return sunday.toISOString().split('T')[0]
}

/**
 * Returns the ISO date string for the start of the week containing `date`.
 */
export function getWeekStart(date: Date): string {
  const d = new Date(date)
  d.setDate(d.getDate() - d.getDay())
  return d.toISOString().split('T')[0]
}

/**
 * Format a date as a Hebrew-locale friendly string.
 */
export function formatHebrewDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('he-IL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format a short date (day + month) in Hebrew locale.
 */
export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
  })
}

/**
 * Returns true if two date strings are in the same week (Sunday-Saturday).
 */
export function isSameWeek(dateA: string, dateB: string): boolean {
  return getWeekStart(new Date(dateA)) === getWeekStart(new Date(dateB))
}

/**
 * Returns the day name in Hebrew for a given 0-indexed weekday.
 */
export function getHebrewDayName(day: number): string {
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
  return days[day] ?? ''
}
