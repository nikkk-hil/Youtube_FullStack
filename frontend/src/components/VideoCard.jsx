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
    <div className='w-112 hover:bg-gray-800 p-2'>
        <Link to={`/watch/${video._id}`}>
            <div>
                <img src={`${video.thumbnail}`} alt="thumbnail" />
            </div>
        </Link>
        <div className='flex justify-between'>
            <div className='flex gap-4'>
                <div>
                <img src={`${video.owner.avatar}`} alt="channel profile picture"  className='h-12 rounded-full'/>
            </div>
            <div>
                <div>
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