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
    } catch (error) {
        console.error(error);
    }finally {
        setDeleting(false);
        setDeleted(true);
    }
  }

  useEffect(() => {
    const t = getAgoTime(video.createdAt);
    setTimeAgo(t);
    setDuration(getVideoDuration(video.duration));
  }, []);

  const ownerName = video.owner?.username || "unknown";
  const ownerAvatar = video.owner?.avatar;

  return (
    <div className="group surface-card w-full p-3 transition duration-300 hover:-translate-y-1 hover:border-zinc-500/70" hidden={deleted}>
      <Link
        to={`/watch/${video._id}/${playlistId}`}
        className={`${deleting ? `cursor-default` : ``}`}
        onClick={ (e) => deleting && e.preventDefault()}
      >
        <div className="relative mb-3 h-52 overflow-hidden rounded-xl">
          <img
            src={`${video.thumbnail}`}
            alt="thumbnail"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
          />
          <div className="absolute bottom-2 right-2 rounded-md bg-black/75 px-2 py-1 text-xs font-semibold text-zinc-100">
            {duration}
          </div>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-3 p-1">
        <div className="flex min-w-0 gap-3">
          <div hidden={forChannel || !ownerAvatar}>
            <img
              src={`${ownerAvatar}`}
              alt="channel profile picture"
              className="h-10 w-10 rounded-full border border-zinc-600/70 object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="text-base font-semibold leading-tight text-zinc-100">{video.title}</div>
            <div className="mt-1 text-sm text-zinc-400">{ownerName}</div>
            <div className="mt-1 text-xs text-zinc-500">
              {`${video.views} ${video.views > 1 ? "views" : "view"}   |  ${timeAgo}`}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2" hidden={!forChannel}>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="border-zinc-700/70 px-3 py-1 text-xs text-zinc-300 hover:border-zinc-500"
              disable={deleting}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              className="border-zinc-700/70 px-3 py-1 text-xs text-rose-300 hover:border-rose-500/70 hover:bg-rose-950/30"
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
