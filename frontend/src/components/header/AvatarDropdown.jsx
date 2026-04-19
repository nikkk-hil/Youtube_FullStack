import { useEffect } from "react";
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

  const menuLinkClass = "block rounded-lg px-3 py-2 text-sm text-zinc-200 transition hover:bg-zinc-800 hover:text-white";

  return (
    <div
      className="surface-card w-56 overflow-hidden rounded-2xl border border-zinc-700/80 p-1 text-zinc-200 shadow-2xl shadow-black/50"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="border-b border-zinc-700/70 px-3 py-2">
        <div className="text-sm font-semibold text-zinc-100">{user.fullName}</div>
        <div className="text-xs text-zinc-400">@{user.username}</div>
      </div>

      <div className="flex flex-col gap-1 p-1">
        <Link className={menuLinkClass} to={`/channel-profile/${user.username}`}>
          Your Channel
        </Link>
        <Link className={menuLinkClass} to={`/playlists/${userId}`}>
          Playlists
        </Link>
        <Link className={menuLinkClass} to={`/liked-videos/${userId}`}>
          Liked Videos
        </Link>
        <button
          type="button"
          onClick={() => handleLogout()}
          className="cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-rose-300 transition hover:bg-rose-950/40 hover:text-rose-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AvatarDropdown;
