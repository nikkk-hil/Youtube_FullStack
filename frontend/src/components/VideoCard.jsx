import { useEffect, useState } from "react";
import { getAgoTime, getVideoDuration } from "../utils/time";
import { Link } from "react-router-dom";
import Button from "./Button";
import { deleteVideo } from "../api/video.api";

function VideoCard({ video, forChannel = false }) {
  const [timeAgo, setTimeAgo] = useState("");
  const [duration, setDuration] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const playlistId = null;

  const handleDeleteButton = async() => {
    try {
        setDeleted(false)
        setDeleting(true);
        const res = await deleteVideo(video._id);
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }finally {
        setDeleting(false);
        setDeleted(true);
    }
  }

  useEffect(() => {
    console.log(video._id);
    const t = getAgoTime(video.createdAt);
    setTimeAgo(t);
    setDuration(getVideoDuration(video.duration));
  }, []);

  return (
    <div className={`${forChannel ? `w-94` : `w-112 h-96`} hover:bg-gray-800 p-4 rounded-xl`} hidden={deleted}>
      <Link to={`/watch/${video._id}/${playlistId}`} className={`${deleting ? `cursor-default` : ``}`} onClick={ (e) => deleting && e.preventDefault()}>
        <div className="h-64 mb-2">
          <img
            src={`${video.thumbnail}`}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="flex p-1 justify-between">
        <div className="flex gap-4">
          <div hidden={forChannel}>
            <img
              src={`${video.owner?.avatar}`}
              alt="channel profile picture"
              className="h-12 rounded-full"
            />
          </div>
          <div>
            <div className="font-semibold text-lg">{video.title}</div>
            <div>{video.owner.username}</div>
            <div>
              {`${video.views} ${video.views > 1 ? "views" : "view"}   |  ${timeAgo}`}
            </div>
          </div>
        </div>
        <div>
          <div>{duration}</div>
          <div className="flex gap-3 mt-2" hidden={!forChannel}>
            <Button
              bgColor=""
              textColor=""
              className="text-gray-400 text-sm cursor-pointer hover:text-red-600"
              disable={deleting}
            >
              Edit
            </Button>
            <Button
              bgColor=""
              textColor=""
              className="text-gray-400 text-sm cursor-pointer hover:text-red-600"
              onClick={handleDeleteButton}
              disable={deleting}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
