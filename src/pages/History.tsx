import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { WeeklySession } from '../types'
import { strings } from '../utils/strings'
import { formatShortDate } from '../utils/dates'

const s = strings.history

export default function History() {
  const navigate = useNavigate()
  const { getSessionHistory, getStreak, sessions } = useSessionStore()
  const { settings } = useSettingsStore()
  const historySessions = getSessionHistory()
  const streak = getStreak()
  const totalCompleted = sessions.filter((s) => s.completed).length

  return (
    <div className="min-h-screen p-4 pb-12" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-8 space-y-5">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading font-bold text-3xl text-[#3D2C2C]">{s.header}</h1>
          <p className="text-gray-500 mt-1">{s.subtitle}</p>
        </motion.div>

        {/* Stats bar */}
        {(totalCompleted > 0 || streak > 0) && (
          <motion.div
            className="card-sticky flex justify-around text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <p className="font-heading font-bold text-2xl text-[#C4704B]">{totalCompleted}</p>
              <p className="text-xs text-gray-600 mt-1">{s.totalWeeks}</p>
            </div>
            <div className="border-r border-amber-200" />
            <div>
              <p className="font-heading font-bold text-2xl text-[#C4704B]">{streak}</p>
              <p className="text-xs text-gray-600 mt-1">{s.streakLabel}</p>
            </div>
          </motion.div>
        )}

        {/* Session list or empty state */}
        {historySessions.length === 0 ? (
          <motion.div
            className="card text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-4xl mb-4">📚</p>
            <p className="text-gray-500">{s.noHistory}</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {historySessions.map((session, i) => (
              <SessionCard
                key={session.id}
                session={session}
                index={i}
                partner1Name={settings.partner1Name}
                partner2Name={settings.partner2Name}
                onViewSummary={() => navigate(`/summary/${session.id}`)}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full h-12 rounded-full text-[#C4704B] font-medium hover:bg-amber-50 transition-colors"
        >
          {strings.common.back}
        </button>
      </div>
    </div>
  )
}

function SessionCard({
  session,
  index,
  partner1Name,
  partner2Name,
  onViewSummary,
}: {
  session: WeeklySession
  index: number
  partner1Name: string
  partner2Name: string
  onViewSummary: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const s = strings.history

  const weekEndDate = new Date(session.weekStartDate)
  weekEndDate.setDate(weekEndDate.getDate() + 6)

  // First non-empty intention as preview
  const firstIntention =
    session.partner1Intentions.personal ||
    session.partner1Intentions.professional ||
    session.partner1Intentions.couple ||
    session.partner1Intentions.family ||
    session.partner2Intentions.personal ||
    ''

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Card header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#3D2C2C] text-sm">
            {formatShortDate(session.weekStartDate)} — {formatShortDate(weekEndDate.toISOString().split('T')[0])}
          </p>
          <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
            session.completed
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}>
            {session.completed ? s.completedLabel : s.inProgressLabel}
          </span>
          {firstIntention && !expanded && (
            <p className="text-xs text-gray-500 mt-1.5 truncate">{firstIntention}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <button
            onClick={onViewSummary}
            className="text-[#C4704B] text-xs font-medium hover:underline"
          >
            {s.viewSession}
          </button>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-gray-400 text-xs hover:text-[#C4704B] transition-colors"
          >
            {expanded ? s.collapseDetails : s.expandDetails}
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
              <IntentionPreview name={partner1Name} intentions={session.partner1Intentions} />
              <IntentionPreview name={partner2Name} intentions={session.partner2Intentions} />
              {session.datePlan.planned && (
                <p className="text-xs text-gray-500">
                  💕 {strings.step5.types[session.datePlan.type as keyof typeof strings.step5.types]}
                  {session.datePlan.when ? ` — ${session.datePlan.when}` : ''}
                </p>
              )}
              {session.weekReview && (
                <div className="text-xs text-[#7D9B76] font-medium">
                  ✓ {strings.review.finishButton.replace('🎉', '').trim()}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function IntentionPreview({ name, intentions }: { name: string; intentions: { personal: string; professional: string; couple: string; family: string } }) {
  const filled = [
    intentions.personal,
    intentions.professional,
    intentions.couple,
    intentions.family,
  ].filter(Boolean)

  if (filled.length === 0) return null

  return (
    <div>
      <p className="text-xs font-semibold text-[#C4704B] mb-1">{name}</p>
      <ul className="space-y-0.5">
        {filled.map((v, i) => (
          <li key={i} className="text-xs text-[#3D2C2C] truncate">• {v}</li>
        ))}
      </ul>
    </div>
  )
}
