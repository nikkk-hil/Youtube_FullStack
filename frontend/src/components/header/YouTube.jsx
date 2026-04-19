import React from 'react'
import Logo from '../../assets/youtube-logo.png'

export default function YouTube() {
  return (
    <div className='flex items-center gap-2'>
        <img src={Logo} alt="youtube-logo" className='h-8 w-auto drop-shadow-[0_8px_16px_rgba(239,68,68,0.35)]'/>
        <div className='hidden sm:block'>
          <p className='display-title text-xl leading-none tracking-[0.2em] text-zinc-100'>VIDEONEST</p>
          <p className='text-[10px] uppercase tracking-[0.18em] text-zinc-400'>Studio feed</p>
        </div>
    </div>
  )
}
