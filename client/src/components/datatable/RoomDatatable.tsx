import React, { useEffect, useState } from 'react'
// Components.
import { Avatar, RoomCreateOrUpdateModal, RoomSettingsModal } from '@/components'
// Services.
import { getRooms } from '@/services'
// Models.
import { IRoom } from '@/models'
// Libs.
import { map } from 'lodash'
// Utils.
// Constants.
import { ERoomStatus } from '@/constants'
// Context.
import { useModalApiContext } from '@/context'
const RoomDatatable = () => {
  const { openModal } = useModalApiContext()

  const handleBackClick = () => {
    openModal({
      title: "Room Settings",
      content: <RoomSettingsModal />,
    })
  }

  const handleUpdateRoomClick = (room: IRoom) => {
    openModal({
      title: (<>
        <button onClick={handleBackClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        {'Update ' + room.name}
      </>),
      content: <RoomCreateOrUpdateModal room={room} />,
    })
  }
  const [roomsData, setRoomsData] = useState<IRoom[]>([])


  useEffect(() => {
    async function fetch() {
      const rooms = await getRooms()
      if (rooms) {
        setRoomsData(rooms)
      }
    }
    fetch()
  }, [])
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Room Name
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {map(roomsData, (room) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div className='h-9 w-9'>
                <Avatar fullName={room.name} />
              </div>

              <div className="pl-3">
                <div className="text-base font-semibold">{room.name}</div>

              </div>
            </th>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className={"h-2.5 w-2.5 rounded-full mr-2 " + (room.status === ERoomStatus.ACTIVE ? "bg-green-500" : "bg-red-500")}></div> {ERoomStatus[room.status]}
              </div>
            </td>
            <td className="px-6 py-4">
              <button onClick={() => handleUpdateRoomClick(room)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit room</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RoomDatatable
