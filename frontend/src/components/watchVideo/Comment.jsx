import React from "react";
import { getAgoTime } from "../../utils/time";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../componentCollection.js";
import { toggleCommentLike } from "../../api/like.api.js";
import { deleteComment } from "../../api/comment.api.js";

function Comment({ comment }) {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [like, setLike] = useState(comment.likesCount)
  const [eligibleToDelete, setEligibleToDelete] = useState(user._id !== comment.owner[0]._id)
  const [deleted, setDeleted] = useState(false)


  const handleCommentLike = () => {
    setIsLiking(true)
    toggleCommentLike(comment._id)
      .then( (res) => {
        console.log(res.data)
        if (res.data.message === "Unliked")
          setLike(prev => prev - 1)
        else
          setLike(prev => prev + 1)
      })
      .catch( (err) => console.error(err))
      .finally( () => setIsLiking(false) )
  }

  const handleDeleteComment = () => {
    setIsDeleting(true)
    deleteComment(comment._id)
      .then( (res) => {
        console.log(res.data)
        setDeleted(true)
      })
      .catch( (err) => console.error(err))
      .finally(() => setIsDeleting(false))
  }

  return (
    <div className="flex justify-between m-2 mb-6" hidden={deleted}>
      <div className="flex">
        <div>
          <img
            src={comment.owner[0].avatar}
            alt="comment-holder-profile-pic"
            className="h-8 rounded-full m-2"
          />
        </div>
        <div>
          <div className="m-1 text-gray-300">{comment.owner[0].username}</div>
          <div className="text-white">{comment.content}</div>
        </div>
        <div className="text-xs m-2 text-gray-400">{getAgoTime(comment.createdAt)}</div>
      </div>
      <div className="flex gap-2">
        <div>
          <Button
            bgColor="bg-black"
            className="rounded-full text-sm active:bg-gray-800"
            disabled={isLiking}
            onClick={handleCommentLike}
          >
            {`👍 ${like}`}
          </Button>
        </div>
        <div>
          <Button
            bgColor="bg-black"
            className="rounded-full text-sm active:bg-gray-800"
            disabled={isDeleting}
            hidden={eligibleToDelete}
            onClick={handleDeleteComment}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
