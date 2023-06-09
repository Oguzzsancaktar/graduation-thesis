import React from 'react'
// Components.
import { GuestSettingsModal, RoomSettingsModal, SettingsCard, UserSettingsModal } from '@/components'
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


  const guestSettingsModal: IModal = {
    title: 'Guest Settings',
    content: <GuestSettingsModal />,
  }

  return (
    <div className="w-full h-full flex gap-5">
      <SettingsCard title='User Settings' description='You can setup your user.' modal={userSettingsModal} />
      <SettingsCard title='Room Settings' description='You can setup your rooms here.' modal={roomSettingsModal} />
      <SettingsCard title='Guest Settings' description='You can setup your guests here.' modal={guestSettingsModal} />
    </div>
  )
}

export default SettingsView
