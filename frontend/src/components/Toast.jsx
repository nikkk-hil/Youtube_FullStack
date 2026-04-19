import React from 'react'

export default function Toast( {message} ) {
  return (
    <div className='fixed right-4 top-4 z-50 rounded-xl border border-zinc-700/80 bg-zinc-900/95 px-4 py-3 text-base text-zinc-100 shadow-xl shadow-black/50 backdrop-blur'>
        {message}
    </div>
  )
}
