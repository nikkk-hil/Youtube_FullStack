import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { AvatarDropdown } from "../componentCollection.js";
import { useState } from "react";

export default function Avatar() {
  const { user } = useAuth();
  const [handleAvatarClick, setHandleAvatarClick] = useState(false);
  return (
    <div className="text-white cursor-pointer">
      <div onClick={(e) => e.stopPropagation()}>
        {
          <img
            src={user.avatar}
            alt="user-profile-photo"
            className="w-10 rounded-full"
            onClick={() => setHandleAvatarClick((prev) => !prev)}
          />
        }
      </div>
      {handleAvatarClick && (
        <div>
          <AvatarDropdown onClose={() => setHandleAvatarClick(false)} />
        </div>
      )}
    </div>
  );
}
