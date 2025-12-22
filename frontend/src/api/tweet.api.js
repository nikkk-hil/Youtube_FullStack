import api from "./client.api.js";

const createTweet = (data) => api.post("/tweet/create-tweet", data);
const getTweet = () => api.get("/tweet/get-tweet");
const updateTweet = (tweetId, data) => api.patch(`/tweet/update-tweet/${tweetId}`, data);
const deleteTweet = (tweetId) => api.get(`/tweet/delete-tweet/${tweetId}`);

export {
    createTweet,
    getTweet,
    updateTweet,
    deleteTweet
}