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
    if (!query.trim()) return;
    navigate(`/search?q=${query.trim()}`);
  };

  return (
    <div className="relative w-full max-w-xl text-zinc-100">
      <form onSubmit={handleSearchButton}>
        <div className="group flex items-center rounded-full border border-zinc-700/80 bg-zinc-900/70 px-2 transition focus-within:border-red-400/70 focus-within:bg-zinc-900/95">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setTimeout(() => setIsFocus(false), 500)}
            placeholder="Search videos, creators, moments"
            className="w-full bg-transparent px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />

          {!!query && (
            <Button
              type="button"
              variant="ghost"
              className="rounded-full border-0 px-3 py-1 text-xs"
              disabled={pause}
              onClick={() => {
                setQuery("");
                setVideos(null);
                inputRef.current.focus();
              }}
            >
              Clear
            </Button>
          )}

          <Button
            type="submit"
            disabled={pause}
            variant="secondary"
            className="rounded-full border border-zinc-600/80 px-4 py-1.5 text-xs uppercase tracking-[0.08em]"
          >
            Search
          </Button>
        </div>
      </form>

      {isFocus && query && (
        <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-950/95 shadow-2xl shadow-black/60 backdrop-blur">
          {pause ? (
            <div className="px-4 py-3 text-sm text-zinc-400">Searching...</div>
          ) : videos?.length ? (
            videos.map((video) => {
              return (
                <button
                  key={video._id}
                  type="button"
                  className="block w-full border-b border-zinc-800 px-4 py-3 text-left text-sm text-zinc-200 transition last:border-0 hover:bg-zinc-800/70"
                  onMouseDown={() => {
                    setQuery(video.title);
                    navigate(`/search?q=${encodeURIComponent(video.title)}`);
                  }}
                >
                  {video.title}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-sm text-zinc-400">No quick matches</div>
          )}
        </div>
      )}
    </div>
  );
}
