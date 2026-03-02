import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { strings } from '../utils/strings'
import { formatShortDate } from '../utils/dates'

const s = strings.history

export default function History() {
  const navigate = useNavigate()
  const { getSessionHistory } = useSessionStore()
  const sessions = getSessionHistory()

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading font-bold text-3xl text-[#3D2C2C]">
            {s.header}
          </h1>
          <p className="text-gray-500 mt-1">{s.subtitle}</p>
        </motion.div>

        {sessions.length === 0 ? (
          <motion.div
            className="card text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-4xl mb-4">📖</p>
            <p className="text-gray-500">{s.noHistory}</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session, i) => (
              <motion.div
                key={session.id}
                className="card flex items-center justify-between"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div>
                  <p className="font-medium text-[#3D2C2C]">
                    {s.weekLabel} — {formatShortDate(session.weekStartDate)}
                  </p>
                  <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                    session.completed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {session.completed ? s.completedLabel : s.inProgressLabel}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/summary/${session.id}`)}
                  className="text-[#C4704B] text-sm font-medium hover:underline"
                >
                  {s.viewSession}
                </button>
              </motion.div>
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
