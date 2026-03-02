import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/"
          element={
            <RequireSetup>
              <Dashboard />
            </RequireSetup>
          }
        />
        <Route
          path="/session"
          element={
            <RequireSetup>
              <Session />
            </RequireSetup>
          }
        />
        <Route
          path="/checkin"
          element={
            <RequireSetup>
              <MidWeekCheckin />
            </RequireSetup>
          }
        />
        <Route
          path="/review"
          element={
            <RequireSetup>
              <WeekReview />
            </RequireSetup>
          }
        />
        <Route
          path="/history"
          element={
            <RequireSetup>
              <History />
            </RequireSetup>
          }
        />
        <Route
          path="/summary/:id"
          element={
            <RequireSetup>
              <Summary />
            </RequireSetup>
          }
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
