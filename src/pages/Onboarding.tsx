import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../store/useSettingsStore'
import { strings } from '../utils/strings'

const s = strings.onboarding

export default function Onboarding() {
  const navigate = useNavigate()
  const { settings, updateSettings } = useSettingsStore()
  const [partner1, setPartner1] = useState(settings.partner1Name)
  const [partner2, setPartner2] = useState(settings.partner2Name)
  const [selectedDay, setSelectedDay] = useState(settings.preferredDay)

  const canStart = partner1.trim().length > 0 && partner2.trim().length > 0

  function handleStart() {
    if (!canStart) return
    updateSettings({
      partner1Name: partner1.trim(),
      partner2Name: partner2.trim(),
      preferredDay: selectedDay,
      setupComplete: true,
    })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(160deg, #FDF6EC 0%, #F5E5CE 60%, #EDD5B0 100%)' }}>
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Decorative emojis */}
        <motion.div
          className="text-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <span className="text-5xl" role="img" aria-label="decorative">🌿✨💑</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-heading font-bold text-4xl text-[#3D2C2C] mb-3">
            {s.welcome}
          </h1>
          <p className="text-[#C4704B] text-base leading-relaxed font-light">
            {s.subtitle}
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="card space-y-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {/* Partner 1 name */}
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.partner1Label}
            </label>
            <input
              type="text"
              value={partner1}
              onChange={(e) => setPartner1(e.target.value)}
              placeholder="שם..."
              className="input-field"
            />
          </div>

          {/* Partner 2 name */}
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-2">
              {s.partner2Label}
            </label>
            <input
              type="text"
              value={partner2}
              onChange={(e) => setPartner2(e.target.value)}
              placeholder="שם..."
              className="input-field"
            />
          </div>

          {/* Day selector */}
          <div>
            <label className="block text-sm font-medium text-[#3D2C2C] mb-3">
              {s.dayLabel}
            </label>
            <div className="flex flex-wrap gap-2 justify-end">
              {s.days.map((day, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedDay(idx)}
                  className={`w-11 h-11 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedDay === idx
                      ? 'bg-amber-700 text-white shadow-md scale-110'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            type="button"
            onClick={handleStart}
            disabled={!canStart}
            className="btn-primary w-full text-lg font-semibold"
            whileTap={{ scale: canStart ? 0.97 : 1 }}
          >
            {s.startButton}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
