import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

function HomeComponent() {
    const {user} = useAuth()
    console.log(user);

    return (
      <div className='h-screen text-3xl text-white'>
          Welcome {user.username}
      </div>
    )
}

export default HomeComponent