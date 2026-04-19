import React from 'react'
import { 
    Avatar,
    Menucard,
    NotificationLogo,
    SearchBar,
    UploadBtn,
    YouTube
 } from '../componentCollection.js'
 import { Link } from 'react-router-dom'

export default function Header({ authorized=true }) {
    
    return(
        <header className='fixed inset-x-0 top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-xl'>
            <div className='mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6'>
                <div className='flex min-w-0 items-center gap-3 sm:gap-4'>
                    {authorized && <Menucard />}
                    <Link to={"/"} className='shrink-0'>
                        <YouTube />
                    </Link>
                </div>

                {
                    authorized
                    ? <div className='hidden flex-1 justify-center md:flex'><SearchBar /></div>
                    : <div className='display-title hidden text-sm tracking-[0.2em] text-zinc-400 md:block'>Create. Stream. Repeat.</div>
                }

                <div className='flex items-center gap-2 sm:gap-4'>
                    {authorized && <UploadBtn />}
                    {authorized && <NotificationLogo />}
                    {authorized && <Avatar />}
                </div>
            </div>
            {authorized && (
                <div className='border-t border-zinc-800/70 px-4 pb-3 pt-2 md:hidden'>
                    <SearchBar />
                </div>
            )}
        </header>
    )
}