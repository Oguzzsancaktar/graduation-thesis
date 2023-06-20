import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Constants
import { EReservationStatus, appRoutes, momentDateFormat } from '@/constants'
// Components
import { Avatar, ReservationDetailModal } from '..'
// Models
import { IReservation } from '@/models'
// Services
import { getReservations } from '@/services'
import { map } from 'lodash'
import { getFullName } from '@/utils'
import { useModalApiContext } from '@/context'
import moment from 'moment'

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
      const response = await getReservations({ status: EReservationStatus.ACTIVE, checkIn: false })
      setReservations(response)
    }
    fetchReservations()
  }, [])


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


          {reservations.length > 0 ? map(reservations, (reservation, key) => (
            <li className="py-3 sm:py-4" key={key} onClick={() => handleReservationClick(reservation)}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Avatar fullName={getFullName(reservation.guest)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {reservation.room.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                    {moment(reservation.startDate).format(momentDateFormat)} - {moment(reservation.endDate).format(momentDateFormat)}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {reservation.price}TL
                </div>
              </div>
            </li>
          )) : (
            <div className="flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">No incoming reservations.</p>
            </div>
          )}

        </ul>
      </div>
    </div>

  )
}

export default IncomingReservationsCard
