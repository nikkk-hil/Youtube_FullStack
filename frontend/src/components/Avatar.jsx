import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Avatar() {
    const {user} = useAuth()
  return (
    <div className='text-white'>
        Avatar
        {/* <img src={user.avatar} alt='user-profile-photo' className='w-8' /> */}
    </div>
  )
}
