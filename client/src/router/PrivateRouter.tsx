import { useEffect } from 'react'
import { RouteProps, useNavigate } from 'react-router-dom'
import { Layout } from '@/components'
import { useAuthenticationStateContext } from '@/context/authenticationContext'

const PrivateRouter = ({ children }: RouteProps) => {
  // Hooks.
  const navigate = useNavigate()
  const { loggedUser } = useAuthenticationStateContext()

  useEffect(() => {
    if (!loggedUser) {
      // return navigate('/login')
    }

    // navigate('/dashboard')

  }, [loggedUser])

  return <Layout>{children}</Layout>
}

export default PrivateRouter
