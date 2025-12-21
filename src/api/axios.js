import axios from "axios";

const api = axios.create({
  baseURL: "https://fleet-backend-w0b6.onrender.com/api",
  withCredentials: true,
});

export default api;
