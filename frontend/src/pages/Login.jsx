import { Header, LoginComponent } from "../components/componentCollection.js";

import React from 'react'

function Login() {
  return (
    <>
    <Header authorized={false} />
    <LoginComponent />   
    </>
  )
}

export default Login