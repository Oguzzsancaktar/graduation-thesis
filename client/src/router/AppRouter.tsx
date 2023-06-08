import React, { useEffect } from 'react'
import App from '../App'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuthenticationApiContext } from '@/context'

const AppRouter = () => {
  const { setUser } = useAuthenticationApiContext()

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }

    const user = localStorage.getItem('user')

    if (user) {
      setUser(JSON.parse(user))
    }


  }, [])


  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppRouter
