import React from 'react'

export default function Toast( {message} ) {
  return (
    <div className='fixed top-4 right-4 z-50 bg-gray-800 text-white text-xl rounded p-4'>
        {message}
    </div>
  )
}
