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
  const { getCurrentWeekSession, getStreak, createNewSession } = useSessionStore()

  const currentSession = getCurrentWeekSession()
  const streak = getStreak()

  function handleStartSession() {
    if (!currentSession) {
      createNewSession()
    }
    navigate('/session')
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-8 space-y-6">

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
            <p className="text-[#C4704B] font-medium">
              {s.streakLabel(streak)}
            </p>
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

        {/* Primary action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {!currentSession?.completed && (
            <button
              onClick={handleStartSession}
              className="btn-primary w-full text-base"
            >
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
          {currentSession && !currentSession.completed && (
            <button
              onClick={() => navigate('/checkin')}
              className="btn-secondary w-full text-base"
            >
              {s.midWeekCheckin}
            </button>
          )}

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
            className="w-full h-12 rounded-full text-[#C4704B] font-medium text-base
                       hover:bg-amber-50 transition-colors duration-200"
          >
            {s.history}
          </button>
        </motion.div>

        {/* Stats row */}
        {streak > 0 && (
          <motion.div
            className="card-sticky flex justify-around text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <p className="font-heading font-bold text-2xl text-[#C4704B]">{streak}</p>
              <p className="text-xs text-gray-600 mt-1">שבועות ברצף</p>
            </div>
            <div className="border-r border-amber-200" />
            <div>
              <p className="font-heading font-bold text-2xl text-[#C4704B]">
                {useSessionStore.getState().sessions.filter(s => s.completed).length}
              </p>
              <p className="text-xs text-gray-600 mt-1">שיחות הושלמו</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
