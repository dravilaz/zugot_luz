import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { WeekReview as WeekReviewType } from '../types'
import { strings } from '../utils/strings'

export default function WeekReview() {
  const navigate = useNavigate()
  const { settings } = useSettingsStore()
  const { getCurrentWeekSession, updateSession } = useSessionStore()
  const session = getCurrentWeekSession()

  const existing = session?.weekReview

  const [p1Reflection, setP1Reflection] = useState(existing?.partner1Reflection ?? '')
  const [p2Reflection, setP2Reflection] = useState(existing?.partner2Reflection ?? '')
  const [whatWorked, setWhatWorked] = useState(existing?.whatWorked ?? '')
  const [whatToImprove, setWhatToImprove] = useState(existing?.whatToImprove ?? '')
  const [surprises, setSurprises] = useState(existing?.surprises ?? '')
  const [overallFeeling, setOverallFeeling] = useState(existing?.overallFeeling ?? 3)

  const s = strings.review

  if (!session) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="card text-center space-y-4">
          <p className="text-4xl">📋</p>
          <p className="text-gray-500">אין שיחה פעילה השבוע</p>
          <button onClick={() => navigate('/')} className="btn-secondary w-full">
            {strings.common.back}
          </button>
        </div>
      </div>
    )
  }

  function handleFinish() {
    const weekReview: WeekReviewType = {
      completedAt: new Date().toISOString(),
      partner1Reflection: p1Reflection,
      partner2Reflection: p2Reflection,
      whatWorked,
      whatToImprove,
      surprises,
      overallFeeling,
    }
    updateSession(session!.id, { weekReview })
    navigate('/')
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading font-bold text-3xl text-[#3D2C2C]">{s.header}</h1>
          <p className="text-gray-500 mt-1">{s.subtitle}</p>
        </motion.div>

        {/* Reflections */}
        <motion.div
          className="card space-y-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.partner1Reflection} {settings.partner1Name}
            </label>
            <textarea
              className="textarea-field h-24"
              placeholder={s.reflectionPlaceholder}
              value={p1Reflection}
              onChange={(e) => setP1Reflection(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.partner2Reflection} {settings.partner2Name}
            </label>
            <textarea
              className="textarea-field h-24"
              placeholder={s.reflectionPlaceholder}
              value={p2Reflection}
              onChange={(e) => setP2Reflection(e.target.value)}
            />
          </div>
        </motion.div>

        {/* What worked / improve / surprises */}
        <motion.div
          className="card space-y-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.whatWorked}
            </label>
            <textarea
              className="textarea-field h-20"
              placeholder={s.whatWorkedPlaceholder}
              value={whatWorked}
              onChange={(e) => setWhatWorked(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.whatToImprove}
            </label>
            <textarea
              className="textarea-field h-20"
              placeholder={s.whatToImprovePlaceholder}
              value={whatToImprove}
              onChange={(e) => setWhatToImprove(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.surprises}
            </label>
            <textarea
              className="textarea-field h-20"
              placeholder={s.surprisesPlaceholder}
              value={surprises}
              onChange={(e) => setSurprises(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Overall feeling */}
        <motion.div
          className="card space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium text-[#3D2C2C]">{s.overallFeeling}</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setOverallFeeling(n)}
                className={`w-12 h-12 rounded-full font-bold border-2 transition-all ${
                  overallFeeling === n
                    ? 'bg-[#C4704B] text-white border-[#C4704B] scale-110'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#C4704B]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <button onClick={handleFinish} className="btn-primary w-full">
            {s.finishButton}
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary w-full">
            {strings.common.back}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
