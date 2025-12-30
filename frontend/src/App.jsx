import './index.css'
import {Login, Signup, Home, Upload} from './pages/pageCollection.js'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import WatchVideo from './pages/WatchVideo.jsx'

function App() {

  return (
    <Routes>

      {/* Public Routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/watch/:videoId' element={<WatchVideo />} />
      </Route>

    </Routes>
  )
}

export default App
