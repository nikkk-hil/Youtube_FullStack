import api from "./client.api.js";

const getVideoComments = (videoId) => api.get(`/comment/get/${videoId}`);
const addComment = (videoId, data) => api.post(`/comment/add/${videoId}`, data);
const updateComment = (commentId, data) => api.patch(`/comment/update/${commentId}`, data);
const deleteComment = (commentId) => api.get(`/comment/delete/${commentId}`);

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}