import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getAllVideos } from "../../api/video.api.js";
import { Loading, VideoCard } from "../componentCollection.js";

function HomeComponent() {
  const { user } = useAuth();

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMorePage, setHasMorePage] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const loaderRef = useRef(null);
  const pageCount = useRef(null);

  useEffect(() => {
    const queryParams = {
      page,
      limit: "6"
    }
    const query = new URLSearchParams(queryParams).toString();
      setLoading(true);
    getAllVideos(query)
      .then((res) => {
        pageCount.current || (pageCount.current = parseInt(res.data.data.totalPageCnt));
        setVideos(prev => [...prev, ...(res.data.data.videos)]);

        if (page === pageCount.current)
          setHasMorePage(false);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  }, [page]);

  useEffect (() => {
    // console.log("Inside Observer UseEffect!!");
    

    if (!loaderRef.current)
        return;

    const observer = new IntersectionObserver((entries) => {
      // console.log(entries);
      const entry = entries[0];
      if (!entry.isIntersecting || !hasMorePage || loading)
        return;

      setPage(prev => prev+1);
    }, {
      threshold: 0,
      rootMargin: "20px"
    })
    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect()
    }
  },[hasMorePage, loading])

  if (initialLoading) return <Loading message="Curating fresh videos..." />;
  else
    return (
      <div className="app-page pt-24 pb-10">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Discover</p>
              <h1 className="display-title text-4xl text-zinc-100 sm:text-5xl">Latest Drops</h1>
            </div>
            <p className="text-sm text-zinc-400">{videos.length} videos loaded</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {
            videos.map( (video) => (
              <VideoCard key={video._id} video={video} />
            ))
          }
          </div>

          <div ref={loaderRef} className="py-6 text-center text-sm text-zinc-400" hidden={!hasMorePage}>
            {loading ? "Loading more videos..." : "Scroll for more"}
          </div>
        </div>
      </div>
    );
}

export default HomeComponent;
