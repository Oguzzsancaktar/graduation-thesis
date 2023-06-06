import React from 'react'
import ReactDOM from 'react-dom/client'
// Context.
import { AuthenticationContextProvider } from '@/context'
// Router.
import { AppRouter } from '@/router'
// Styles.
import '@/styles/input.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <AppRouter />
    </AuthenticationContextProvider>
  </React.StrictMode>
)
