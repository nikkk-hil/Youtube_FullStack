import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAllVideos } from "../../api/video.api.js";
import { VideoCard } from "../componentCollection.js";

function HomeComponent() {
  const { user } = useAuth();

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMorePage, setHasMorePage] = useState(true);

  const loaderRef = useRef(null);
  const pageCount = useRef(null);

  useEffect(() => {
    const queryParams = {
      page,
      limit: "2"
    }
    const query = new URLSearchParams(queryParams).toString();
    getAllVideos(query)
      .then((res) => {
        pageCount.current || (pageCount.current = parseInt(res.data.data.totalPageCnt));
        setVideos(prev => [...prev, ...(res.data.data.videos)]);

        if (page === pageCount.current)
          setHasMorePage(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect( () => {
    console.log(page);
  },[page])

  useEffect (() => {
    console.log("Inside Observer UseEffect!!");
    

    if (!loaderRef.current)
        return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry.isIntersecting || !hasMorePage || loading)
        return;

      setPage(prev => prev+1);
    })
    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect()
    }
  },[hasMorePage, loading])

  if (loading) return <div className="h-screen text-white text-4xl text-center">Loading</div>;
  else
    return (
      <div className="pt-16 h-full text-white">
        <div className="grid grid-cols-3 gap-2 ">
          {
          videos.map( (video) => (
            <VideoCard key={video._id} video={video} />
          ))
        }
        </div>
        <div ref={loaderRef}>Loading More...</div>
      </div>
    );
}

export default HomeComponent;
