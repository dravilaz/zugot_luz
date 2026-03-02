import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSessionStore } from '../../store/useSessionStore'
import { WeeklySession, DatePlan } from '../../types'
import { strings } from '../../utils/strings'

interface Props {
  session: WeeklySession
  onNext: (updates: Partial<WeeklySession>) => void
  onBack: () => void
  onPause: () => void
}

type DateType = DatePlan['type']

const DATE_TYPES: Array<{ type: DateType; label: string }> = [
  { type: 'outing', label: strings.step5.types.outing },
  { type: 'intimate', label: strings.step5.types.intimate },
  { type: 'coffee', label: strings.step5.types.coffee },
  { type: 'phone', label: strings.step5.types.phone },
  { type: 'other', label: strings.step5.types.other },
]

export default function SessionStep5({ session, onNext, onBack, onPause }: Props) {
  const [planned, setPlanned] = useState(session.datePlan.planned)
  const [when, setWhen] = useState(session.datePlan.when)
  const [type, setType] = useState<DateType>(session.datePlan.type)
  const [notes, setNotes] = useState(session.datePlan.notes)
  const { updateSession } = useSessionStore()
  const s = strings.step5

  function save(datePlan: DatePlan) {
    updateSession(session.id, { datePlan })
  }

  function getDatePlan(): DatePlan {
    return { planned, when, type, notes }
  }

  function togglePlanned(val: boolean) {
    setPlanned(val)
    save({ planned: val, when, type, notes })
  }

  return (
    <motion.div
      key="step-5"
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card space-y-2 text-center">
        <p className="text-3xl">💕</p>
        <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.header}</h2>
        <p className="text-gray-500 text-sm">{s.subtitle}</p>
        <p className="text-xs text-[#C4704B]">{s.time}</p>
      </div>

      <div className="card space-y-4">
        <div className="flex gap-3">
          <button
            onClick={() => togglePlanned(true)}
            className={`flex-1 h-12 rounded-full font-medium border-2 transition-all ${
              planned
                ? 'bg-[#C4704B] text-white border-[#C4704B]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#C4704B]'
            }`}
          >
            {s.plannedYes}
          </button>
          <button
            onClick={() => togglePlanned(false)}
            className={`flex-1 h-12 rounded-full font-medium border-2 transition-all ${
              !planned
                ? 'bg-[#C4704B] text-white border-[#C4704B]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#C4704B]'
            }`}
          >
            {s.plannedNo}
          </button>
        </div>

        <AnimatePresence>
          {planned && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div>
                <p className="text-sm font-medium text-[#3D2C2C] mb-2">{s.dateTypeLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {DATE_TYPES.map((dt) => (
                    <button
                      key={dt.type}
                      type="button"
                      onClick={() => {
                        setType(dt.type)
                        save({ planned, when, type: dt.type, notes })
                      }}
                      className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                        type === dt.type
                          ? 'bg-[#C4704B] text-white border-[#C4704B]'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[#C4704B]'
                      }`}
                    >
                      {dt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#3D2C2C] mb-1">
                  {s.whenLabel}
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder={s.whenPlaceholder}
                  value={when}
                  onChange={(e) => {
                    setWhen(e.target.value)
                    save({ planned, when: e.target.value, type, notes })
                  }}
                />
              </div>

              <textarea
                className="textarea-field h-16"
                placeholder={s.notesPlaceholder}
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value)
                  save({ planned, when, type, notes: e.target.value })
                }}
              />

              <p className="text-center text-sm text-[#C4704B] font-medium">{s.sweet}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-3">
        <button onClick={() => onNext({ datePlan: getDatePlan() })} className="btn-primary w-full">
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
