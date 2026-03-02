import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSessionStore } from '../../store/useSessionStore'
import { WeeklySession, CalendarItem } from '../../types'
import { strings } from '../../utils/strings'

interface Props {
  session: WeeklySession
  partner1Name: string
  partner2Name: string
  onNext: (updates: Partial<WeeklySession>) => void
  onBack: () => void
  onPause: () => void
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export default function SessionStep3({
  session,
  partner1Name,
  partner2Name,
  onNext,
  onBack,
  onPause,
}: Props) {
  const [items, setItems] = useState<CalendarItem[]>(session.calendarItems)
  const { updateSession } = useSessionStore()
  const s = strings.step3

  function save(calendarItems: CalendarItem[]) {
    updateSession(session.id, { calendarItems })
  }

  function addItem() {
    const next = [...items, { id: makeId(), description: '', assignedTo: 'both' as const }]
    setItems(next)
    save(next)
  }

  function updateItem(id: string, patch: Partial<CalendarItem>) {
    const next = items.map((item) => (item.id === id ? { ...item, ...patch } : item))
    setItems(next)
    save(next)
  }

  function removeItem(id: string) {
    const next = items.filter((item) => item.id !== id)
    setItems(next)
    save(next)
  }

  const assignOptions: Array<{ value: CalendarItem['assignedTo']; label: string }> = [
    { value: 'partner1', label: partner1Name },
    { value: 'partner2', label: partner2Name },
    { value: 'both', label: s.assignedBoth },
  ]

  return (
    <motion.div
      key="step-3"
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card space-y-2 text-center">
        <p className="text-3xl">📅</p>
        <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.header}</h2>
        <p className="text-gray-500 text-sm">{s.subtitle}</p>
        <p className="text-xs text-gray-400">{s.helper}</p>
        <p className="text-xs text-[#C4704B]">{s.time}</p>
      </div>

      <div className="card space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="space-y-2 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <input
              type="text"
              className="input-field"
              placeholder="מה יש ביומן?"
              value={item.description}
              onChange={(e) => updateItem(item.id, { description: e.target.value })}
            />
            <div className="flex gap-2 flex-wrap items-center">
              {assignOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateItem(item.id, { assignedTo: opt.value })}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    item.assignedTo === opt.value
                      ? 'bg-[#C4704B] text-white border-[#C4704B]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#C4704B]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-xs px-3 py-1.5 rounded-full border border-red-100 text-red-400 hover:bg-red-50 transition-colors mr-auto"
              >
                הסרה
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="w-full py-3 border-2 border-dashed border-amber-200 rounded-xl text-[#C4704B] text-sm font-medium hover:bg-amber-50 transition-colors"
        >
          {s.addItem}
        </button>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onNext({ calendarItems: items })}
          className="btn-primary w-full"
        >
          {strings.common.next}
        </button>
        <button onClick={onBack} className="btn-secondary w-full">
          {strings.common.back}
        </button>
        <button
          onClick={onPause}
          className="w-full h-12 text-[#C4704B] font-medium hover:bg-amber-50 rounded-full transition-colors"
        >
          {strings.session.pauseButton}
        </button>
      </div>
    </motion.div>
  )
}
