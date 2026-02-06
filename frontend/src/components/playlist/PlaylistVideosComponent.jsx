import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById } from "../../api/playlist.api";
import { Link } from "react-router-dom";
import { getAgoTime, getVideoDuration } from "../../utils/time";
import Button from "../Button";
import { removeVideoFromPlaylist } from "../../api/playlist.api";

function PlaylistVideosComponent() {
  const { playlistId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [deleteTimeout, setDeleteTimeout] = useState(null);
  const [countdown, setCountdown] = useState(3);

  const handleRemoveVideo = async (videoId) => {
    setCountdown(3);
    try {
      setPendingDelete(true);
      const countdownInterval = setInterval(
        () => setCountdown((prev) => prev - 1),
        1000,
      );
      setVideos(videos.filter((video) => video._id != videoId));
      const timeOut = setTimeout(async () => {
        await removeVideoFromPlaylist(playlistId, videoId);
        setPendingDelete(false);
        clearInterval(countdownInterval);
      }, 3000);
      setDeleteTimeout(timeOut);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUndoDelete = () => {
    clearTimeout(deleteTimeout);
    setPendingDelete(false);
    clearInterval(countdownInterval);
    setVideos(playlist.videos)
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getPlaylistById(playlistId);
        setPlaylist(res.data.data[0]);
        setVideos(res.data.data[0].videos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [playlistId]);

  if (loading)
    return (
      <div className="pt-16 h-screen text-white text-4xl text-center">
        Loading
      </div>
    );
  return (
    <div className="pt-16 h-full text-center bg-black">
      <div className="text-white text-3xl">{playlist.name}</div>
      <div className="text-gray-200 mb-2">{playlist.description}</div>
      <div className="flex gap-4 justify-center">
        <div className="text-sm text-gray-400 hover:text-red-600 cursor-pointer">
          Edit
        </div>
        <div className="text-sm text-gray-400 hover:text-red-600 cursor-pointer">
          Delete Playlist
        </div>
      </div>
      {videos &&
        videos.map((video) => (
          <div
            key={video._id}
            className="flex justify-between hover:bg-gray-900"
          >
            <Link to={`/watch/${video._id}/${playlistId}`}>
              <div className="flex gap-12 m-8 p-2">
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
                      <img
                        src={video.owner.avatar}
                        alt=""
                        srcset=""
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-gray-400 text-sm">
                      {video.owner.username}
                    </div>
                    <div className="text-gray-500 text-sm pl-6">
                      {`${getAgoTime(video.createdAt)}`}
                    </div>
                  </div>
                  <div className="text-gray-200">
                    {`${getVideoDuration(video.duration)}`}
                  </div>
                </div>
              </div>
            </Link>
            <div className="pt-6 m-2">
              <Button
                className="rounded-full cursor-pointer"
                onClick={() => handleRemoveVideo(video._id)}
              >
                delete
              </Button>
            </div>
          </div>
        ))}
      {pendingDelete && (
        <div className="flex fixed bottom-4 left-2/5 z-50 bg-gray-800 p-3 rounded-full">
          <div className="pt-2 text-white mr-4 ml-4">Video Deleted</div>
          <Button
            bgColor=""
            className="border rounded-full hover:bg-red-600 cursor-pointer"
            onClick={handleUndoDelete}
          >
            Undo
          </Button>
          <div className="pt-2 text-red-400 mr-4 ml-4">{`${countdown}s`}</div>
        </div>
      )}
    </div>
  );
}

export default PlaylistVideosComponent;
