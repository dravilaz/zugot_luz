import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSessionStore } from '../../store/useSessionStore'
import { WeeklySession, TaskItem } from '../../types'
import { strings } from '../../utils/strings'

interface Props {
  session: WeeklySession
  onNext: (updates: Partial<WeeklySession>) => void
  onBack: () => void
  onPause: () => void
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export default function SessionStep6({ session, onNext, onBack, onPause }: Props) {
  const [tasks, setTasks] = useState<TaskItem[]>(session.additionalTasks)
  const { updateSession } = useSessionStore()
  const s = strings.step6

  function save(additionalTasks: TaskItem[]) {
    updateSession(session.id, { additionalTasks })
  }

  function addTask() {
    const next = [...tasks, { id: makeId(), text: '', completed: false }]
    setTasks(next)
    save(next)
  }

  function updateTask(id: string, patch: Partial<TaskItem>) {
    const next = tasks.map((t) => (t.id === id ? { ...t, ...patch } : t))
    setTasks(next)
    save(next)
  }

  function removeTask(id: string) {
    const next = tasks.filter((t) => t.id !== id)
    setTasks(next)
    save(next)
  }

  return (
    <motion.div
      key="step-6"
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card space-y-2 text-center">
        <p className="text-3xl">📝</p>
        <h2 className="font-heading font-bold text-2xl text-[#3D2C2C]">{s.header}</h2>
        <p className="text-gray-500 text-sm">{s.subtitle}</p>
        <p className="text-xs text-[#C4704B]">{s.time}</p>
      </div>

      <div className="card space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateTask(task.id, { completed: !task.completed })}
              className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                task.completed
                  ? 'bg-[#7D9B76] border-[#7D9B76]'
                  : 'border-gray-300 hover:border-[#C4704B]'
              }`}
            >
              {task.completed && (
                <span className="text-white text-xs font-bold leading-none">✓</span>
              )}
            </button>
            <input
              type="text"
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-[#3D2C2C] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C4704B] text-right text-sm"
              placeholder={s.taskPlaceholder}
              value={task.text}
              onChange={(e) => updateTask(task.id, { text: e.target.value })}
            />
            <button
              type="button"
              onClick={() => removeTask(task.id)}
              className="text-red-300 hover:text-red-500 text-xl flex-shrink-0 leading-none"
              aria-label="הסרה"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addTask}
          className="w-full py-3 border-2 border-dashed border-amber-200 rounded-xl text-[#C4704B] text-sm font-medium hover:bg-amber-50 transition-colors"
        >
          {s.addTask}
        </button>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onNext({ additionalTasks: tasks })}
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
