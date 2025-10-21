import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

const api = axios.create({
    baseURL : API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000
});

export default api;