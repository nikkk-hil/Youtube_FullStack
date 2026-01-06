import React from "react";
import { getAgoTime } from "../../utils/time";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Comment({ comment }) {
  const {user} = useAuth()
  return (
    <div className="flex justify-between m-2">
      <div className="flex">
        <div>
          <img
            src={comment.owner[0].avatar}
            alt="comment-holder-profile-pic"
            className="h-8 rounded-full m-2"
          />
        </div>
        <div>
          <div className="m-1">{comment.owner[0].username}</div>
          <div>{comment.content}</div>
        </div>
        <div className="text-xs m-2">{getAgoTime(comment.createdAt)}</div>
      </div>
      <div className="flex gap-2">
        <div>
          <div>Like</div>
          <div>{comment.likesCount}</div>
        </div>
        <div>delete</div>
      </div>
    </div>
  );
}

export default Comment;
