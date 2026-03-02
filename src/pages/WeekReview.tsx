import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { WeekReview as WeekReviewType } from '../types'
import { strings } from '../utils/strings'

const FEELING_EMOJIS = ['😟', '😕', '😐', '🙂', '😊']

export default function WeekReview() {
  const navigate = useNavigate()
  const { settings } = useSettingsStore()
  const { getCurrentWeekSession, updateSession, createNewSession } = useSessionStore()
  const session = getCurrentWeekSession()

  const existing = session?.weekReview

  const [p1Reflection, setP1Reflection] = useState(existing?.partner1Reflection ?? '')
  const [p2Reflection, setP2Reflection] = useState(existing?.partner2Reflection ?? '')
  const [whatWorked, setWhatWorked] = useState(existing?.whatWorked ?? '')
  const [whatToImprove, setWhatToImprove] = useState(existing?.whatToImprove ?? '')
  const [surprises, setSurprises] = useState(existing?.surprises ?? '')
  const [overallFeeling, setOverallFeeling] = useState(existing?.overallFeeling ?? 3)
  const [done, setDone] = useState(false)

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
    setDone(true)
  }

  function handleNewSession() {
    createNewSession()
    navigate('/session')
  }

  // After save: show "ready for next week" screen
  if (done) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <motion.div
          className="max-w-md w-full card text-center space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="text-5xl">💪</p>
          <div>
            <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">
              {s.readyForNextWeek}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">{strings.step7.nextWeekReminder}</p>
          </div>
          <button onClick={handleNewSession} className="btn-primary w-full">
            {s.startNewSession}
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary w-full">
            {strings.common.back}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 pb-12" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-6 space-y-5">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading font-bold text-3xl text-[#3D2C2C]">{s.header}</h1>
          <p className="text-gray-500 mt-1">{s.subtitle}</p>
        </motion.div>

        {/* Read-only intentions */}
        <motion.div
          className="card-sticky"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <h2 className="font-heading font-semibold text-base text-[#3D2C2C] mb-3">
            {s.intentionsThisWeek} 📌
          </h2>
          <div className="space-y-4">
            <ReadOnlyIntentions
              name={settings.partner1Name}
              intentions={session.partner1Intentions}
            />
            <div className="border-t border-yellow-200" />
            <ReadOnlyIntentions
              name={settings.partner2Name}
              intentions={session.partner2Intentions}
            />
          </div>
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
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">{s.whatWorked}</label>
            <textarea
              className="textarea-field h-20"
              placeholder={s.whatWorkedPlaceholder}
              value={whatWorked}
              onChange={(e) => setWhatWorked(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">{s.whatToImprove}</label>
            <textarea
              className="textarea-field h-20"
              placeholder={s.whatToImprovePlaceholder}
              value={whatToImprove}
              onChange={(e) => setWhatToImprove(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">{s.surprises}</label>
            <textarea
              className="textarea-field h-20"
              placeholder={s.surprisesPlaceholder}
              value={surprises}
              onChange={(e) => setSurprises(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Emoji overall feeling */}
        <motion.div
          className="card space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium text-[#3D2C2C] text-center">{s.overallFeeling}</p>
          <div className="flex gap-2 justify-center">
            {FEELING_EMOJIS.map((emoji, i) => {
              const val = i + 1
              return (
                <button
                  key={val}
                  onClick={() => setOverallFeeling(val)}
                  className={`text-2xl w-12 h-12 rounded-full transition-all duration-200 ${
                    overallFeeling === val
                      ? 'bg-amber-100 scale-125 shadow-md ring-2 ring-[#C4704B]'
                      : 'hover:bg-amber-50 hover:scale-110'
                  }`}
                  title={String(val)}
                >
                  {emoji}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Actions */}
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

function ReadOnlyIntentions({
  name,
  intentions,
}: {
  name: string
  intentions: { personal: string; professional: string; couple: string; family: string }
}) {
  const items = [
    { label: strings.step2.personal, value: intentions.personal },
    { label: strings.step2.professional, value: intentions.professional },
    { label: strings.step2.coupleLabel, value: intentions.couple },
    { label: strings.step2.family, value: intentions.family },
  ].filter((i) => i.value.trim())

  return (
    <div>
      <p className="text-xs font-semibold text-[#C4704B] mb-1.5">{name}</p>
      {items.length === 0 ? (
        <p className="text-xs text-gray-400 italic">לא נרשמו כוונות</p>
      ) : (
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.label} className="flex gap-2 text-xs text-[#3D2C2C]">
              <span className="text-gray-400 flex-shrink-0">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
