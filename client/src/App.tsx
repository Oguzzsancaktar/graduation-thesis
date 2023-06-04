import React, { Suspense } from 'react'

import { Layout } from './components'
import { DashboardView, LoginView } from '@/views'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRouter } from './router'

function App() {
  return (
  <>
    <Suspense fallback={<div>Loading...</div>}>
   
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <DashboardView />
              </PrivateRouter>
            }
          />
          <Route path="/*" element={<Navigate replace to="/login" />} />
        </Routes>
    </Suspense>
  </>)
}

export default App
