import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { WeeklySession } from '../types'
import { strings } from '../utils/strings'
import LastWeekReview from '../components/session/LastWeekReview'
import SessionStep1 from '../components/session/SessionStep1'
import SessionStep2 from '../components/session/SessionStep2'
import SessionStep3 from '../components/session/SessionStep3'
import Checkpoint from '../components/session/Checkpoint'
import SessionStep4 from '../components/session/SessionStep4'
import SessionStep5 from '../components/session/SessionStep5'
import SessionStep6 from '../components/session/SessionStep6'
import SessionStep7 from '../components/session/SessionStep7'

// Step map:
//  0 → LastWeekReview (shows last week's intentions before starting)
//  1 → Step 1: Check-in
//  2 → Step 2: Intentions
//  3 → Step 3: Calendar
//  4 → Checkpoint 1
//  5 → Step 4: Schedule intentions
//  6 → Step 5: Date plan
//  7 → Checkpoint 2
//  8 → Step 6: Tasks
//  9 → Step 7: Closing / finish
const TOTAL_STEPS = 9

export default function Session() {
  const navigate = useNavigate()
  const { settings } = useSettingsStore()
  const { getCurrentWeekSession, getSessionHistory, updateSession } = useSessionStore()

  const session = getCurrentWeekSession()

  if (!session) {
    navigate('/')
    return null
  }

  const lastSession = getSessionHistory()[0] ?? null
  const step = session.currentStep
  const { partner1Name, partner2Name } = settings

  function handleNext(updates: Partial<WeeklySession> = {}) {
    updateSession(session!.id, { ...updates, currentStep: step + 1 })
  }

  function handleBack() {
    if (step > 0) {
      updateSession(session!.id, { currentStep: step - 1 })
    }
  }

  function handlePause() {
    navigate('/')
  }

  function handleComplete(updates: Partial<WeeklySession> = {}) {
    updateSession(session!.id, { ...updates, completed: true })
    navigate('/')
  }

  const progress = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100)
  const showProgress = step > 0 && step <= TOTAL_STEPS

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-6 space-y-4">
        {showProgress && (
          <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C4704B] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <LastWeekReview
              key="step-0"
              lastSession={lastSession}
              partner1Name={partner1Name}
              partner2Name={partner2Name}
              onNext={() => handleNext()}
              onPause={handlePause}
            />
          )}

          {step === 1 && (
            <SessionStep1
              key="step-1"
              session={session}
              partner1Name={partner1Name}
              partner2Name={partner2Name}
              onNext={handleNext}
              onBack={handleBack}
              onPause={handlePause}
            />
          )}

          {step === 2 && (
            <SessionStep2
              key="step-2"
              session={session}
              partner1Name={partner1Name}
              partner2Name={partner2Name}
              onNext={handleNext}
              onBack={handleBack}
              onPause={handlePause}
            />
          )}

          {step === 3 && (
            <SessionStep3
              key="step-3"
              session={session}
              partner1Name={partner1Name}
              partner2Name={partner2Name}
              onNext={handleNext}
              onBack={handleBack}
              onPause={handlePause}
            />
          )}

          {step === 4 && (
            <Checkpoint
              key="checkpoint-1"
              emoji="🎉"
              message={strings.checkpoint1.message}
              subtitle={strings.checkpoint1.subtitle}
              continueBtn={strings.checkpoint1.continueBtn}
              pauseBtn={strings.checkpoint1.pauseBtn}
              onContinue={() => handleNext()}
              onPause={handlePause}
            />
          )}

          {step === 5 && (
            <SessionStep4
              key="step-5"
              session={session}
              partner1Name={partner1Name}
              partner2Name={partner2Name}
              onNext={handleNext}
              onBack={handleBack}
              onPause={handlePause}
            />
          )}

          {step === 6 && (
            <SessionStep5
              key="step-6"
              session={session}
              onNext={handleNext}
              onBack={handleBack}
              onPause={handlePause}
            />
          )}

          {step === 7 && (
            <Checkpoint
              key="checkpoint-2"
              emoji="🌟"
              message={strings.checkpoint2.message}
              subtitle={strings.checkpoint2.subtitle}
              continueBtn={strings.checkpoint2.continueBtn}
              pauseBtn={strings.checkpoint2.pauseBtn}
              onContinue={() => handleNext()}
              onPause={handlePause}
            />
          )}

          {step === 8 && (
            <SessionStep6
              key="step-8"
              session={session}
              onNext={handleNext}
              onBack={handleBack}
              onPause={handlePause}
            />
          )}

          {step >= 9 && (
            <SessionStep7
              key="step-9"
              session={session}
              onComplete={handleComplete}
              onBack={handleBack}
              onPause={handlePause}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
