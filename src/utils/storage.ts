export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage might be full or unavailable; fail silently
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // fail silently
  }
}

export const STORAGE_KEYS = {
  SETTINGS: 'zugot-luz:settings',
  SESSIONS: 'zugot-luz:sessions',
} as const
