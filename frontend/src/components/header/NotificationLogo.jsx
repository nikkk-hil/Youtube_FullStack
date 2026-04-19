import NLogo from "../../assets/notification-logo.svg?react"
import React from 'react'

export default function NotificationLogo() {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/80 transition hover:border-zinc-500 hover:bg-zinc-800"
    >
      <NLogo className="h-6 w-6 text-zinc-100" />
      <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.95)]" />
    </button>
  )
}
