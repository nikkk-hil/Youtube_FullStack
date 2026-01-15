import { PlaylistPopupComponent, Header } from "../components/componentCollection";

function PlaylistPopup() {
  return (
    <>
    <Header authorized={true} />
    <PlaylistPopupComponent />
    </>
  )
}

export default PlaylistPopup