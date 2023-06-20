import React, { useEffect, useMemo, useState } from 'react'
import { IReservation } from '@/models';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts'
import { getReservations } from '@/services';

const WeeklyRoomFullnessChart = () => {
  const [bookedRooms, setBookedRooms] = useState<IReservation[]>([])
  const [checkedInRooms, setCheckedInRooms] = useState<IReservation[]>([])
  const [cancelledRooms, setCancelledRooms] = useState<IReservation[]>([])

  const bookedRoomsCountPerDay = useMemo(() => {
    const today = new Date()
    const nearestMonday = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)))
    const nextSunday = new Date(today.setDate(today.getDate() - today.getDay() + 7))
    const bookedRoomsCountPerDay = [0, 0, 0, 0, 0, 0, 0]
    bookedRooms.forEach((reservation) => {
      const reservationStartDate = new Date(reservation.startDate)
      const reservationEndDate = new Date(reservation.endDate)
      const bookedDayCount = Math.ceil((reservationEndDate.getTime() - reservationStartDate.getTime()) / (1000 * 3600 * 24))
      for (let index = 0; index < bookedDayCount; index++) {
        const day = new Date(reservationStartDate.setDate(reservationStartDate.getDate() + 1))
        if (day >= nearestMonday && day <= nextSunday) {
          bookedRoomsCountPerDay[day.getDay()] += 1
        }
      }
    }
    )
    return bookedRoomsCountPerDay
  }, [bookedRooms])

  const checkedInRoomsCountPerDay = useMemo(() => {
    const today = new Date()
    const nearestMonday = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)))
    const nextSunday = new Date(today.setDate(today.getDate() - today.getDay() + 7))
    const checkedInRoomsCountPerDay = [0, 0, 0, 0, 0, 0, 0]
    checkedInRooms.forEach((reservation) => {
      const reservationStartDate = new Date(reservation.startDate)
      const reservationEndDate = new Date(reservation.endDate)
      const bookedDayCount = Math.ceil((reservationEndDate.getTime() - reservationStartDate.getTime()) / (1000 * 3600 * 24))
      for (let index = 0; index < bookedDayCount; index++) {
        const day = new Date(reservationStartDate.setDate(reservationStartDate.getDate() + 1))
        if (day >= nearestMonday && day <= nextSunday) {
          checkedInRoomsCountPerDay[day.getDay()] += 1
        }
      }
    }
    )
    return checkedInRoomsCountPerDay
  }, [checkedInRooms])

  const cancelledRoomsCountPerDay = useMemo(() => {
    const today = new Date()
    const nearestMonday = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)))
    const nextSunday = new Date(today.setDate(today.getDate() - today.getDay() + 7))
    const cancelledRoomsCountPerDay = [0, 0, 0, 0, 0, 0, 0]
    cancelledRooms.forEach((reservation) => {
      const reservationStartDate = new Date(reservation.startDate)
      const reservationEndDate = new Date(reservation.endDate)
      const bookedDayCount = Math.ceil((reservationEndDate.getTime() - reservationStartDate.getTime()) / (1000 * 3600 * 24))
      for (let index = 0; index < bookedDayCount; index++) {
        const day = new Date(reservationStartDate.setDate(reservationStartDate.getDate() + 1))
        if (day >= nearestMonday && day <= nextSunday) {
          cancelledRoomsCountPerDay[day.getDay()] += 1
        }
      }
    }
    )
    return cancelledRoomsCountPerDay
  }, [cancelledRooms])



  var options: ApexOptions = {
    chart: {
      height: "100%",
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  };

  const series: ApexAxisChartSeries = [{
    name: 'Booked Rooms',
    data: bookedRoomsCountPerDay
  }, {
    name: 'Checked In',
    data: checkedInRoomsCountPerDay
  },
  {
    name: 'Cancelled',
    data: cancelledRoomsCountPerDay
  }]

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const booked = await getReservations({ checkIn: false, status: 0 })
        const checkedIn = await getReservations({ checkIn: true, status: 0 })
        const cancelled = await getReservations({ checkIn: false, status: 1 })

        setBookedRooms(booked)
        setCheckedInRooms(checkedIn)
        setCancelledRooms(cancelled)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBookedRooms()
  }, [])

  return (
    <ReactApexChart options={options} series={series} type='area' height={"100%"} />
  )
}

export default WeeklyRoomFullnessChart
