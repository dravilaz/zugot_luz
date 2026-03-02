import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getCurrentWeekStart, isSameWeek, getHebrewDayName, formatShortDate } from '../utils/dates'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => { store[key] = val },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
  }
})()

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

describe('utils/dates', () => {
  it('getCurrentWeekStart returns a Sunday', () => {
    const start = getCurrentWeekStart()
    const date = new Date(start)
    expect(date.getDay()).toBe(0) // Sunday
  })

  it('isSameWeek returns true for dates in same week', () => {
    expect(isSameWeek('2026-03-02', '2026-03-04')).toBe(true)
  })

  it('isSameWeek returns false for dates in different weeks', () => {
    expect(isSameWeek('2026-03-01', '2026-03-10')).toBe(false)
  })

  it('getHebrewDayName returns correct names', () => {
    expect(getHebrewDayName(0)).toBe('ראשון')
    expect(getHebrewDayName(6)).toBe('שבת')
  })

  it('formatShortDate returns a non-empty string', () => {
    const result = formatShortDate('2026-03-02')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('utils/storage', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.restoreAllMocks()
  })

  it('saveToStorage and loadFromStorage round-trip', () => {
    const data = { name: 'test', value: 42 }
    saveToStorage(STORAGE_KEYS.SETTINGS, data)
    const loaded = loadFromStorage(STORAGE_KEYS.SETTINGS, null)
    expect(loaded).toEqual(data)
  })

  it('loadFromStorage returns fallback when key is missing', () => {
    const fallback = { default: true }
    const result = loadFromStorage('nonexistent-key', fallback)
    expect(result).toEqual(fallback)
  })
})
