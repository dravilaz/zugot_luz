import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { strings } from '../utils/strings'
import { formatHebrewDate } from '../utils/dates'

const s = strings.summary

export default function Summary() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { sessions } = useSessionStore()
  const { settings } = useSettingsStore()

  const session = sessions.find((s) => s.id === id)

  if (!session) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="card text-center space-y-4">
          <p className="text-4xl">🚫</p>
          <p className="text-gray-500">השיחה לא נמצאה</p>
          <button onClick={() => navigate('/')} className="btn-secondary">
            {strings.common.back}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 print:p-0" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-8 space-y-6 print:max-w-full print:pt-4">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-4xl mb-2">🚪</p>
          <h1 className="font-heading font-bold text-3xl text-[#3D2C2C]">
            {s.header}
          </h1>
          <p className="text-gray-500 mt-1">{formatHebrewDate(session.weekStartDate)}</p>
        </motion.div>

        {/* Partner 1 intentions */}
        <div className="card-sticky">
          <h2 className="font-heading font-bold text-lg text-[#3D2C2C] mb-3">
            {settings.partner1Name} — {s.partner1Intentions}
          </h2>
          <IntentionsList intentions={session.partner1Intentions} />
        </div>

        {/* Partner 2 intentions */}
        <div className="card-sticky">
          <h2 className="font-heading font-bold text-lg text-[#3D2C2C] mb-3">
            {settings.partner2Name} — {s.partner2Intentions}
          </h2>
          <IntentionsList intentions={session.partner2Intentions} />
        </div>

        {/* Date plan */}
        {session.datePlan.planned && (
          <div className="card border-2 border-pink-200">
            <h2 className="font-heading font-bold text-lg text-[#3D2C2C] mb-2">
              {s.datePlan}
            </h2>
            <p className="text-[#C4704B] font-medium">
              {strings.step5.types[session.datePlan.type]}
            </p>
            {session.datePlan.when && (
              <p className="text-gray-600 text-sm mt-1">{session.datePlan.when}</p>
            )}
            {session.datePlan.notes && (
              <p className="text-gray-500 text-sm mt-1">{session.datePlan.notes}</p>
            )}
          </div>
        )}

        {/* Tasks */}
        {session.additionalTasks.length > 0 && (
          <div className="card">
            <h2 className="font-heading font-bold text-lg text-[#3D2C2C] mb-3">
              {s.tasks}
            </h2>
            <ul className="space-y-2">
              {session.additionalTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${
                    task.completed ? 'bg-[#7D9B76] border-[#7D9B76]' : 'border-gray-300'
                  }`}>
                    {task.completed && <span className="text-white text-xs">✓</span>}
                  </span>
                  <span className={task.completed ? 'line-through text-gray-400' : 'text-[#3D2C2C]'}>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="btn-secondary flex-1"
          >
            {s.printButton}
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex-1"
          >
            {strings.common.back}
          </button>
        </div>
      </div>
    </div>
  )
}

function IntentionsList({ intentions }: { intentions: { personal: string; professional: string; couple: string; family: string } }) {
  const items = [
    { label: strings.step2.personal, value: intentions.personal },
    { label: strings.step2.professional, value: intentions.professional },
    { label: strings.step2.coupleLabel, value: intentions.couple },
    { label: strings.step2.family, value: intentions.family },
  ]

  const filled = items.filter((i) => i.value.trim())

  if (filled.length === 0) {
    return <p className="text-gray-400 text-sm">אין כוונות שנרשמו</p>
  }

  return (
    <ul className="space-y-2">
      {filled.map((item) => (
        <li key={item.label}>
          <span className="text-xs font-medium text-gray-500">{item.label}</span>
          <p className="text-[#3D2C2C]">{item.value}</p>
        </li>
      ))}
    </ul>
  )
}
