import React, { useEffect, useRef, useState } from 'react'
import { Input, Button } from "../componentCollection.js"
import { getAllVideos } from '../../api/video.api.js';

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortType, setSortType] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pause, setPause] = useState(false);
  const [videos, setVideos] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  
  const inputRef = useRef(null);
  const timeOutRef = useRef(null);

  const fetchSarchedVideos = async() => {
    try {
      setPause(true)
      const queryParams = {
        page: page,
        query: query,
        sortBy,
        sortType,
      }
      const queryString = new URLSearchParams(queryParams).toString();
      const res = await getAllVideos(queryString)
      setVideos(res.data.data.videos)
    } catch (error) {
      console.error(error);
    } finally {
      setPause(false)
    }
  }

  useEffect( () => {
    (async() => {
      try {
        timeOutRef.current && clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(async() => await fetchSarchedVideos(), 1000);
      } catch (error) {
        console.error(error)
      }
    })();
  }, [query])

  const handleSearchButton =  (e) => {
    e.preventDefault();
    
  }

  return (
    <div className="text-white border rounded-xl">
      <form onSubmit={handleSearchButton}>
        <div className='flex'>
          <input
          ref={inputRef}
        type="text"
        value={query}
        onChange={ (e) => setQuery(e.target.value) }
        className='w-96'
      />
      <Button bgColor='' className='text-xl' disable={pause}>
        X
      </Button>
      <Button bgColor='' type='submit' disable={pause}>
        Search
      </Button>
        </div>
      </form>
      <div className='absolute bg-black text-white w-1/4 mt-1'>
        { document.activeElement === inputRef.current && videos && videos.map( (video) => {
          return(
            <Button key={video._id} className='hover:bg-gray-800 flex w-full' bgColor=''
              onClick={ () => {
                setQuery(video.title);
              }}
            >
              {video.title}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
