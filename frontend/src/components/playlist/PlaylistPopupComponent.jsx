import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button } from "../componentCollection.js";
import {
  addVideoToPlaylist,
  getUserPlaylists,
} from "../../api/playlist.api.js";
import { Link } from "react-router-dom";

function PlaylistPopupComponent({ videoId, onClose, onSaved }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState(null);

  const addVideo = async (pid) => {
    try {
      console.log(pid);
      const res = await addVideoToPlaylist(pid, videoId);
      console.log(res.data);
      onClose();
      onSaved();

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserPlaylists(user._id);
        setPlaylists(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user._id]);

  useEffect(() => {
    const handleClickOutside = () => onClose()

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  if (loading)
    return (
      <div className="absolute right-0 mt-2 z-50 w-64 bg-[#121212] rounded-lg shadow-lg border border-gray-700 text-white text-4xl text-center">
        Loading
      </div>
    );

  return (
    <div
      className="absolute mt-2 z-50 w-64 bg-[#121212] rounded-lg shadow-lg border border-gray-700"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-h-20 overflow-y-auto space-y-2">
        <div className="text-white text-center mt-1 underline decoration-dotted">
          Save to a playlist
        </div>
        <div className="flex flex-col gap-1">
          {playlists &&
            playlists.map((playlist) => (
              <Button
                key={playlist._id}
                onClick={() => addVideo(playlist._id)}
                bgColor=""
                className="hover:bg-gray-900"
              >
                <div>{playlist.name}</div>
              </Button>
            ))}
        </div>
      </div>
      <Link to={`/playlist/create/${videoId}`}>
        <Button className="w-full cursor-pointer">Create a Playlist</Button>
      </Link>
    </div>
  );
}

export default PlaylistPopupComponent;
