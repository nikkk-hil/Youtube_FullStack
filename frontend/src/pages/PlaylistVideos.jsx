import React from 'react'
import { PlaylistVideosComponent, Header } from '../components/componentCollection'

function PlaylistVideos() {
  return (
    <>
        <Header authorized={true} />
        <PlaylistVideosComponent />
    </>
  )
}

export default PlaylistVideos