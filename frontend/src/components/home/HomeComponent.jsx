import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAllVideos } from "../../api/video.api.js";
import { VideoCard } from "../componentCollection.js";

function HomeComponent() {
  const { user } = useAuth();

  const [videos, setVideos] = useState(null);
  const [totalVideoCount, setTotalVideoCount] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllVideos()
      .then((res) => {
        setTotalVideoCount(parseInt(res.data.data.totalVideoCnt));
        setPageCount(parseInt(res.data.data.totalPageCnt));
        setVideos(res.data.data.videos);
        console.log(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="h-screen text-white text-4xl text-center">Loading</div>;
  else
    return (
      <div className="grid grid-cols-3 gap-2 h-full text-white">
        {
          videos.map( (video) => (
            <VideoCard key={video._id} video={video} />
          ))
        }
      </div>
    );
}

export default HomeComponent;
