import React from 'react'
import profilePic from '@/assets/images/profile-picture/profile-picture-1.jpeg'
import { getFirstLetters } from '@/utils'

interface IProps {
  fullName: string
}
const Avatar: React.FC<IProps> = ({ fullName }) => {
  return (
    <>
      {
        false ? (
          <img className="w-full h-full rounded-full" src={profilePic} alt={fullName} />
        ) : (
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{getFirstLetters(fullName)}</span>
          </div >
        )
      }
    </>
  )
}

export default Avatar
