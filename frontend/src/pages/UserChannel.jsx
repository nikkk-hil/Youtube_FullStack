import React from 'react'
import { UserChannelComponent, Header } from '../components/componentCollection'

function UserChannel() {
  return (
    <>
        <Header authorized={true} />
        <UserChannelComponent />
    </>
  )
}

export default UserChannel