import React from 'react'
// Components.
import { Avatar, GuestSearchbar, IncomingReservationsCard, InformationCard, ReservationModal, WeeklyRoomFullnessCard, WelcomeCard } from '@/components'
import { useAuthenticationStateContext, useModalApiContext } from '@/context'
import { getFullName } from '@/utils'

const DashboardView = () => {
  const { loggedUser } = useAuthenticationStateContext()
  const { openModal } = useModalApiContext()

  const openReservationModal = () => {
    openModal({
      title: "New Reservation",
      content: <ReservationModal />,
    })
  }
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
              <InformationCard />
            </div>
            <div>
              <InformationCard />
            </div>
            <div>
              <InformationCard />
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
