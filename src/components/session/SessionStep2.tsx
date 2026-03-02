import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSessionStore } from '../../store/useSessionStore'
import { WeeklySession, Intentions } from '../../types'
import { strings } from '../../utils/strings'

interface Props {
  session: WeeklySession
  partner1Name: string
  partner2Name: string
  onNext: (updates: Partial<WeeklySession>) => void
  onBack: () => void
  onPause: () => void
}

const FIELDS: Array<{ key: keyof Intentions; label: string; placeholder: string }> = [
  {
    key: 'personal',
    label: strings.step2.personal,
    placeholder: strings.step2.personalPlaceholder,
  },
  {
    key: 'professional',
    label: strings.step2.professional,
    placeholder: strings.step2.professionalPlaceholder,
  },
  {
    key: 'couple',
    label: strings.step2.coupleLabel,
    placeholder: strings.step2.couplePlaceholder,
  },
  {
    key: 'family',
    label: strings.step2.family,
    placeholder: strings.step2.familyPlaceholder,
  },
]

function PartnerIntentions({
  name,
  intentions,
  onChange,
}: {
  name: string
  intentions: Intentions
  onChange: (key: keyof Intentions, value: string) => void
}) {
  return (
    <div className="card space-y-4">
      <h3 className="font-heading font-bold text-lg text-[#3D2C2C]">{name}</h3>
      {FIELDS.map((f) => (
        <div key={f.key}>
          <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
          <textarea
            className="textarea-field h-20"
            placeholder={f.placeholder}
            value={intentions[f.key]}
            onChange={(e) => onChange(f.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}

export default function SessionStep2({
  session,
  partner1Name,
  partner2Name,
  onNext,
  onBack,
  onPause,
}: Props) {
  const [p1, setP1] = useState<Intentions>({ ...session.partner1Intentions })
  const [p2, setP2] = useState<Intentions>({ ...session.partner2Intentions })
  const { updateSession } = useSessionStore()
  const s = strings.step2

  function save(p1Intentions: Intentions, p2Intentions: Intentions) {
    updateSession(session.id, {
      partner1Intentions: p1Intentions,
      partner2Intentions: p2Intentions,
    })
  }

  function handleP1Change(key: keyof Intentions, value: string) {
    const next = { ...p1, [key]: value }
    setP1(next)
    save(next, p2)
  }

  function handleP2Change(key: keyof Intentions, value: string) {
    const next = { ...p2, [key]: value }
    setP2(next)
    save(p1, next)
  }

  return (
    <motion.div
      key="step-2"
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card space-y-2 text-center">
        <p className="text-3xl">✨</p>
        <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.header}</h2>
        <p className="text-gray-500 text-sm">{s.subtitle}</p>
        <p className="text-xs text-[#C4704B]">{s.time}</p>
      </div>

      <PartnerIntentions name={partner1Name} intentions={p1} onChange={handleP1Change} />
      <PartnerIntentions name={partner2Name} intentions={p2} onChange={handleP2Change} />

      <div className="space-y-3">
        <button
          onClick={() =>
            onNext({ partner1Intentions: p1, partner2Intentions: p2 })
          }
          className="btn-primary w-full"
        >
          {strings.common.next}
        </button>
        <button onClick={onBack} className="btn-secondary w-full">
          {strings.common.back}
        </button>
        <button
          onClick={onPause}
          className="w-full h-12 text-[#C4704B] font-medium hover:bg-amber-50 rounded-full transition-colors"
        >
          {strings.session.pauseButton}
        </button>
      </div>
    </motion.div>
  )
}
