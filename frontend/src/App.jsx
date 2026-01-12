import './index.css'
import {Login, Signup, Home, Upload, WatchVideo, ChoosePlaylist, CreatePlaylist} from './pages/pageCollection.js'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute.jsx'


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
        <Route path='/playlist/add/:videoId' element={<ChoosePlaylist />} />
        <Route path='/playlist/create' element={<CreatePlaylist />} />

      </Route>

    </Routes>
  )
}

export default App
