import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { MidWeekCheckin as MidWeekCheckinType } from '../types'
import { strings } from '../utils/strings'
import { formatShortDate } from '../utils/dates'

const FEELING_EMOJIS = ['😟', '😕', '😐', '🙂', '😊']

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export default function MidWeekCheckin() {
  const navigate = useNavigate()
  const { settings } = useSettingsStore()
  const { getCurrentWeekSession, updateSession } = useSessionStore()
  const session = getCurrentWeekSession()

  const [p1Update, setP1Update] = useState('')
  const [p2Update, setP2Update] = useState('')
  const [onTrack, setOnTrack] = useState(3)
  const [saved, setSaved] = useState(false)
  const [intentionsOpen, setIntentionsOpen] = useState(false)

  const s = strings.midweek

  if (!session) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="card text-center space-y-4">
          <p className="text-4xl">🌱</p>
          <p className="text-gray-500">{strings.midweek.noActiveSession}</p>
          <button onClick={() => navigate('/')} className="btn-secondary w-full">
            {strings.common.back}
          </button>
        </div>
      </div>
    )
  }

  const prevCheckins = session.midWeekCheckins

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
    <div className="min-h-screen p-4 pb-12" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-6 space-y-5">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading font-bold text-3xl text-[#3D2C2C]">{s.header}</h1>
          <p className="text-gray-500 mt-1">{s.subtitle}</p>
        </motion.div>

        {/* Collapsible intention reference */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <button
            onClick={() => setIntentionsOpen((v) => !v)}
            className="w-full flex items-center justify-between card-sticky py-3 px-5 text-right"
          >
            <span className="font-medium text-[#3D2C2C] text-sm">{s.intentionsRef}</span>
            <span className="text-[#C4704B] text-sm font-medium">
              {intentionsOpen ? s.intentionsHide : s.intentionsShow}
            </span>
          </button>

          <AnimatePresence>
            {intentionsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="bg-yellow-50 border border-yellow-200 rounded-b-2xl px-5 pt-3 pb-4 space-y-4">
                  {/* Partner 1 */}
                  <div>
                    <p className="text-xs font-semibold text-[#C4704B] mb-1.5">
                      {settings.partner1Name}
                    </p>
                    <IntentionChips intentions={session.partner1Intentions} />
                  </div>
                  <div className="border-t border-yellow-200" />
                  {/* Partner 2 */}
                  <div>
                    <p className="text-xs font-semibold text-[#C4704B] mb-1.5">
                      {settings.partner2Name}
                    </p>
                    <IntentionChips intentions={session.partner2Intentions} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Update text areas */}
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

        {/* Emoji feeling selector */}
        <motion.div
          className="card space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium text-[#3D2C2C] text-center">{s.onTrackLabel}</p>
          <div className="flex gap-2 justify-center">
            {FEELING_EMOJIS.map((emoji, i) => {
              const val = i + 1
              return (
                <button
                  key={val}
                  onClick={() => setOnTrack(val)}
                  className={`text-2xl w-12 h-12 rounded-full transition-all duration-200 ${
                    onTrack === val
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

        {/* Previous check-ins */}
        {prevCheckins.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="font-heading font-semibold text-base text-[#3D2C2C] mb-3">
              {s.previousCheckins}
            </h2>
            <div className="space-y-3">
              {[...prevCheckins].reverse().map((checkin) => (
                <div key={checkin.id} className="card border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {formatShortDate(checkin.date)}
                    </span>
                    <span className="text-xl" title={`${checkin.feelingOnTrack}/5`}>
                      {FEELING_EMOJIS[checkin.feelingOnTrack - 1]}
                    </span>
                  </div>
                  {checkin.partner1Update && (
                    <div>
                      <p className="text-xs font-medium text-[#C4704B]">{settings.partner1Name}</p>
                      <p className="text-sm text-[#3D2C2C] mt-0.5">{checkin.partner1Update}</p>
                    </div>
                  )}
                  {checkin.partner2Update && (
                    <div>
                      <p className="text-xs font-medium text-[#C4704B]">{settings.partner2Name}</p>
                      <p className="text-sm text-[#3D2C2C] mt-0.5">{checkin.partner2Update}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function IntentionChips({ intentions }: { intentions: { personal: string; professional: string; couple: string; family: string } }) {
  const items = [
    { icon: '🧘', label: strings.step2.personal, value: intentions.personal },
    { icon: '💼', label: strings.step2.professional, value: intentions.professional },
    { icon: '💑', label: strings.step2.coupleLabel, value: intentions.couple },
    { icon: '👨‍👩‍👧‍👦', label: strings.step2.family, value: intentions.family },
  ].filter((i) => i.value.trim())

  if (items.length === 0) {
    return <p className="text-xs text-gray-400 italic">{strings.midweek.noIntentions}</p>
  }

  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.label} className="flex gap-2 text-xs text-[#3D2C2C]">
          <span className="flex-shrink-0">{item.icon}</span>
          <span>{item.value}</span>
        </li>
      ))}
    </ul>
  )
}
