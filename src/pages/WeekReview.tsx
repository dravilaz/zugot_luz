import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { strings } from '../utils/strings'

export default function WeekReview() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          className="card text-center space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-4xl">📋</p>
          <h1 className="font-heading font-bold text-2xl text-[#3D2C2C]">
            {strings.review.header}
          </h1>
          <p className="text-gray-500">{strings.review.subtitle}</p>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary w-full"
          >
            {strings.common.back}
          </button>
        </motion.div>
      </div>
    </div>
  )
}
