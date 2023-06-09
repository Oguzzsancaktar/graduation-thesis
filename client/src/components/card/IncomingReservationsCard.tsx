import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Constants
import { appRoutes } from '@/constants'
// Components
import { Avatar, ReservationDetailModal } from '..'
// Models
import { IReservation } from '@/models'
// Services
import { getReservations } from '@/services'
import { map } from 'lodash'
import { getFullName } from '@/utils'
import { useModalApiContext } from '@/context'

const IncomingReservationsCard = () => {
  const { openModal } = useModalApiContext()

  const [reservations, setReservations] = useState<IReservation[]>([] as IReservation[])


  const handleReservationClick = (reservation: IReservation) => {
    openModal({
      title: 'Reservation Detail ' + reservation.room.name,
      content: <ReservationDetailModal reservationId={reservation._id} />
    })
  }


  useEffect(() => {
    const fetchReservations = async () => {
      const response = await getReservations()
      setReservations(response)
    }
    fetchReservations()
  }, [])

  if (!reservations.length) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full h-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Incoming Reservations</h5>
        <Link to={appRoutes.calendar} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </Link>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {map(reservations, (reservation, key) => (
            <li className="py-3 sm:py-4" key={key} onClick={() => handleReservationClick(reservation)}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Avatar fullName={getFullName(reservation.guest)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {getFullName(reservation.guest)}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {reservation.room.name}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {reservation.price}TL
                </div>
              </div>
            </li>
          ))}

        </ul>
      </div>
    </div>

  )
}

export default IncomingReservationsCard
