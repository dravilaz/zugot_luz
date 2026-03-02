import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSessionStore } from '../../store/useSessionStore'
import { WeeklySession, ScheduledIntention, Intentions } from '../../types'
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

function buildFromIntentions(
  intentions: Intentions,
  prefix: string
): ScheduledIntention[] {
  const cats: Array<keyof Intentions> = ['personal', 'professional', 'couple', 'family']
  return cats
    .filter((cat) => intentions[cat]?.trim())
    .map((cat) => ({
      id: makeId(),
      category: cat,
      intention: `${prefix}: ${intentions[cat]}`,
      scheduledDay: '',
      scheduledTime: '',
      enabler: '',
    }))
}

export default function SessionStep4({
  session,
  partner1Name,
  partner2Name,
  onNext,
  onBack,
  onPause,
}: Props) {
  const [scheduled, setScheduled] = useState<ScheduledIntention[]>(() => {
    if (session.scheduledIntentions.length > 0) {
      return session.scheduledIntentions
    }
    return [
      ...buildFromIntentions(session.partner1Intentions, partner1Name),
      ...buildFromIntentions(session.partner2Intentions, partner2Name),
    ]
  })

  const { updateSession } = useSessionStore()
  const s = strings.step4

  function save(scheduledIntentions: ScheduledIntention[]) {
    updateSession(session.id, { scheduledIntentions })
  }

  function updateItem(id: string, patch: Partial<ScheduledIntention>) {
    const next = scheduled.map((item) =>
      item.id === id ? { ...item, ...patch } : item
    )
    setScheduled(next)
    save(next)
  }

  return (
    <motion.div
      key="step-4"
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card space-y-2 text-center">
        <p className="text-3xl">🪄</p>
        <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.header}</h2>
        <p className="text-gray-500 text-sm">{s.subtitle}</p>
        <p className="text-xs text-[#C4704B]">{s.time}</p>
      </div>

      <div className="card-sticky">
        <p className="text-sm text-amber-800">{s.tip}</p>
      </div>

      {scheduled.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-400">אין כוונות לתזמן — המשיכו הלאה!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {scheduled.map((item) => (
            <div key={item.id} className="card space-y-3">
              <p className="font-medium text-[#3D2C2C] text-sm leading-snug">
                {item.intention}
              </p>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {s.whenLabel}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="יום ושעה"
                  value={item.scheduledDay}
                  onChange={(e) => updateItem(item.id, { scheduledDay: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  {s.enablerLabel}
                </label>
                <textarea
                  className="textarea-field h-16"
                  placeholder="מה צריך לקרות?"
                  value={item.enabler}
                  onChange={(e) => updateItem(item.id, { enabler: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={() => onNext({ scheduledIntentions: scheduled })}
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
