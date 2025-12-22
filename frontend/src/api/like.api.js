import api from "./client.api.js";

const toggleVideoLike = (videoId) => api.post(`/like/toggle-video-like/${videoId}`);
const toggleCommentLike = (commentId) => api.post(`/like/toggle-comment-like/${commentId}`);
const toggleTweetLike = (tweetId) => api.post(`/like/toggle-tweet-like/${tweetId}`);
const getAllLikedVideos = () => api.get("/like/get-all-liked-videos");

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getAllLikedVideos
}