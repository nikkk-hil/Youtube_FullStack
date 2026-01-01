import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVideoById, incrementView } from "../../api/video.api";
import { VideoPlayer } from "../componentCollection.js"

function WatchVideoComponent() {
  const videoId = useParams();
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(true)
  const [viewed, setViewed] = useState(false)

  const handleView = () => {
    console.log("Video Played")
    if (!viewed){
      incrementView(videoId.videoId)
        .then( (res) => console.log(res.data.data))
        .catch( (err) => console.error(err) )
        .finally( () => setViewed(true) )
    }
  }

  useEffect(() => {
    getVideoById(videoId.videoId)
      .then((res) => {
        setVideoFile(res.data.data.videoFile);
        console.log(videoFile);
      })
      .catch((err) => console.error(err))
      .finally( () => setLoading(false) )
  });

  if (loading)
    return(
      <div>
        LOADING...
      </div>
    )

  return (
    <div>
      <VideoPlayer onPlay={handleView} videoSrc={videoFile} />
    </div>
  );
}

export default WatchVideoComponent;
