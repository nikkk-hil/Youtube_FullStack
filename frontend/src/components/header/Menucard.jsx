import MenuLogo from "../../assets/menu-logo.svg"
import React from 'react'

export default function Menucard({ className }) {
  return (
    <button
      type="button"
      aria-label="Open navigation"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/80 transition hover:border-zinc-500 hover:bg-zinc-800 ${className || ''}`}
    >
      <img src={MenuLogo} alt="menu-icon" className="h-5 w-5 opacity-90" />
    </button>
  )
}
