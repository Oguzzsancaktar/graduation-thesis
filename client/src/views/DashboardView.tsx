import React from 'react'
// Components.
import { Avatar, DailyNotifications, GuestSearchbar, IncomingReservationsCard, InformationCard, WeeklyRoomFullnessCard, WelcomeCard } from '@/components'

const DashboardView = () => {
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col mr-5  w-[calc(100%-280px)]">
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

      <div className="flex flex-col h-full w-[280px]">
        <div className='flex flex-row  justify-between items-center mb-5 bg-white border border-gray-200 rounded-lg shadow sm:p-2 dark:bg-gray-800 dark:border-gray-700'>
          <DailyNotifications />
          <div className='w-[36px] h-[36px]'>
            <Avatar />
          </div>
        </div>
        <div className='h-full'>
          <IncomingReservationsCard />
        </div>
      </div>
    </div>
  )
}

export default DashboardView
