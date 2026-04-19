import React from 'react'
import { Header, UploadComponent } from '../components/componentCollection'

function Upload() {
  return (
    <>
      <Header authorized={true} />
      <UploadComponent />
    </>
  )
}

export default Upload