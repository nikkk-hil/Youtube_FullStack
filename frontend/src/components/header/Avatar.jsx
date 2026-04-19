import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { AvatarDropdown } from "../componentCollection.js";
import { useState } from "react";

export default function Avatar() {
  const { user } = useAuth();
  const [handleAvatarClick, setHandleAvatarClick] = useState(false);
  return (
    <div className="relative text-white cursor-pointer">
      <div onClick={(e) => e.stopPropagation()}>
        {
          <img
            src={user.avatar}
            alt="user-profile-photo"
            className="h-10 w-10 rounded-full border border-zinc-500/70 object-cover shadow-lg shadow-black/50 transition hover:scale-[1.05]"
            onClick={() => setHandleAvatarClick((prev) => !prev)}
          />
        }
      </div>
      {handleAvatarClick && (
        <div className="absolute right-0 top-12">
          <AvatarDropdown onClose={() => setHandleAvatarClick(false)} />
        </div>
      )}
    </div>
  );
}
