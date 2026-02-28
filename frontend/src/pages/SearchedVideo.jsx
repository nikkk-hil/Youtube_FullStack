import React from 'react'
import { Header, SearchedVideoComponent } from '../components/componentCollection'

function SearchedVideo() {
  return (
    <>
        <Header authorized={true} />
        <SearchedVideoComponent />
    </>
  )
}

export default SearchedVideo