import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getUser, getUserChannelProfile, userLogin, userLogout } from './api/user.api.js'

function App() {
  const data = {
    email: "nik@nik.com",
    password: "nikhilsoni"
  }
  useEffect(() => {
    getUser()
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err))
  }, [])

  return (
    <>
      Hello
    </>
  )
}

export default App
