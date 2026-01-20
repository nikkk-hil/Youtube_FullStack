import { useState } from "react"
import { createPlaylist } from "../../api/playlist.api"
import {Input, Button} from "../componentCollection"
import { useParams, useNavigate } from "react-router-dom"

function CreatePlaylistComponent() {
    const navigate = useNavigate()
    const {videoId} = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const [creating, setCreating] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if(!title){
            setError("Title is required.")
            return
        }
        if(!description){
            setError("Description is required.")
        }

        setCreating(true)
        try {
            const res = await createPlaylist({title, description})
            console.log(res.data)
            navigate(`/watch/${videoId}`)
        } catch (error) {
            console.error(error)
        } finally {
            setCreating(false)
        }
    }

  return (
    <div className="flex items-center justify-center bg-black h-170 w-full">
      <div className="flex justify-between bg-[#121212] rounded-3xl shadow-lg shadow-red-800/50 h-3/4 w-2/3">
        <div></div>
        <div className="flex items-center justify-center w-1/2 p-4">
          <div>
            <h1 className="font-serif text-white text-3xl mb-6 text-center">
              Create Playlist
            </h1>
            <form onSubmit={handleSubmit}>
              <Input
                value={title}
                placeholder=" Enter a title for your playlist"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
              />
              <Input
                value={description}
                placeholder=" Enter a description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xl text-white font-light bg-[#080808] rounded-lg mb-3"
              />
              {error && (
                <p className="text-red-500 font-light text-center">{error}</p>
              )}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  disabled={creating}
                  className=" rounded-lg hover:bg-red-700 h-10 w-24 mt-2 p-0"
                >
                  {creating ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePlaylistComponent