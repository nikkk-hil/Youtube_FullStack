import api from "./client.api.js";

const healthCheck = () => api.get("/health-check");

export {
    healthCheck
}