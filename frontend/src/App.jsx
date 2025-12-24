import { useEffect } from 'react'
import './index.css'
import { getUser, getUserChannelProfile, userLogin, userLogout } from './api/user.api.js'
import Header from './components/Header.jsx'
import {Login, Signup} from './pages/pageCollection.js'

function App() {

  return (
    <>
      <Header />
      <Signup />
    </>
  )
}

export default App
