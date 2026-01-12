import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button } from "../componentCollection.js";
import { addVideoToPlaylist, getUserPlaylists } from "../../api/playlist.api.js";
import { Link, useParams } from "react-router-dom";

function PlaylistPopup() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState(null);
  const {videoId} = useParams()

  const addVideo = async (pid) => {
    try {
        console.log(pid)
        const res = await addVideoToPlaylist(pid, videoId)
        console.log(res.data)
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    const gettingUserPlayist = async () => {
      try {
        const res = await getUserPlaylists(user._id);
        setPlaylists(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    gettingUserPlayist();
  });

  if (loading)
    return (
      <div className="h-screen text-white text-4xl text-center">Loading</div>
    );

  return (
    <div>
      <div>
        <Link to={`/playlist/create`}>
          <div className="text-white">Create Playlist</div>
        </Link>
        {playlists.map((playlist) => (
            <Button key={playlist._id} onClick={() => addVideo(playlist._id)}>
              <div>{playlist.name}</div>
              <div>{playlist.description}</div>
            </Button>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPopup;
