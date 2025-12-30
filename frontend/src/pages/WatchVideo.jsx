import React from 'react'
import { Header, WatchVideoComponent } from '../components/componentCollection'

function WatchVideo() {
  return (
    <>
        <Header authorized={true} />
        <WatchVideoComponent />
    </>
  )
}

export default WatchVideo