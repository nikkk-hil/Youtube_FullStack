import api from "./client.api.js";

const createPlaylist = (data) => api.post("/playlist/create", data);
const getUserPlaylists = (userId) => api.get(`/playlist/get-user-playlists/${userId}`);
const getPlaylistById = (playlistId) => api.get(`/playlist/get-playlist/${playlistId}`);
const addVideoToPlaylist = (playlistId, videoId) => api.patch(`/playlist/add-video/${playlistId}/${videoId}`);
const removeVideoFromPlaylist = (playlistId, videoId) => api.patch(`/playlist/remove-video/${playlistId}/${videoId}`);
const deletePlaylist = (playlistId) => api.get(`/playlist/delete/${playlistId}`);
const updatePlaylist = (playlistId, data) => api.patch(`/playlist/update/${playlistId}`, data);

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}