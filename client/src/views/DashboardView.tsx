import React, { useEffect, useMemo, useState } from 'react'
// Components.
import { Avatar, GuestSearchbar, IncomingReservationsCard, InformationCard, ReservationModal, WeeklyRoomFullnessCard, WelcomeCard } from '@/components'
import { useAuthenticationStateContext, useModalApiContext } from '@/context'
import { getFullName } from '@/utils'
import { IReservation } from '@/models'
import { getReservations } from '@/services'
import { ERoomStatus } from '@/constants'

const DashboardView = () => {
  const { loggedUser } = useAuthenticationStateContext()
  const { openModal } = useModalApiContext()

  const [currentMonthReservations, setCurrentMonthReservations] = useState<IReservation[]>([] as IReservation[])

  const openReservationModal = () => {
    openModal({
      title: "New Reservation",
      content: <ReservationModal />,
    })
  }

  const totalMonthlyIncome = useMemo(() => {
    return currentMonthReservations.reduce((acc, curr) => acc + curr.price, 0)
  }, [currentMonthReservations])

  const mostReservedRoom = useMemo(() => {
    const rooms = currentMonthReservations.map(reservation => reservation.room)
    const mostReservedRoom = rooms.sort((a, b) =>
      rooms.filter(id => id === a).length - rooms.filter(id => id === b).length
    ).pop()

    return mostReservedRoom
  }, [currentMonthReservations])

  const totalInactivatedRoom = useMemo(() => {
    return currentMonthReservations.reduce((acc, curr) => acc + (curr.room.status === ERoomStatus.INACTIVE ? 1 : 0), 0)
  }, [currentMonthReservations])



  useEffect(() => {
    const fetchReservations = async () => {
      const firstDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      const lastDayOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      const response = await getReservations({ startDate: firstDayOfCurrentMonth, endDate: lastDayOfCurrentMonth, checkIn: true })
      setCurrentMonthReservations(response)
    }

    fetchReservations()
  }, [])

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col mr-5 h-full w-[calc(100%-400px)]">
        <div className='mb-5 h-[58px]'>
          <GuestSearchbar />
        </div>

        <div className="flex flex-col h-full">
          <div >
            <WelcomeCard />
          </div>
          <div className="flex flex-row gap-5 my-5">
            <div>
              <InformationCard title='Total Monthly Income' description={"You earned " + totalMonthlyIncome + "TL"} />
            </div>
            <div>
              <InformationCard title='Best Room' description={'Your most rented room is' + mostReservedRoom?.name} />
            </div>
            <div>
              <InformationCard title='Summarize' description={'Cancelled reservation count: ' + totalInactivatedRoom + ", Total reservation count: " + currentMonthReservations?.length} />
            </div>
          </div>
          <div className='h-full w-full'>
            <WeeklyRoomFullnessCard />
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full w-[400px]">
        <div className='flex flex-row  justify-between items-center mb-5 bg-white border border-gray-200 rounded-lg shadow sm:p-2 dark:bg-gray-800 dark:border-gray-700'>
          <div className='w-[36px] h-[36px]'>
            <Avatar fullName={loggedUser !== null ? getFullName(loggedUser) : ""} />
          </div>

          <button onClick={openReservationModal} type="button" className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            <span >New Reservation</span>
          </button>
        </div>
        <div className='h-full'>
          <IncomingReservationsCard />
        </div>
      </div>
    </div>
  )
}

export default DashboardView
