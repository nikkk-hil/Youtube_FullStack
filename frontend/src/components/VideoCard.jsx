import { useEffect, useState } from 'react'
import { getAgoTime, getVideoDuration } from '../utils/time'
import { Link } from 'react-router-dom'

function VideoCard({ video }) {
    const [timeAgo, setTimeAgo] = useState("")
    const [duration, setDuration] = useState("")

    useEffect( () => {
        console.log(video._id);
        const t = getAgoTime(video.createdAt)
        setTimeAgo(t)
        setDuration(getVideoDuration(video.duration))
    }, [])

  return (
    <div className='w-112 h-96 hover:bg-gray-800 p-4 rounded-xl'>
        <Link to={`/watch/${video._id}`}>
            <div className='h-64 mb-2'>
                <img src={`${video.thumbnail}`} alt="thumbnail" className='w-full h-full object-cover'/>
            </div>
        </Link>
        <div className='flex justify-between'>
            <div className='flex gap-4'>
                <div>
                <img src={`${video.owner.avatar}`} alt="channel profile picture"  className='h-12 rounded-full'/>
            </div>
            <div>
                <div className='font-semibold text-lg'>
                    {video.title}
                </div>
                <div>
                    {video.owner.username}
                </div>
                <div>
                   {`${video.views} ${video.views > 1 ? "views" : "view"}   |  ${timeAgo}`}
                </div>
            </div>
            </div>
            <div>
                {duration}
            </div>
        </div>
        
    </div>
  )
}

export default VideoCard