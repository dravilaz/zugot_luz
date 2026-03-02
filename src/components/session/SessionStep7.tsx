import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSessionStore } from '../../store/useSessionStore'
import { WeeklySession } from '../../types'
import { strings } from '../../utils/strings'
import Confetti from '../ui/Confetti'

interface Props {
  session: WeeklySession
  onComplete: (updates: Partial<WeeklySession>) => void
  onBack: () => void
  onPause: () => void
}

export default function SessionStep7({ session, onComplete, onBack, onPause }: Props) {
  const [gratitude, setGratitude] = useState(session.gratitudeNote)
  const [celebrating, setCelebrating] = useState(false)
  const { updateSession } = useSessionStore()
  const s = strings.step7

  function save(gratitudeNote: string) {
    updateSession(session.id, { gratitudeNote })
  }

  function handleFinish() {
    setCelebrating(true)
    setTimeout(() => {
      onComplete({ gratitudeNote: gratitude })
    }, 2000)
  }

  return (
    <>
      {celebrating && <Confetti />}
      <motion.div
        key="step-7"
        className="space-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3 }}
      >
        {celebrating ? (
          <motion.div
            className="card text-center space-y-4 py-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-6xl">🏆</p>
            <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.celebration}</h2>
          </motion.div>
        ) : (
          <>
            <div className="card text-center space-y-2">
              <p className="text-3xl">🙏</p>
              <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.header}</h2>
            </div>

            <div className="card">
              <label className="block text-sm font-medium text-[#3D2C2C] mb-2 sr-only">
                {s.gratitudePlaceholder}
              </label>
              <textarea
                className="textarea-field h-28"
                placeholder={s.gratitudePlaceholder}
                value={gratitude}
                aria-label={s.gratitudePlaceholder}
                onChange={(e) => {
                  setGratitude(e.target.value)
                  save(e.target.value)
                }}
              />
            </div>

            <div className="card-sticky">
              <p className="text-sm text-amber-800 leading-relaxed">{s.nextWeekReminder}</p>
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={handleFinish}
                className="btn-primary w-full text-base"
                whileTap={{ scale: 0.97 }}
              >
                {s.finishButton}
              </motion.button>
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
          </>
        )}
      </motion.div>
    </>
  )
}
