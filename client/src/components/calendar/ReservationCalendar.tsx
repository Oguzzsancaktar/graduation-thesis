import React, { useEffect, useMemo, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { getReservations } from '@/services'
import { IReservation } from '@/models'
import { useModalApiContext } from '@/context'
import { ReservationDetailModal } from '..'
import { EReservationStatus } from '@/constants'

const localizer = momentLocalizer(moment)

const ReservationCalendar = () => {
  const { openModal } = useModalApiContext()

  const [reservations, setReservations] = useState<IReservation[]>([] as IReservation[])

  const eventList = useMemo(() => {
    return reservations.map((reservation) => {
      return {
        id: reservation._id,
        title: reservation.room.name,
        start: new Date(reservation.startDate),
        end: moment(new Date(reservation.endDate)).subtract(1, 'days').toDate(),
      }
    })
  }, [reservations])

  const handleReservationClick = (event: any) => {
    openModal({
      title: 'Reservation Detail ' + event.title,
      content: <ReservationDetailModal reservationId={event.id} />
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
    <Calendar
      onSelectEvent={handleReservationClick}
      localizer={localizer}
      events={eventList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
    />
  )
}

export default ReservationCalendar


