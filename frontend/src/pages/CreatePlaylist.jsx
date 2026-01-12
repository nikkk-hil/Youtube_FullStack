import React from 'react'
import { Header, CreatePlaylistComponent } from '../components/componentCollection'

function CreatePlaylist() {
  return (
    <>
        <Header authorized={true} />
        <CreatePlaylistComponent />
    </>
  )
}

export default CreatePlaylist