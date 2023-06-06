import React from 'react'
import profilePic from '@/assets/images/profile-picture/profile-picture-1.jpeg'
const Avatar = () => {
  return (
    <img className="w-full h-full rounded-full" src={profilePic} alt="Rounded avatar" />
  )
}

export default Avatar
