import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const ReservationCalendar = () => {
  return (
    <Calendar

      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
    />
  )
}

export default ReservationCalendar


