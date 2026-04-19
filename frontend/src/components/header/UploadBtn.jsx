import React from 'react'
import { Link } from 'react-router-dom'

export default function UploadBtn() {
  return (
    <Link to='/upload'>
      <div className="inline-flex items-center rounded-xl border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-red-200 transition hover:bg-red-500/20">
        Upload
      </div>
    </Link>
  )
}
