import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById } from "../../api/playlist.api";
import { Link } from "react-router-dom";
import { getAgoTime, getVideoDuration } from "../../utils/time";
import Button from "../Button";
import { removeVideoFromPlaylist } from "../../api/playlist.api";
import { useRef } from "react";

function PlaylistVideosComponent() {
  const { playlistId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [pendingDeletes, setPendingDeletes] = useState({});
  const [tick, setTick] = useState(0);

  const deleteTimeout = useRef({});
  const intervalRef = useRef(null);

  const timoutFn = async (videoId) => {
    await removeVideoFromPlaylist(playlistId, videoId);

    setPendingDeletes((prev) => {
      const copy = { ...prev };
      delete copy[videoId];
      return copy;
    });

    setVideos((videos) => videos.filter((video) => video._id != videoId));
  };

  useEffect(() => {
    if (Object.keys(pendingDeletes).length === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (intervalRef.current) {
    } else {
      intervalRef.current = setInterval(
        () => setTick((tick) => tick + 1),
        1000,
      );
    }
    return async () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      for(const key of Object.keys(pendingDeletes))
        await removeVideoFromPlaylist(playlistId, key);
    }
  }, [pendingDeletes]);

  const handleRemoveVideo = async (videoId) => {
    const expiresAt = Date.now() + 3000;
    try {
      setPendingDeletes((prev) => ({
        ...prev,
        [videoId]: { expiresAt },
      }));

      deleteTimeout.current[videoId] = setTimeout(
        () => timoutFn(videoId),
        3000,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUndoDelete = (videoId) => {
    clearTimeout(deleteTimeout.current[videoId]);
    delete deleteTimeout.current[videoId];
    setPendingDeletes((prev) => {
      const copy = { ...prev };
      delete copy[videoId];
      return copy;
    });
    setTick(0);
  };

  const getSecondsLeft = (videoId) => {
    const expAt = pendingDeletes[videoId]?.expiresAt;

    if (!expAt) return null;

    const secondsLeft = Math.ceil((expAt - Date.now()) / 1000);
    return secondsLeft;
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
        videos.map((video) => {
          const pendingDelete = !!pendingDeletes[video._id];
          const secondsLeft = getSecondsLeft(video._id);

          return (
            <div
              key={video._id}
              className="flex justify-between hover:bg-gray-900"
            >
              <Link to={`/watch/${video._id}/${playlistId}`}>
                <div
                  className={`flex gap-12 m-8 p-2 ${pendingDelete && `opacity-40`}`}
                >
                  <div className=" h-48 w-80">
                    <img
                      src={video.thumbnail}
                      alt={`${video.title} thumbnail image `}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-white text-3xl mb-1">
                      {video.title}
                    </div>
                    <div className="text-gray-300 mb-4">
                      {video.description}
                    </div>
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
                  hidden={pendingDelete}
                  onClick={() => handleRemoveVideo(video._id)}
                >
                  delete
                </Button>
              </div>
              {pendingDelete && (
                <div className="flex fixed bottom-4 left-2/5 z-50 bg-gray-800 p-3 rounded-full">
                  <div className="pt-2 text-white mr-4 ml-4">Video Deleted</div>
                  <Button
                    bgColor=""
                    className="border rounded-full hover:bg-red-600 cursor-pointer"
                    onClick={() => handleUndoDelete(video._id)}
                  >
                    Undo
                  </Button>
                  <div className="pt-2 text-red-400 mr-4 ml-4">{`${secondsLeft}s`}</div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default PlaylistVideosComponent;
