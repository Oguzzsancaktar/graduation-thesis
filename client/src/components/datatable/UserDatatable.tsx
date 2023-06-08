import React, { useEffect, useState } from 'react'
// Components.
import { Avatar, UserCreateOrUpdateModal, UserSettingsModal } from '@/components'
// Services.
import { getUsers } from '@/services'
// Models.
import { IUser } from '@/models'
// Libs.
import { map } from 'lodash'
// Utils.
import { getFullName } from '@/utils'
// Constants.
import { EUserRole, EUserStatus } from '@/constants'
// Context.
import { useModalApiContext } from '@/context'
const UserDatatable = () => {
  const { openModal } = useModalApiContext()

  const handleBackClick = () => {
    openModal({
      title: "User Settings",
      content: <UserSettingsModal />,
    })
  }

  const handleUpdateUserClick = (user: IUser) => {
    openModal({
      title: (<>
        <button onClick={handleBackClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        {'Update ' + getFullName(user)}
      </>),
      content: <UserCreateOrUpdateModal user={user} />,
    })
  }
  const [usersData, setUsersData] = useState<IUser[]>([])


  useEffect(() => {
    async function fetch() {
      const users = await getUsers()
      if (users) {
        setUsersData(users)
      }
    }
    fetch()
  }, [])
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Full Name
          </th>
          <th scope="col" className="px-6 py-3">
            Role
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
        {map(usersData, (user) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div className='h-9 w-9'>
                <Avatar fullName={getFullName(user)} />
              </div>

              <div className="pl-3">
                <div className="text-base font-semibold">{getFullName(user)}</div>
                <div className="font-normal text-gray-500">{user.email}</div>
              </div>
            </th>
            <td className="px-6 py-4">
              {EUserRole[user.role]}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className={"h-2.5 w-2.5 rounded-full mr-2 " + (user.status === EUserStatus.ACTIVE ? "bg-green-500" : "bg-red-500")}></div> {EUserStatus[user.status]}
              </div>
            </td>
            <td className="px-6 py-4">
              <button onClick={() => handleUpdateUserClick(user)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserDatatable
