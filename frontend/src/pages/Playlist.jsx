import { Header, PlaylistComponent } from "../components/componentCollection"

export default function Playlist() {
  return (
    <div>
        <Header authorized={true} />
        <PlaylistComponent />
    </div>
  )
}
