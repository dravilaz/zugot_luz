import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSessionStore } from '../../store/useSessionStore'
import { WeeklySession } from '../../types'
import { strings } from '../../utils/strings'

interface Props {
  session: WeeklySession
  partner1Name: string
  partner2Name: string
  onNext: (updates: Partial<WeeklySession>) => void
  onBack: () => void
  onPause: () => void
}

export default function SessionStep1({
  session,
  partner1Name,
  partner2Name,
  onNext,
  onBack,
  onPause,
}: Props) {
  const [p1Mood, setP1Mood] = useState(session.partner1Mood)
  const [p2Mood, setP2Mood] = useState(session.partner2Mood)
  const { updateSession } = useSessionStore()
  const s = strings.step1

  function save(partner1Mood: string, partner2Mood: string) {
    updateSession(session.id, { partner1Mood, partner2Mood })
  }

  return (
    <motion.div
      key="step-1"
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card space-y-2 text-center">
        <p className="text-3xl">🌿</p>
        <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.header}</h2>
        <p className="text-gray-500 text-sm">{s.subtitle}</p>
        <p className="text-xs text-[#C4704B]">{s.time}</p>
      </div>

      <div className="card space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
            {partner1Name}
          </label>
          <textarea
            className="textarea-field h-24"
            placeholder={s.placeholder}
            value={p1Mood}
            onChange={(e) => {
              setP1Mood(e.target.value)
              save(e.target.value, p2Mood)
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
            {partner2Name}
          </label>
          <textarea
            className="textarea-field h-24"
            placeholder={s.placeholder}
            value={p2Mood}
            onChange={(e) => {
              setP2Mood(e.target.value)
              save(p1Mood, e.target.value)
            }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onNext({ partner1Mood: p1Mood, partner2Mood: p2Mood })}
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
