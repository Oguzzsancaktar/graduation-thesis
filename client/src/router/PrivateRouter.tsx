import { useEffect } from 'react'
import { RouteProps, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout } from '@/components'

const PrivateRouter = ({ children }: RouteProps) => {
  // Hooks.
  const navigate = useNavigate()



  useEffect(() => {
    if (false) {
      navigate('/login')
    }
 
  }, [])

  return <Layout>{children}</Layout>
}

export default PrivateRouter
