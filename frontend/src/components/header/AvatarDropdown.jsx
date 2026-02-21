import { useEffect } from "react";
import Button from "../Button";
import { useAuth } from "../../context/AuthContext";
import { userLogout } from "../../api/user.api";
import { Link } from "react-router-dom";

function AvatarDropdown({ onClose }) {
  const { user, setUser } = useAuth();
  const userId = user._id;

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
      <Link to={`/playlists/${userId}`}>
        <Button
        bgColor=""
        className="w-full text-left hover:bg-gray-700"
      >
        Playlists
      </Button>
        </Link>
        <Link to={`/liked-videos/${userId}`}>
                <Button
        bgColor=""
        className="w-full text-left hover:bg-gray-700"
      >
        Liked Videos
      </Button>
        </Link>
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
