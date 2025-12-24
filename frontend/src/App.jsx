import { useEffect } from 'react'
import './index.css'
import { getUser, getUserChannelProfile, userLogin, userLogout } from './api/user.api.js'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'

function App() {

  return (
    <>
      <Header />
      <Login />
    </>
  )
}

export default App
