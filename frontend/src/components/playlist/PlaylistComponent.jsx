import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPlaylistById } from '../../api/playlist.api'

export default function PlaylistComponent() {
    const {pid} = useParams()
    const [videos, setVideos] = useState(null)

    useEffect ( () => {
        ( async () => {
            try {
                const res = await getPlaylistById(pid)
                console.log(res.data)
            } catch (error) {
                console.error(error)
            }
        })();
    }, [])
  return (
    <div className='text-white'>
        Hello
    </div>
  )
}
