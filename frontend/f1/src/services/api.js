import axios from "axios";

const api = axios.create({
  baseURL: "https://events-6-j7cr.onrender.com",
  withCredentials: true,
});

export default api;
