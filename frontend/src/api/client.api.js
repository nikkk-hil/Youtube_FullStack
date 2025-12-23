import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true // with this cors will not be "*" you have to define the exact frontend path
})

export default api