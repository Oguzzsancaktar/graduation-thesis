import React from 'react'
import ReactDOM from 'react-dom/client'
// Router.
import {AppRouter} from '@/router'
// Styles.
import './styles/input.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
