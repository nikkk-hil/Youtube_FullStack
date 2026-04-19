import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../../api/video.api";
import { Link } from "react-router-dom";
import { getAgoTime, getVideoDuration } from "../../utils/time";
import Loading from "../Loading.jsx";

function SearchedVideoComponent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const queryParams = {
          query: query,
        };
        const queryString = new URLSearchParams(queryParams).toString();
        const res = await getAllVideos(queryString);
        setVideos(res.data.data.videos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  if (loading)
    return <Loading message="Searching videos..." />;

    if (query === null || query === ""){
        return (
      <section className="app-page pt-24 text-center text-zinc-200">
        <h1 className="display-title text-5xl">Start searching videos</h1>
      </section>
    );
    }

  const hasVideos = videos.length > 0;

  return (
    <section className="app-page pt-24 pb-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h1 className="display-title mb-2 text-5xl text-zinc-100">Search Results</h1>
        <p className="mb-6 text-sm text-zinc-400">Query: {query}</p>

        {!hasVideos && (
          <div className="surface-card rounded-2xl px-6 py-8 text-center text-zinc-300">
            No video found for this search.
          </div>
        )}

        {hasVideos &&
          videos.map((video) => {

          return (
            <Link key={video._id} to={`/watch/${video._id}/${null}`}>
              <article className="surface-card mb-4 flex flex-col gap-4 p-4 transition hover:border-zinc-500/70 sm:flex-row sm:items-start">
                <div className="h-52 w-full overflow-hidden rounded-xl sm:h-44 sm:w-72 sm:shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={`${video.title} thumbnail image `}
                      className="h-full w-full object-cover"
                    />
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-semibold text-zinc-100">{video.title}</h2>
                  <p className="mb-4 mt-2 text-sm text-zinc-300">{video.description}</p>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="w-6">
                        <img
                          src={video.owner.avatar}
                          alt=""
                          srcset=""
                          className="rounded-full border border-zinc-700/70"
                        />
                    </div>
                    <div className="text-sm text-zinc-300">{video.owner.username}</div>
                    <div className="text-sm text-zinc-500">{`${getAgoTime(video.createdAt)}`}</div>
                    </div>
                  <div className="text-sm text-zinc-400">Duration: {`${getVideoDuration(video.duration)}`}</div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default SearchedVideoComponent;
