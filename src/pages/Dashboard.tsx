import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../store/useSettingsStore'
import { useSessionStore } from '../store/useSessionStore'
import { strings } from '../utils/strings'
import { formatShortDate } from '../utils/dates'

const s = strings.dashboard

export default function Dashboard() {
  const navigate = useNavigate()
  const { settings } = useSettingsStore()
  const { getCurrentWeekSession, getStreak, createNewSession, sessions } = useSessionStore()

  const currentSession = getCurrentWeekSession()
  const streak = getStreak()
  const totalCompleted = sessions.filter((sess) => sess.completed).length

  function handleStartSession() {
    if (!currentSession) {
      createNewSession()
    }
    navigate('/session')
  }

  const hasIntentions =
    currentSession &&
    (currentSession.partner1Intentions.personal ||
      currentSession.partner1Intentions.professional ||
      currentSession.partner1Intentions.couple ||
      currentSession.partner1Intentions.family ||
      currentSession.partner2Intentions.personal ||
      currentSession.partner2Intentions.professional ||
      currentSession.partner2Intentions.couple ||
      currentSession.partner2Intentions.family)

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-8 space-y-5">

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-heading font-bold text-3xl text-[#3D2C2C] mb-1">
            {s.greeting(settings.partner1Name, settings.partner2Name)}
          </h1>
          {streak > 0 && (
            <p className="text-[#C4704B] font-medium">{s.streakLabel(streak)}</p>
          )}
        </motion.div>

        {/* Week status card */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {currentSession ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {formatShortDate(currentSession.weekStartDate)}
                </span>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  currentSession.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {currentSession.completed ? s.weekCompleted : s.weekStarted}
                </span>
              </div>
              <p className="text-[#3D2C2C] font-medium mt-1">
                {currentSession.completed
                  ? strings.step7.celebration
                  : strings.session.welcomeBack}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">{s.noSessionYet}</p>
          )}
        </motion.div>

        {/* Sticky note with current intentions */}
        {hasIntentions && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            style={{ transform: 'rotate(1deg)' }}
            className="relative bg-yellow-100 rounded-2xl shadow-md p-5"
          >
            {/* Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl select-none pointer-events-none">
              📌
            </div>
            <div className="flex items-center justify-between mb-3 pt-1">
              <h2 className="font-heading font-semibold text-sm text-[#3D2C2C]">
                {s.intentionsThisWeek}
              </h2>
              <button
                onClick={() => navigate(`/summary/${currentSession!.id}`)}
                className="text-xs text-[#C4704B] font-medium hover:underline"
              >
                {s.summaryLink}
              </button>
            </div>
            <div className="space-y-3">
              <IntentionMini
                name={settings.partner1Name}
                intentions={currentSession!.partner1Intentions}
              />
              {(currentSession!.partner2Intentions.personal ||
                currentSession!.partner2Intentions.professional ||
                currentSession!.partner2Intentions.couple ||
                currentSession!.partner2Intentions.family) && (
                <>
                  <div className="border-t border-yellow-200" />
                  <IntentionMini
                    name={settings.partner2Name}
                    intentions={currentSession!.partner2Intentions}
                  />
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Primary action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {!currentSession?.completed && (
            <button onClick={handleStartSession} className="btn-primary w-full text-base">
              {currentSession ? s.continueSession : s.newSession}
            </button>
          )}
        </motion.div>

        {/* Secondary actions */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {/* Mid-week checkin: available once session is started */}
          {currentSession && !currentSession.completed && (
            <button
              onClick={() => navigate('/checkin')}
              className="btn-secondary w-full text-base"
            >
              {s.midWeekCheckin}
            </button>
          )}

          {/* Week review: available after session is completed */}
          {currentSession?.completed && (
            <button
              onClick={() => navigate('/review')}
              className="btn-secondary w-full text-base"
            >
              {s.weekReview}
            </button>
          )}

          <button
            onClick={() => navigate('/history')}
            className="w-full h-12 rounded-full text-[#C4704B] font-medium text-base hover:bg-amber-50 transition-colors duration-200"
          >
            {s.history}
          </button>
        </motion.div>

        {/* Stats row */}
        {(streak > 0 || totalCompleted > 0) && (
          <motion.div
            className="card-sticky flex justify-around text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <p className="font-heading font-bold text-2xl text-[#C4704B]">{streak}</p>
              <p className="text-xs text-gray-600 mt-1">{s.streakWeeks}</p>
            </div>
            <div className="border-r border-amber-200" />
            <div>
              <p className="font-heading font-bold text-2xl text-[#C4704B]">{totalCompleted}</p>
              <p className="text-xs text-gray-600 mt-1">{s.sessionsCompleted}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function IntentionMini({
  name,
  intentions,
}: {
  name: string
  intentions: { personal: string; professional: string; couple: string; family: string }
}) {
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
