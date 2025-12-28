import React from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../Button.jsx'
import { userLogout } from '../../api/user.api.js'

function Logout() {
    const {setUser} = useAuth()

    const handleLogout = () => {
        userLogout()
         .then( (res) => {console.log(res)} )
         .catch( (err) => {console.error(err)} )
         .finally( () => setUser(null) )    
    }

  return (
    <div>
        <Button className='active:bg-red-700' onClick={() => handleLogout()} >
            Logout
        </Button>
    </div>
  )
}

export default Logout