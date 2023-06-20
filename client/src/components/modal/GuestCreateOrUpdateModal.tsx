import React, { useEffect, useState } from 'react'
// Models.
import { IGuest } from '@/models'
// Constants.
import { EGuestStatus } from '@/constants'
// Libs.
import { map } from 'lodash'
// Services.
import { createGuest, updateGuest } from '@/services'
// Context.
import { useModalApiContext } from '@/context'
import { toastSuccess } from '@/utils'

interface IProps {
  guest?: IGuest
  onClose?: () => void
}

const GuestCreateOrUpdateModal: React.FC<IProps> = ({ guest, onClose }) => {
  const { closeModal } = useModalApiContext()
  const [guestDTO, setGuestDTO] = useState<IGuest>({
    _id: undefined,
    name: '',
    surname: '',
    email: '',
    phone: '',
    passwordNo: '',
    status: EGuestStatus.ACTIVE,
  })


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    if (name === 'role' || name === 'status') {
      setGuestDTO({ ...guestDTO, [name]: parseInt(value) })
      return
    }

    setGuestDTO({ ...guestDTO, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (guest?._id) {
        await updateGuest(guestDTO)
      } else {
        await createGuest(guestDTO)
      }
      toastSuccess('Guest saved successfully')
      closeModal()
      if (onClose) onClose()
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (guest) {
      setGuestDTO(guest)
    }
  }, [guest])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-between h-full' autoComplete='off'>
      <input autoComplete="false" name="hidden" type="text" className='hidden' ></input>
      <div className="">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input onChange={handleInputChange} value={guestDTO.name} autoComplete={"false"} type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input onChange={handleInputChange} value={guestDTO.surname} autoComplete={"false"} type="text" name="surname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="surname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input onChange={handleInputChange} value={guestDTO.email} autoComplete={"false"} type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input onChange={handleInputChange} value={guestDTO.phone} autoComplete={"false"} type="phone" name="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
          </div>
        </div>


        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input onChange={handleInputChange} value={guestDTO.passwordNo} autoComplete={"false"} type="text" name="passwordNo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="passwordNo" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passport No</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Guest Status</label>
            <select value={guestDTO.status} onChange={handleInputChange} name='status' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {map(EGuestStatus, (status, key) => {
                if (isNaN(Number(status))) {
                  return (
                    <option key={key} value={EGuestStatus[status]}>{status}</option>
                  )
                }
              })}
            </select>
          </div>
        </div>
      </div>
      <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  )
}

export default GuestCreateOrUpdateModal
