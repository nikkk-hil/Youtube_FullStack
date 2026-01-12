import { useParams,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVideoById, incrementView } from "../../api/video.api";
import { VideoPlayer, Button, Input, Comment } from "../componentCollection.js";
import {
  getChannelSubscribers,
  toggleSubscription,
} from "../../api/subscription.api.js";
import { toggleVideoLike } from "../../api/like.api.js";
import { getVideoComments, addComment } from "../../api/comment.api.js";

function WatchVideoComponent() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewed, setViewed] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(null);
  const [subscribing, setSubscribing] = useState(false);
  const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [loadingLike, setLoadingLike] = useState(false);
  const [subscribers, setSubscribers] = useState(null);
  const [uploadedAt, setUploadedAt] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [allComments, setAllComments] = useState(null);

  const handleComment = (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      setError("Comment is empty.");
      return;
    }
    const commentData = {
      content: comment,
    };

    setCommenting(true);
    addComment(videoId, commentData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
      .finally(() => setCommenting(false));
  };

  const handleView = () => {
    console.log("Video Played");
    if (!viewed) {
      incrementView(videoId)
        .then((res) => {})
        .catch((err) => console.error(err))
        .finally(() => setViewed(true));
    }
  };

  const handleSubscribeButton = () => {
    setSubscribing(true);
    toggleSubscription(video.owner._id)
      .then(() => {
        setIsSubscribed((prev) => !prev);
        setSubscribers((prev) => (isSubscribed ? prev - 1 : prev + 1));
      })
      .catch((err) => console.error(err))
      .finally(() => setSubscribing(false));
  };

  const handleLikeButton = () => {
    setLoadingLike(true);
    toggleVideoLike(videoId)
      .then(() => {
        setIsLiked((prev) => !prev);
        setLikes((prev) => prev + (isLiked ? -1 : 1));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingLike(false));
  };

  useEffect(() => {
    getVideoById(videoId)
      .then((res) => {
        console.log(res.data.data);
        setVideo(res.data.data.video);
        setIsSubscribed(res.data.data.isSubscribed);
        setLikes(parseInt(res.data.data.likes));
        setIsLiked(res.data.data.isLiked);
        const date = new Date(res.data.data.video.createdAt);
        const formattedDate = date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        setUploadedAt(formattedDate);

        getChannelSubscribers(res.data.data.video.owner._id)
          .then((res) => setSubscribers(res.data.data.subscribersCount))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [videoId]);

  useEffect(() => {
    getVideoComments(videoId)
      .then((res) => {
        setAllComments(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.error(err));
  }, [videoId, comment, setComment]);

  if (loading)
    return (
      <div className="h-screen text-white text-4xl text-center">Loading</div>
    );

  return (
    <div className="h-screen">
      <div className="flex justify-center h-4/5">
        <div className="flex justify-center w-3/5">
          <VideoPlayer onPlay={handleView} videoSrc={video.videoFile} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-3/5">
          <div className="text-white font-semibold text-2xl mb-2">
            {video.title}
          </div>
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 text-white">
              <div>
                <img
                  src={video.owner.avatar}
                  alt="channel profile picture"
                  className="h-10 rounded-full"
                />
              </div>
              <div className="w-28">
                <div>{video.owner.username}</div>
                <div className="text-xs text-gray-300">{`${subscribers} subscribers`}</div>
              </div>
              <div>
                <Button
                  bgColor="bg-white"
                  textColor="text-black"
                  className="font-semibold rounded-full active:bg-gray-200"
                  onClick={handleSubscribeButton}
                  disabled={subscribing}
                >
                  {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <Button
                  bgColor="bg-gray-800"
                  textColor=""
                  className={`font-semibold rounded-full active:bg-gray-200 ${
                    isLiked ? "text-blue-500" : "text-white"
                  }`}
                  onClick={handleLikeButton}
                  disabled={loadingLike}
                >
                  {`👍 ${likes}`}
                </Button>
              </div>
              <div>
                <Link to={`/playlist/add/${videoId}`}>
                  <Button
                  bgColor="bg-gray-800"
                  textColor="text-white"
                  className="font-semibold rounded-full active:bg-gray-200"
                >
                  Add to playlist
                </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-md mb-4">
            <div className="flex pt-1">
              <div className="text-gray-200 p-1 text-sm">
                {video.views} views
              </div>
              <div className="text-gray-200 p-1 text-sm">|</div>
              <div className="text-gray-200 p-1 text-sm"> {uploadedAt}</div>
            </div>
            <div>
              <h1 className="text-white text-2xl p-1">Description</h1>
              <p className="text-white text-sm p-1 pl-2">{video.description}</p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-md mb-4">
            <div className="text-2xl text-gray-200 mb-3 p-2">Comments</div>
            <div className="p-2"> 
              <form className="flex" onSubmit={(e) => handleComment(e)}>
                <Input
                  value={comment}
                  placeholder="Add a comment"
                  onChange={(e) => setComment(e.target.value)}
                  className="text-white"
                />
                <Button
                  type="submit"
                  className="active:bg-red-700 rounded-full"
                  disabled={commenting}
                >
                  Comment
                </Button>
              </form>
            </div>
            <div>
              {allComments.map((comment) => {
                return <Comment key={comment._id} comment={comment} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchVideoComponent;
