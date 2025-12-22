import api from "./client.api.js";

const getChannelStats = () => api.get("/dashboard/get-channel-stats");
const getChannelVideos = () => api.get("/dashboard/get-channel-videos");

export {
    getChannelStats,
    getChannelVideos
}