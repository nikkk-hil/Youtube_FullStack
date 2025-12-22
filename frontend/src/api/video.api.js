import api from "./client.api.js";

const publishVideo = (data) => api.post("/video/publish-video", data);
const getVideoById = (videoId) => api.get(`/video/get-video/${videoId}`);
const updateVideo = (videoId, data) => api.patch(`/video/update-video/${videoId}`, data);
const deleteVideo = (videoId) => api.get(`/video/delete-video/${videoId}`);
const togglePublishStatus = (videoId) => api.get(`/video/toggle-publish-status/${videoId}`);

export {
    publishVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}