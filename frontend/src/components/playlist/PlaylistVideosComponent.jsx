import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById } from "../../api/playlist.api";
import { Link } from "react-router-dom";
import { getAgoTime, getVideoDuration } from "../../utils/time";

function PlaylistVideosComponent() {
  const { playlistId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log(playlistId);
        const res = await getPlaylistById(playlistId);
        setPlaylist(res.data.data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="pt-16 h-screen text-white text-4xl text-center">
        Loading
      </div>
    );
  return (
    <div className="pt-16 h-full text-center">
      <div className="text-white text-3xl">{playlist.name}</div>
      <div className="text-gray-200">{playlist.description}</div>
      {playlist.videos &&
        playlist.videos.map((video) => (
          <Link key={video._id} to={`/watch/${video._id}/${playlistId}`}>
            <div className="flex gap-12 m-8 hover:bg-gray-900 p-2">
              <div className=" h-48 w-80">
                <img
                  src={video.thumbnail}
                  alt={`${video.title} thumbnail image `}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="text-left">
                <div className="text-white text-3xl mb-1">{video.title}</div>
                <div className="text-gray-300 mb-4">{video.description}</div>
                <div className="flex gap-2 mb-4">
                    <div className="w-5">
                        <img src={video.owner.avatar} alt="" srcset="" className="rounded-full"/>
                    </div>
                    <div className="text-gray-400 text-sm">
                        {video.owner.username}
                    </div>
                    <div className="text-gray-500 text-sm pl-6">
                    {
                        `${getAgoTime(video.createdAt)}`
                    }
                </div>
                </div>
                <div className="text-gray-200">
                    {`${getVideoDuration(video.duration)}`}
                </div>
                
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default PlaylistVideosComponent;
