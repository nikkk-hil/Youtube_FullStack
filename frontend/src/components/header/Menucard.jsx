import MenuLogo from "../assets/menu-logo.svg"
import React from 'react'

export default function Menucard({ className }) {
  return (
    <div>
        <img src={MenuLogo} alt="menu-icon" className="w-6 h-6" />
    </div>
  )
}
