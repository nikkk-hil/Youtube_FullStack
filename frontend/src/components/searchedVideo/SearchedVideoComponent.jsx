import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../../api/video.api";
import { Link } from "react-router-dom";
import { getAgoTime, getVideoDuration } from "../../utils/time";

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
    return (
      <div className="pt-16 h-screen text-white text-4xl text-center">
        Loading
      </div>
    );

    if (query === null || query === ""){
        return (
      <div className="pt-16 h-screen text-white text-4xl text-center">
        No Video Found!
      </div>
    );
    }

  return (
    <div className="pt-16 h-full text-center bg-black">

        {
            videos.length || <div className="pt-16 h-screen text-white text-4xl text-center">
        No Video Found!
      </div>
        }

      {videos.length &&
        videos.map((video) => {

          return (
            <div
              key={video._id}
              className="flex justify-between hover:bg-gray-900"
            >
              <Link to={`/watch/${video._id}/${null}`}>
                <div className={`flex gap-12 m-8 p-2`}>
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
            </div>
          );
        })}
    </div>
  );
}

export default SearchedVideoComponent;
