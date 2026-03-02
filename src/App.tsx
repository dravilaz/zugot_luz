import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSettingsStore } from './store/useSettingsStore'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Session from './pages/Session'
import MidWeekCheckin from './pages/MidWeekCheckin'
import WeekReview from './pages/WeekReview'
import History from './pages/History'
import Summary from './pages/Summary'

function RequireSetup({ children }: { children: React.ReactNode }) {
  const { settings } = useSettingsStore()
  if (!settings.setupComplete) {
    return <Navigate to="/onboarding" replace />
  }
  return <>{children}</>
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
        <Route
          path="/"
          element={
            <RequireSetup>
              <PageTransition><Dashboard /></PageTransition>
            </RequireSetup>
          }
        />
        <Route
          path="/session"
          element={
            <RequireSetup>
              <PageTransition><Session /></PageTransition>
            </RequireSetup>
          }
        />
        <Route
          path="/checkin"
          element={
            <RequireSetup>
              <PageTransition><MidWeekCheckin /></PageTransition>
            </RequireSetup>
          }
        />
        <Route
          path="/review"
          element={
            <RequireSetup>
              <PageTransition><WeekReview /></PageTransition>
            </RequireSetup>
          }
        />
        <Route
          path="/history"
          element={
            <RequireSetup>
              <PageTransition><History /></PageTransition>
            </RequireSetup>
          }
        />
        <Route
          path="/summary/:id"
          element={
            <RequireSetup>
              <PageTransition><Summary /></PageTransition>
            </RequireSetup>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
