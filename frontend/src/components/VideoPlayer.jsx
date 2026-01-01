import React from 'react'

function VideoPlayer({
    videoSrc,
    classname="",
    ...props
}) {
  return (
    <video 
        src={videoSrc}
        controls
        preload='metadata'
        crossOrigin='anonymous'
        className='rounded-lg'
    />
  )
}

export default VideoPlayer