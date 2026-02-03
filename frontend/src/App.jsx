import "./index.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import {
  Login,
  Signup,
  Home,
  Upload,
  WatchVideo,
  PlaylistPopup,
  CreatePlaylist,
  Playlist,
} from "./pages/pageCollection.js";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/watch/:videoId/:playlistId" element={<WatchVideo />} />
        <Route path="/playlist/add/:videoId" element={<PlaylistPopup />} />
        <Route path="/playlist/create/:videoId" element={<CreatePlaylist />} />
        <Route path="/playlist/:userId" element={<Playlist />} />
      </Route>
    </Routes>
  );
}

export default App;
