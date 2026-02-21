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
  PlaylistVideos,
  LikedVideos,
  UserChannel
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
        <Route path="/playlist/create" element={<CreatePlaylist />} />
        <Route path="/playlists/:userId" element={<Playlist />} />
        <Route path="/playlist/:playlistId" element={<PlaylistVideos />} />
        <Route path="/liked-videos/:userId" element={<LikedVideos />} />
        <Route path="/channel-profile/:username" element={<UserChannel />} />
      </Route>
    </Routes>
  );
}

export default App;
