import api from "./client.api.js";

const userRegistration = (data) => api.post("/user/registration", data);
const userLogin = (data) => api.post("/user/login", data);
const userLogout = () => api.post("/user/logout");
const refreshAccessToken = () => api.post("/user/refresh-access-token");
const changePassword = (data) => api.post("/user/change-password", data);
const editUserDetails = (data) => api.patch("/user/edit-user-details", data);
const getUser = () => api.get("/user/get-user");
const changeAvatar = (avatar) => api.patch("/user/update-avatar", avatar);
const changeCoverImage = (coverImg) => api.patch("/user/update-coverImage", coverImg);
const getUserChannelProfile = (username) => api.get(`/user/c/${username}`);
const getWatchHistory = () => api.get("/user/get-watchHistory");

export {
  userRegistration,
  userLogin,
  userLogout,
  refreshAccessToken,
  changePassword,
  editUserDetails,
  getUser,
  changeAvatar,
  changeCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
