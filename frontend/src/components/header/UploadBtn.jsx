import React from 'react'
import { Link } from 'react-router-dom'

export default function UploadBtn() {
  return (
    <Link to='/upload'>
      <div className="text-white active:text-gray-400">UploadBtn</div>
    </Link>
  )
}
