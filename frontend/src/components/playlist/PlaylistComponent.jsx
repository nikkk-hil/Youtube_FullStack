import { useEffect, useState } from "react";
import { getUserPlaylists } from "../../api/playlist.api";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button, Loading } from "../componentCollection.js";
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
    return <Loading message="Loading your playlists..." />;

  return (
    <section className="app-page pt-24 pb-10">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <h1 className="display-title mb-6 text-center text-5xl text-zinc-100">Your Playlists</h1>

        <div className="space-y-3">
          {playlists &&
            playlists.map((playlist) => (
              <Link to={`/playlist/${playlist._id}`} key={playlist._id}>
                <Button className="surface-card mb-1 w-full justify-start border border-zinc-700/70 bg-zinc-900/75 px-5 py-4 text-left text-zinc-100 hover:border-zinc-500" bgColor="" textColor="">
                  <div>
                    <div className="text-lg font-semibold">{playlist.name}</div>
                    <div className="text-sm text-zinc-400">{playlist.description}</div>
                  </div>
                </Button>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
