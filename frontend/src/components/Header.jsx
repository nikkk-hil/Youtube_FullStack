import React from 'react'
import { 
    Avatar,
    Menucard,
    NotificationLogo,
    SearchBar,
    UploadBtn,
    YouTube
 } from './componentCollection.js'

export default function Header() {
    
    return(
        <div className='flex items-center justify-between bg-black h-16 p-6'>
            <div className='flex items-center gap-4'>
                <Menucard />
                <YouTube />
            </div>
            <div className='flex items-center gap-4'>
                <SearchBar />
            </div>
            <div className='flex items-center gap-8'>
                <UploadBtn />
                <NotificationLogo />
                <Avatar />
            </div>
        </div>
    )
}