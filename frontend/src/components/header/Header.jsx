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
 import { Link } from 'react-router-dom'

export default function Header({ authorized=true }) {
    
    return(
        <div className='flex items-center justify-between bg-black h-16 p-6 fixed left-0 w-full z-50'>
            <div className='flex items-center gap-4'>
                {authorized && <Menucard />}
                <Link to={"/"}>
                    <YouTube />
                </Link>
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