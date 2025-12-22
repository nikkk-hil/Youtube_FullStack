import api from "./client.api.js";

const toggleSubscription = (channelId) => api.post(`/subscription/toggle-subscription/${channelId}`);
const getSubscribedChannels = (subscriberId) => api.get(`/subscription/get-subscribed-channels/${subscriberId}`);
const getChannelSubscribers = (channelId) => api.get(`/subscription/get-channel-subscribers/${channelId}`);

export {
    toggleSubscription,
    getChannelSubscribers,
    getSubscribedChannels
}