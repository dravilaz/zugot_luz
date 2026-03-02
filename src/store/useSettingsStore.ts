import { create } from 'zustand'
import { CoupleSettings } from '../types'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'

interface SettingsStore {
  settings: CoupleSettings
  updateSettings: (updates: Partial<CoupleSettings>) => void
  resetSettings: () => void
}

const DEFAULT_SETTINGS: CoupleSettings = {
  partner1Name: '',
  partner2Name: '',
  preferredDay: 1, // Monday
  setupComplete: false,
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: loadFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS),

  updateSettings: (updates) =>
    set((state) => {
      const next = { ...state.settings, ...updates }
      saveToStorage(STORAGE_KEYS.SETTINGS, next)
      return { settings: next }
    }),

  resetSettings: () => {
    saveToStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
    set({ settings: DEFAULT_SETTINGS })
  },
}))
