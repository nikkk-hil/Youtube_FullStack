import React, { useEffect, useState } from 'react'
import { getPlaylistById } from '../../api/playlist.api';
import { Link } from 'react-router-dom';

function PlaylistVideoList( {playlistId, videoId} ) {
    const [videoList, setVideoList] = useState(null)

    useEffect( () => {
        (async () => {
            try {
                const res = await getPlaylistById(playlistId);
                setVideoList(res.data.data[0].videos);
            } catch (error) {
                console.error(error)
            }
        })();
    }, [playlistId])

  return (
    <div className='absolute right-1 top-24  mt-2 z-50 bg-[#121212] rounded-lg shadow-lg border border-gray-700'>
         <div className='max-h-84 overflow-y-auto space-y-2'>
        {videoList && videoList.map( (video) => {

            return (
                <div
              key={video._id}
              className={`flex justify-between hover:bg-gray-900 ${videoId === video._id ? `bg-gray-900` : ``}`}
            >
              <Link to={`/watch/${video._id}/${playlistId}`}>
                <div
                  className={`flex gap-6 m-2 p-2`}
                >
                  <div className=" h-15 w-25">
                    <img
                      src={video.thumbnail}
                      alt={`${video.title} thumbnail image `}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-white text-xl mb-1">
                      {video.title}
                    </div>
                    <div className="text-gray-300 mb-4">
                      {video.description}
                    </div>
                  </div>
                </div>
              </Link>
              </div>
            )
        })}
    </div>
    </div>
  )
}

export default PlaylistVideoList    