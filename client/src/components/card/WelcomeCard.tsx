import React, { useEffect } from 'react'
import { useAuthenticationStateContext } from '@/context'
import { getFullName } from '@/utils'
import { IRoom } from '@/models'
import { getAvailableRooms } from '@/services'

const WelcomeCard = () => {
  const { loggedUser } = useAuthenticationStateContext()
  const [availableRooms, setAvailableRooms] = React.useState<any[]>([] as IRoom[])

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      const response = await getAvailableRooms({ endDate: new Date(), startDate: new Date() })
      setAvailableRooms(response)
    }
    fetchAvailableRooms()
  }, [])

  if (!loggedUser) return null
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome {getFullName(loggedUser)} !</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{availableRooms.length > 0 ? "You have " + availableRooms.length + "free room today." : "Well done your hotel is full today "}</p>
    </div>

  )
}

export default WelcomeCard
