import { PlaylistPopup, Header } from "../components/componentCollection";

function ChoosePlaylist() {
  return (
    <>
    <Header authorized={true} />
    <PlaylistPopup />
    </>
  )
}

export default ChoosePlaylist