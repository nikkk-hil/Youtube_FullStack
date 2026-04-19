import { useState } from "react"
import { createPlaylist } from "../../api/playlist.api"
import {Input, Button} from "../componentCollection"
import { useParams, useNavigate } from "react-router-dom"

function CreatePlaylistComponent() {
    const navigate = useNavigate()
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
            navigate(-1) || navigate("/")
        } catch (error) {
            console.error(error)
        } finally {
            setCreating(false)
        }
    }

  return (
    <section className="auth-page pt-24">
      <div className="auth-card fade-in-up max-w-lg p-7 sm:p-10">
        <h1 className="display-title mb-6 text-center text-5xl text-zinc-100">
          Create Playlist
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Input
            value={title}
            placeholder="Enter a title for your playlist"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            value={description}
            placeholder="Enter a description"
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && (
            <p className="rounded-lg border border-rose-500/40 bg-rose-950/35 px-3 py-2 text-center text-sm text-rose-300">{error}</p>
          )}
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              disabled={creating}
              className="min-w-28"
            >
              {creating ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreatePlaylistComponent