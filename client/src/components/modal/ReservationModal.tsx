import React, { useEffect, useState } from 'react'
// Context.
import { useModalApiContext } from '@/context'
// Models.
import { IGuest, IReservationDTO, IRoom } from '@/models'
// Utils.
import { getFullName, toastSuccess } from '@/utils'
// Services.
import { createReservation, getAvailableRooms, getGuests } from '@/services'
// Libs.

import { map } from 'lodash'
import { GuestCreateOrUpdateModal, Rangepicker } from '..'
import moment from 'moment'

const ReservationModal = () => {
  // Hooks.
  const { closeModal, openModal } = useModalApiContext()
  // States.
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [guests, setGuests] = useState<IGuest[]>([])

  const [reservationDTO, setReservationDTO] = useState<IReservationDTO>({
    room: '',
    guest: '',
    endDate: new Date(),
    startDate: new Date(),
    price: 0,
    checkIn: false
  })

  const openReservationModal = () => {
    openModal({
      title: 'New Reservation',
      content: <ReservationModal />
    })
  }
  const modalHeader = () => {
    return (
      <div>
        <p onClick={() => openReservationModal()} className="text-sm text-gray-500 dark:text-gray-400">Please fill the form to create new guest.</p>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Create New Guest</h2>
      </div>
    )
  }

  const handleCreateNewGuest = () => {
    openModal({
      title: modalHeader(),
      content: <GuestCreateOrUpdateModal onClose={openReservationModal} />
    })
  }

  const handleDateChange = (date: Date, type: 'start' | 'end') => {
    if (type === 'start') {
      setReservationDTO({ ...reservationDTO, startDate: date })
      return
    }

    setReservationDTO({ ...reservationDTO, endDate: date })
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    if (name === 'role' || name === 'status') {
      setReservationDTO({ ...reservationDTO, [name]: parseInt(value) })
      return
    }

    setReservationDTO({ ...reservationDTO, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await createReservation(reservationDTO)
      toastSuccess('Reservation saved successfully')
      closeModal()
      window.location.reload()
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {


    const fetchGuests = async () => {
      try {
        const guestsData = await getGuests()
        setGuests(guestsData)
      } catch (error) {
        console.log(error);
      }
    }

    fetchGuests()

  }, [])


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getAvailableRooms({ startDate: moment(reservationDTO.startDate).add(1, "days").toDate(), endDate: moment(reservationDTO.endDate).add(1, "days").toDate() })
        setRooms(roomsData)
      } catch (error) {
        console.log(error);
      }
    }
    fetchRooms()
  }, [reservationDTO.endDate, reservationDTO.startDate])


  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-between h-full' autoComplete='off'>
      <input autoComplete="false" name="hidden" type="text" className='hidden' ></input>
      <div className="">
        <div className='mb-4'>
          <Rangepicker onChange={handleDateChange} />
        </div>


        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="guest" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Guest </label>
            <select value={reservationDTO.guest} onChange={handleInputChange} name='guest' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected value={""}>Select Guest</option>

              {map(guests, (guest, key) => {
                return (
                  <option key={key} value={guest._id}>{getFullName(guest)}</option>
                )
              })}
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <button onClick={handleCreateNewGuest} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-7 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create New Guest</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                TL
              </span>
              <input onChange={handleInputChange} type="number" name='price' className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" />
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="room" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room</label>
            <select value={reservationDTO.room} onChange={handleInputChange} name='room' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

              <option selected value={""}>Select Room</option>

              {map(rooms, (room, key) => {
                return (
                  <option key={key} value={room._id}>{room.name}</option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  )
}

export default ReservationModal
