import { motion } from 'framer-motion'

interface CheckpointProps {
  emoji?: string
  message: string
  subtitle: string
  continueBtn: string
  pauseBtn: string
  onContinue: () => void
  onPause: () => void
}

export default function Checkpoint({
  emoji = '✨',
  message,
  subtitle,
  continueBtn,
  pauseBtn,
  onContinue,
  onPause,
}: CheckpointProps) {
  return (
    <motion.div
      key="checkpoint"
      className="card text-center space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-5xl">{emoji}</p>
      <div className="space-y-2">
        <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{message}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="space-y-3">
        <button onClick={onContinue} className="btn-primary w-full">
          {continueBtn}
        </button>
        <button onClick={onPause} className="btn-secondary w-full">
          {pauseBtn}
        </button>
      </div>
    </motion.div>
  )
}
