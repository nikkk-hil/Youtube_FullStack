import React from 'react'
import { 
    Avatar,
    Menucard,
    NotificationLogo,
    SearchBar,
    UploadBtn,
    YouTube,
    Logout
 } from '../componentCollection.js'

export default function Header({ authorized=true }) {
    
    return(
        <div className='flex items-center justify-between bg-black h-16 p-6'>
            <div className='flex items-center gap-4'>
                {authorized && <Menucard />}
                <YouTube />
            </div>
            <div className='flex items-center gap-4'>
                {authorized && <SearchBar />}
            </div>
            <div className='flex items-center gap-8'>
                {authorized && <UploadBtn />}
                {authorized && <NotificationLogo />}
                {authorized && <Avatar />}
                {/* {authorized && <Logout />} */}
            </div>
        </div>
    )
}