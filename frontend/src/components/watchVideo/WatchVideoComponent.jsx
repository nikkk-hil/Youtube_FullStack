import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { getVideoById } from '../../api/video.api'

function WatchVideoComponent() {
  const videoId = useParams()
  const [videoFile, setVideoFile] = useState(null)

  useEffect( () => {
    getVideoById(videoId.videoId)
      .then((res) => setVideoFile(res.data.data.videoFile))
      .catch((err) => console.error(err))
  })

  return (
    <div>
<video width="320" height="240" controls>
  <source src={videoFile} type="video/mp4" />
Your browser does not support the video tag.
</video>
    </div>
  )
}

export default WatchVideoComponent