import React from 'react'
import { WeeklyRoomFullnessChart } from '..'

const WeeklyRoomFullnessCard = () => {
  return (
    <div className="w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <WeeklyRoomFullnessChart />
    </div>
  )
}

export default WeeklyRoomFullnessCard
