import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVideoById, incrementView } from "../../api/video.api";
import { VideoPlayer, Button } from "../componentCollection.js";
import { getChannelSubscribers, toggleSubscription } from "../../api/subscription.api.js";
import { toggleVideoLike } from "../../api/like.api.js";

function WatchVideoComponent() {
  const videoId = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewed, setViewed] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(null)
  const [subscribing, setSubscribing] = useState(false)
  const [likes, setLikes] = useState(null)
  const [isLiked, setIsLiked] = useState(null)
  const [loadingLike, setLoadingLike] = useState(false)


  const handleView = () => {
    console.log("Video Played");
    if (!viewed) {
      incrementView(videoId.videoId)
        .then((res) => {})
        .catch((err) => console.error(err))
        .finally(() => setViewed(true));
    }
  };

  const handleSubscribeButton = () => {
    setSubscribing(true)
    toggleSubscription(video.owner._id)
      .then(() => setIsSubscribed(!isSubscribed))
      .catch((err) => console.error(err))
      .finally( () => setSubscribing(false))
  }

  const handleLikeButton = () => {
    setLoadingLike(true)
    toggleVideoLike(videoId.videoId)
      .then(() => {
        setIsLiked(!isLiked)
        if(isLiked)
          setLikes(likes-1)
        else
          setLikes(likes+1)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingLike(false))

  }

  useEffect(() => {
    getVideoById(videoId.videoId)
      .then((res) => {
        console.log(res.data.data);
        setVideo(res.data.data.video);
        setIsSubscribed(res.data.data.isSubscribed)
        setLikes(parseInt(res.data.data.likes))
        setIsLiked(res.data.data.isLiked)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    

  }, []);

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
          <div className="flex justify-between">
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
                <div className="text-xs text-gray-300">subscribers</div>
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
                  className={`font-semibold rounded-full active:bg-gray-200 ${isLiked ? "text-blue-500" : "text-white"}`}
                  onClick={handleLikeButton}
                  disabled={loadingLike}
                >
                  {`👍 ${likes}`}
                </Button>
              </div>
              <div>
                <Button
                  bgColor="bg-gray-800"
                  textColor="text-white"
                  className="font-semibold rounded-full active:bg-gray-200"
                >
                  Add to playlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchVideoComponent;
