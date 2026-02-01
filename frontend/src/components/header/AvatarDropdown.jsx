import { useEffect } from "react";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { userLogout } from "../../api/user.api";

function AvatarDropdown({ onClose }) {
  const { setUser } = useAuth();

  useEffect(() => {
    const handleClose = () => onClose();
    document.addEventListener("click", handleClose);

    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [onClose]);

  const handleLogout = () => {
    userLogout()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setUser(null));
  };

  return (
    <div className="absolute right-4 m-2 w-1/10 bg-gray-900" onClick={(e) => e.stopPropagation()}>
      <Button
        onClick={() => handleChannelNav()}
        bgColor=""
        className="w-full text-left hover:bg-gray-700"
      >
        Your Channel
      </Button>
      <Button
        onClick={() => handlePlaylistNav()}
        bgColor=""
        className="w-full text-left hover:bg-gray-700"
      >
        Playlists
      </Button>
      <Button
        onClick={() => handleLikedVideosNav()}
        bgColor=""
        className="w-full text-left hover:bg-gray-700"
      >
        Liked Videos
      </Button>
      <Button
        onClick={() => handleLogout()}
        className="w-full text-left cursor-pointer"
      >
        Logout
      </Button>
    </div>
  );
}

export default AvatarDropdown;
