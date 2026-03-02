import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { strings } from '../utils/strings'
import { formatHebrewDate, formatShortDate } from '../utils/dates'
import { Intentions } from '../types'

const s = strings.summary

export default function Summary() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { sessions } = useSessionStore()
  const { settings } = useSettingsStore()
  const [copied, setCopied] = useState(false)

  const session = sessions.find((sess) => sess.id === id)

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

  function intentionLines(intentions: Intentions): string[] {
    return [
      intentions.personal ? `🧘 ${intentions.personal}` : '',
      intentions.professional ? `💼 ${intentions.professional}` : '',
      intentions.couple ? `💑 ${intentions.couple}` : '',
      intentions.family ? `👨‍👩‍👧‍👦 ${intentions.family}` : '',
    ].filter(Boolean)
  }

  function buildShareText(): string {
    const sess = session!
    const lines: string[] = [
      `📌 ${s.header}`,
      formatShortDate(sess.weekStartDate),
      '',
      `${settings.partner1Name} — ${s.partner1Intentions}:`,
      ...intentionLines(sess.partner1Intentions),
      '',
      `${settings.partner2Name} — ${s.partner2Intentions}:`,
      ...intentionLines(sess.partner2Intentions),
    ]
    if (sess.datePlan.planned) {
      lines.push('', s.datePlan, strings.step5.types[sess.datePlan.type])
      if (sess.datePlan.when) lines.push(sess.datePlan.when)
    }
    return lines.join('\n')
  }

  async function handleShare() {
    const text = buildShareText()
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: s.header, text })
      } catch {
        // user cancelled — do nothing
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const weekEndDate = new Date(session.weekStartDate)
  weekEndDate.setDate(weekEndDate.getDate() + 6)

  return (
    <div className="min-h-screen p-4 print:p-0" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-8 print:max-w-full print:pt-4">

        {/* Back button */}
        <div className="flex justify-start mb-5 print:hidden">
          <button
            onClick={() => navigate(-1)}
            className="text-[#C4704B] font-medium hover:underline"
          >
            ← {strings.common.back}
          </button>
        </div>

        {/* Fridge note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ transform: 'rotate(-1deg)' }}
          className="relative bg-yellow-50 border-2 border-yellow-200 rounded-2xl shadow-lg p-6 print:transform-none"
        >
          {/* Pin */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl select-none pointer-events-none">
            📌
          </div>

          {/* Header */}
          <div className="text-center mb-5 pt-2">
            <h1 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.header}</h1>
            <p className="text-sm text-gray-600 mt-1">
              {formatShortDate(session.weekStartDate)} — {formatShortDate(weekEndDate.toISOString().split('T')[0])}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {formatHebrewDate(session.weekStartDate)}
            </p>
          </div>

          <div className="border-t border-yellow-200 mb-4" />

          {/* Partner 1 */}
          <div className="mb-4">
            <h2 className="font-heading font-bold text-sm text-[#C4704B] uppercase tracking-wide mb-2">
              {settings.partner1Name} — {s.partner1Intentions}
            </h2>
            <IntentionsList intentions={session.partner1Intentions} />
          </div>

          <div className="border-t border-yellow-100 mb-4" />

          {/* Partner 2 */}
          <div className="mb-4">
            <h2 className="font-heading font-bold text-sm text-[#C4704B] uppercase tracking-wide mb-2">
              {settings.partner2Name} — {s.partner2Intentions}
            </h2>
            <IntentionsList intentions={session.partner2Intentions} />
          </div>

          {/* Date plan */}
          {session.datePlan.planned && (
            <>
              <div className="border-t border-yellow-200 mb-4" />
              <div className="mb-4">
                <h2 className="font-heading font-bold text-sm text-[#C4704B] uppercase tracking-wide mb-2">
                  {s.datePlan}
                </h2>
                <p className="text-[#3D2C2C] font-medium text-sm">
                  {strings.step5.types[session.datePlan.type]}
                </p>
                {session.datePlan.when && (
                  <p className="text-gray-600 text-sm mt-1">📅 {session.datePlan.when}</p>
                )}
                {session.datePlan.notes && (
                  <p className="text-gray-500 text-sm mt-1 italic">{session.datePlan.notes}</p>
                )}
              </div>
            </>
          )}

          {/* Calendar items */}
          {session.calendarItems.length > 0 && (
            <>
              <div className="border-t border-yellow-200 mb-4" />
              <div className="mb-4">
                <h2 className="font-heading font-bold text-sm text-[#C4704B] uppercase tracking-wide mb-2">
                  {s.calendarItems}
                </h2>
                <ul className="space-y-1">
                  {session.calendarItems.map((item) => (
                    <li key={item.id} className="flex items-start gap-2 text-sm text-[#3D2C2C]">
                      <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                      <span className="flex-1">{item.description}</span>
                      {item.assignedTo !== 'both' && (
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          ({item.assignedTo === 'partner1' ? settings.partner1Name : settings.partner2Name})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Tasks */}
          {session.additionalTasks.length > 0 && (
            <>
              <div className="border-t border-yellow-200 mb-4" />
              <div>
                <h2 className="font-heading font-bold text-sm text-[#C4704B] uppercase tracking-wide mb-2">
                  {s.tasks}
                </h2>
                <ul className="space-y-1.5">
                  {session.additionalTasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2 text-sm">
                      <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                        task.completed ? 'bg-[#7D9B76] border-[#7D9B76]' : 'border-gray-400'
                      }`}>
                        {task.completed && <span className="text-white text-xs leading-none">✓</span>}
                      </span>
                      <span className={task.completed ? 'line-through text-gray-400' : 'text-[#3D2C2C]'}>
                        {task.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex gap-3 mt-6 print:hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button onClick={handleShare} className="btn-secondary flex-1">
            {copied ? s.copiedMessage : s.shareButton}
          </button>
          <button onClick={() => window.print()} className="btn-secondary flex-1">
            {s.printButton}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function IntentionsList({ intentions }: { intentions: Intentions }) {
  const items = [
    { label: strings.step2.personal, value: intentions.personal },
    { label: strings.step2.professional, value: intentions.professional },
    { label: strings.step2.coupleLabel, value: intentions.couple },
    { label: strings.step2.family, value: intentions.family },
  ]
  const filled = items.filter((i) => i.value.trim())

  if (filled.length === 0) {
    return <p className="text-gray-400 text-sm italic">אין כוונות שנרשמו</p>
  }

  return (
    <ul className="space-y-2">
      {filled.map((item) => (
        <li key={item.label} className="flex gap-2">
          <span className="text-xs font-medium text-gray-500 flex-shrink-0 mt-0.5 w-24">
            {item.label}
          </span>
          <span className="text-[#3D2C2C] text-sm leading-snug">{item.value}</span>
        </li>
      ))}
    </ul>
  )
}
