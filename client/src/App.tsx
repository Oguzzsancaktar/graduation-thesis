import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// Components.
import { GlobalModal } from '@/components'
// Views.
import { CalendarView, DashboardView, LoginView, SettingsView } from '@/views'
// Routes.
import { PrivateRouter } from '@/router'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer />
        <GlobalModal />
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/calendar"
            element={
              <PrivateRouter>
                <CalendarView />
              </PrivateRouter>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <DashboardView />
              </PrivateRouter>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRouter>
                <SettingsView />
              </PrivateRouter>
            }
          />
          <Route path="/*" element={<Navigate replace to="/login" />} />
        </Routes>
      </Suspense>
    </>)
}

export default App
