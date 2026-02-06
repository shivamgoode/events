import axios from "axios";

const api = axios.create({
  baseURL: "https://events-3-pcgs.onrender.com",
  withCredentials: true,
});

export default api;
