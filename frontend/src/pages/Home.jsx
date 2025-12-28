import React from 'react'
import { Header, HomeComponent } from '../components/componentCollection'

function Home() {
  return (
    <>
        <Header authorized={true} />
        <HomeComponent />
    </>
  )
}

export default Home