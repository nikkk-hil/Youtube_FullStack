import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../api/playlist.api";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button } from "../componentCollection.js";
import { Link } from "react-router-dom";

export default function PlaylistComponent() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserPlaylists(user._id);
        console.log(res.data.data);
        setPlaylists(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (loading)
    return (
      <div className="h-screen text-white text-4xl text-center">Loading</div>
    );

  return (
    <div className="pt-16 h-screen">
      <div className="text-white text-2xl text-center m-4">Your Playlists</div>
      {playlists &&
        playlists.map((playlist) => (
          <div
            key={playlist._id}
            className="text-center hover:bg-gray-900 mb-6"
          >
            <Link to={`/playlist/${playlist._id}`}>
              <Button className="w-full text-center text-white" bgColor="">
                <div className="text-xl">{playlist.name}</div>
                <div className="text-gray-200">{playlist.description}</div>
              </Button>
            </Link>
          </div>
        ))}
    </div>
  );
}
