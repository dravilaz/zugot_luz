import { motion } from 'framer-motion'
import { WeeklySession, Intentions } from '../../types'
import { strings } from '../../utils/strings'

const s = strings.lastWeekReview

interface Props {
  lastSession: WeeklySession | null
  partner1Name: string
  partner2Name: string
  onNext: () => void
  onPause: () => void
}

export default function LastWeekReview({
  lastSession,
  partner1Name,
  partner2Name,
  onNext,
  onPause,
}: Props) {
  if (!lastSession) {
    return (
      <motion.div
        key="last-week-none"
        className="card text-center space-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
      >
        <p className="text-5xl">🌿</p>
        <div className="space-y-2">
          <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">
            {strings.session.encouragement}
          </h2>
          <p className="text-gray-500 text-sm">{strings.session.sensitiveNote}</p>
        </div>
        <button onClick={onNext} className="btn-primary w-full">
          {s.startButtonNew}
        </button>
      </motion.div>
    )
  }

  const hasReflections = lastSession.weekReview && (
    lastSession.weekReview.whatWorked ||
    lastSession.weekReview.partner1Reflection ||
    lastSession.weekReview.partner2Reflection
  )

  return (
    <motion.div
      key="last-week-review"
      className="space-y-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <div className="card text-center space-y-2">
        <p className="text-4xl">🌿</p>
        <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">
          {strings.session.welcomeBack}
        </h2>
        <p className="text-gray-500 text-sm">{strings.step7.nextWeekReminder}</p>
      </div>

      <div className="card-sticky space-y-3">
        <h3 className="font-heading font-bold text-lg text-[#3D2C2C]">
          {partner1Name} {s.lastWeekSuffix}
        </h3>
        <IntentionsList intentions={lastSession.partner1Intentions} />
      </div>

      <div className="card-sticky space-y-3">
        <h3 className="font-heading font-bold text-lg text-[#3D2C2C]">
          {partner2Name} {s.lastWeekSuffix}
        </h3>
        <IntentionsList intentions={lastSession.partner2Intentions} />
      </div>

      {hasReflections && (
        <div className="card space-y-3">
          <h3 className="font-heading font-semibold text-base text-[#3D2C2C]">
            {s.reflectionsTitle} 💭
          </h3>
          {lastSession.weekReview!.partner1Reflection && (
            <div>
              <p className="text-xs font-medium text-[#C4704B] mb-0.5">{partner1Name}</p>
              <p className="text-sm text-gray-700">{lastSession.weekReview!.partner1Reflection}</p>
            </div>
          )}
          {lastSession.weekReview!.partner2Reflection && (
            <div>
              <p className="text-xs font-medium text-[#C4704B] mb-0.5">{partner2Name}</p>
              <p className="text-sm text-gray-700">{lastSession.weekReview!.partner2Reflection}</p>
            </div>
          )}
          {lastSession.weekReview!.whatWorked && (
            <div>
              <p className="text-xs font-medium text-[#7D9B76] mb-0.5">{strings.review.whatWorked}</p>
              <p className="text-sm text-gray-700">{lastSession.weekReview!.whatWorked}</p>
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        <button onClick={onNext} className="btn-primary w-full">
          {s.startButtonReturning}
        </button>
        <button onClick={onPause} className="btn-secondary w-full">
          {strings.session.pauseButton}
        </button>
      </div>
    </motion.div>
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
    return <p className="text-gray-400 text-sm">{s.noIntentions}</p>
  }

  return (
    <ul className="space-y-2">
      {filled.map((item) => (
        <li key={item.label}>
          <span className="text-xs font-medium text-gray-500">{item.label}</span>
          <p className="text-[#3D2C2C] text-sm">{item.value}</p>
        </li>
      ))}
    </ul>
  )
}
