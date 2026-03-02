import { useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#C4704B', '#E8A87C', '#7D9B76', '#E8836B', '#FEF3C7', '#F5D76E', '#A8D8EA']
const SHAPES = ['rounded-sm', 'rounded-full', 'rotate-45']

interface Piece {
  id: number
  x: number
  color: string
  shape: string
  size: number
  delay: number
  duration: number
  dx: number
  rotate: number
}

function generatePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.6,
    duration: 1.8 + Math.random() * 1.2,
    dx: (Math.random() - 0.5) * 120,
    rotate: (Math.random() - 0.5) * 720,
  }))
}

export default function Confetti({ count = 60 }: { count?: number }) {
  const [pieces] = useState(() => generatePieces(count))

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className={p.shape}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: -12,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0, x: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 40 : 800,
            opacity: [1, 1, 1, 0],
            rotate: p.rotate,
            x: p.dx,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}
    </div>
  )
}
