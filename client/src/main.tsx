import React from 'react'
import ReactDOM from 'react-dom/client'
// Context.
import { AuthenticationContextProvider, ModalContextProvider } from '@/context'
// Router.
import { AppRouter } from '@/router'
// Styles.
import '@/styles/input.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthenticationContextProvider>
      <ModalContextProvider>
        <AppRouter />
      </ModalContextProvider>
    </AuthenticationContextProvider>
  </React.StrictMode>
)
