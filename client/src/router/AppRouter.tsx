import React, { useEffect } from 'react'
import App from '../App'
import { BrowserRouter as Router } from 'react-router-dom'

const AppRouter = () => {

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])


  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppRouter
