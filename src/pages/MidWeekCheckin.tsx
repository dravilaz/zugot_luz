import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { MidWeekCheckin as MidWeekCheckinType } from '../types'
import { strings } from '../utils/strings'

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export default function MidWeekCheckin() {
  const navigate = useNavigate()
  const { settings } = useSettingsStore()
  const { getCurrentWeekSession, updateSession } = useSessionStore()
  const session = getCurrentWeekSession()

  const latest = session?.midWeekCheckins[session.midWeekCheckins.length - 1]

  const [p1Update, setP1Update] = useState(latest?.partner1Update ?? '')
  const [p2Update, setP2Update] = useState(latest?.partner2Update ?? '')
  const [onTrack, setOnTrack] = useState(latest?.feelingOnTrack ?? 3)
  const [saved, setSaved] = useState(false)

  const s = strings.midweek

  if (!session) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="card text-center space-y-4">
          <p className="text-4xl">🌱</p>
          <p className="text-gray-500">אין שיחה פעילה השבוע</p>
          <button onClick={() => navigate('/')} className="btn-secondary w-full">
            {strings.common.back}
          </button>
        </div>
      </div>
    )
  }

  function handleSave() {
    const checkin: MidWeekCheckinType = {
      id: makeId(),
      date: new Date().toISOString(),
      partner1Update: p1Update,
      partner2Update: p2Update,
      feelingOnTrack: onTrack,
    }
    updateSession(session!.id, {
      midWeekCheckins: [...session!.midWeekCheckins, checkin],
    })
    setSaved(true)
    setTimeout(() => navigate('/'), 1500)
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading font-bold text-3xl text-[#3D2C2C]">{s.header}</h1>
          <p className="text-gray-500 mt-1">{s.subtitle}</p>
        </motion.div>

        <motion.div
          className="card space-y-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.partner1Update} {settings.partner1Name}
            </label>
            <textarea
              className="textarea-field h-24"
              placeholder={s.updatePlaceholder}
              value={p1Update}
              onChange={(e) => setP1Update(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.partner2Update} {settings.partner2Name}
            </label>
            <textarea
              className="textarea-field h-24"
              placeholder={s.updatePlaceholder}
              value={p2Update}
              onChange={(e) => setP2Update(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div
          className="card space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium text-[#3D2C2C]">{s.onTrackLabel}</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setOnTrack(n)}
                className={`w-12 h-12 rounded-full font-bold border-2 transition-all ${
                  onTrack === n
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
          transition={{ delay: 0.3 }}
        >
          {saved ? (
            <div className="text-center py-4">
              <p className="text-[#C4704B] font-medium text-lg">{s.savedMessage}</p>
            </div>
          ) : (
            <button onClick={handleSave} className="btn-primary w-full">
              {s.saveButton}
            </button>
          )}
          <button onClick={() => navigate('/')} className="btn-secondary w-full">
            {strings.common.back}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
