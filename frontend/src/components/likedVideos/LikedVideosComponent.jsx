import React, { useEffect, useState } from 'react'
import { getAllLikedVideos } from '../../api/like.api'
import Button from '../Button'
import { Link } from 'react-router-dom'

function LikedVideosComponent() {
    const [videos, setVideos] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await getAllLikedVideos();
                console.log(res.data.data.videos)
                setVideos(res.data.data.videos);
                
            } catch (error) {
                console.error(error)
            }
        })();
    },[])
    
  return (
    <div className='pt-16 text-white bg-black'>
        <div className='text-3xl text-center mb-2'>
            Liked Videos
        </div>
              {videos &&
        videos.map((video) => {
            const videoFile = video.video;
          return (
            <div
              key={video._id}
              className="flex justify-between hover:bg-gray-900"
            >
              <Link to={`/watch/${videoFile?._id}/${null}`}>
                <div
                  className={`flex gap-12 m-6 p-2`}
                >
                  <div className=" h-48 w-80">
                    <img
                      src={videoFile?.thumbnail}
                      alt={`${videoFile?.title} thumbnail image `}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-white text-3xl mb-1">
                      {videoFile?.title}
                    </div>
                    <div className="text-gray-300 mb-4">
                      {videoFile?.description}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  )
}

export default LikedVideosComponent