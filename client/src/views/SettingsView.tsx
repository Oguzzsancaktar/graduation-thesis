import React from 'react'
// Components.
import { RoomSettingsModal, SettingsCard, UserSettingsModal } from '@/components'
import { IModal } from '@/context'


const SettingsView = () => {
  const userSettingsModal: IModal = {
    title: 'User Settings',
    content: <UserSettingsModal />,
  }

  const roomSettingsModal: IModal = {
    title: 'Room Settings',
    content: <RoomSettingsModal />,
  }

  return (
    <div className="w-full h-full flex gap-5">
      <SettingsCard title='User Settings' description='You can setup your user.' modal={userSettingsModal} />
      <SettingsCard title='Room Settings' description='You can setup your rooms here.' modal={roomSettingsModal} />
    </div>
  )
}

export default SettingsView
