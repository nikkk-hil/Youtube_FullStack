import React from 'react'
import { LikedVideosComponent, Header } from '../components/componentCollection'

function LikedVideos() {
  return (
    <>
        <Header authorized={true} />
        <LikedVideosComponent />
    </>
  )
}

export default LikedVideos