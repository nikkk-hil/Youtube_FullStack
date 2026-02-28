import React, { useEffect, useRef, useState } from "react";
import { Button } from "../componentCollection.js";
import { getAllVideos } from "../../api/video.api.js";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [pause, setPause] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [videos, setVideos] = useState(null);

  const inputRef = useRef(null);
  const timeOutRef = useRef(null);
  const navigate = useNavigate();

  const fetchSarchedVideos = async () => {
    try {
      setPause(true);
      const queryParams = {
        query: query,
      };
      const queryString = new URLSearchParams(queryParams).toString();
      const res = await getAllVideos(queryString);
      setVideos(res.data.data.videos);
    } catch (error) {
      console.error(error);
    } finally {
      setPause(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        timeOutRef.current && clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(async () => {
          if (query.trim() !== "") await fetchSarchedVideos();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      timeOutRef.current && clearTimeout(timeOutRef.current);
    };
  }, [query]);

  const handleSearchButton = (e) => {
    e.preventDefault();
    query.trim();
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="text-white border rounded-xl">
      <form onSubmit={handleSearchButton}>
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setTimeout(() => setIsFocus(false), 500)}
            className="w-96"
          />
          <Button
            bgColor=""
            className="text-xl cursor-pointer"
            disabled={pause}
            onClick={() => {
              setQuery("");
              inputRef.current.focus();
            }}
          >
            X
          </Button>
          <Button
            bgColor=""
            type="submit"
            disabled={pause}
            onClick={handleSearchButton}
          >
            Search
          </Button>
        </div>
      </form>
      <div className="absolute bg-black text-white w-1/4 mt-1">
        {isFocus &&
          query &&
          videos &&
          videos.map((video) => {
            return (
              <Button
                key={video._id}
                className="hover:bg-gray-800 flex w-full"
                bgColor=""
                onClick={(e) => {
                  setQuery(video.title);
                  inputRef.current.focus();
                }}
              >
                {video.title}
              </Button>
            );
          })}
      </div>
    </div>
  );
}
