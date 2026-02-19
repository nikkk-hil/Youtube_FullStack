import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePlaylist, getPlaylistById, updatePlaylist } from "../../api/playlist.api";
import { Link } from "react-router-dom";
import { getAgoTime, getVideoDuration } from "../../utils/time";
import Button from "../Button";
import { removeVideoFromPlaylist } from "../../api/playlist.api";
import { useRef } from "react";
import Input from "../Input";

function PlaylistVideosComponent() {
  const { playlistId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [pendingDeletes, setPendingDeletes] = useState({});
  const [tick, setTick] = useState(0);
  const [editClicked, setEditClicked] = useState(false);
  const [playlistName, setPlaylistName] = useState("")
  const [playlistDescription, setPlaylistDescription] = useState("")

  const navigate = useNavigate();
  const deleteTimeout = useRef({});
  const intervalRef = useRef(null);
  const pendingDeletesRef = useRef({})
  const playlistNameRef = useRef(null);

  const handleDeletePlaylist = async () => {
    try {
      const res = await deletePlaylist(playlistId);
      console.log(res.data);
      
    } catch (error) {
      console.error(error)
    } finally {
      navigate(-1) || navigate ("/")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tittle = playlistName;
    const description = playlistDescription
    
    try {
      const res = await updatePlaylist(playlistId, {tittle, description});  
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setEditClicked(false)
    }
  }

  useEffect( () => {
    playlistNameRef.current?.focus();
  }, [editClicked])

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
    pendingDeletesRef.current = pendingDeletes;
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
  }, [pendingDeletes]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      for(const videoId in deleteTimeout.current)
        clearTimeout(deleteTimeout.current[videoId]);   //clear all timeout on unmount.

      for(const videoId in pendingDeletesRef.current)
        removeVideoFromPlaylist(playlistId, videoId);  //commit delete of all pendingDelete on unmount
      
    };
  }, []);

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
        setPlaylistName(res.data.data[0].name)
        setPlaylistDescription(res.data.data[0].description)
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
      <div
       hidden={editClicked}
       >
        <div className="text-white text-3xl">{playlistName}</div>
      <div className="text-gray-200 mb-2">{playlistDescription}</div>
      <div className="flex gap-4 justify-center"
      >
        <div className="text-sm text-gray-400 hover:text-red-600 cursor-pointer"
          onClick={() => setEditClicked(true)}
        >
          Edit
        </div>
        <div className="text-sm text-gray-400 hover:text-red-600 cursor-pointer"
          onClick={handleDeletePlaylist}
        >
          Delete Playlist
        </div>
      </div>
      </div>

      <div
       hidden={!editClicked}
       >
      <form onSubmit={handleSubmit}>
        <Input
          ref={playlistNameRef}
          type="text"
          value={playlistName}
          className='text-white text-3xl text-center bg-gray-800 rounded-lg p-1 mb-4'
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <Input
          type="text"
          value={playlistDescription}
          className='text-white w-1/5 text-center bg-gray-900 rounded-lg p-1 mb-1'
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
        <div className="flex justify-center">
          <Button type="submit" bgColor="" textColor="text-gray-400" className="text-sm hover:text-red-600 cursor-pointer">
          Update
        </Button>
        <Button bgColor="" textColor="text-gray-400" className="text-sm hover:text-red-600 cursor-pointer" onClick={() => setEditClicked(false)}>
          Cancel
        </Button>
        </div>
      </form>
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
                  className={`flex gap-12 m-8 p-2`}
                  hidden={pendingDelete}
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
