// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// read token from either `token` or `user` saved in localStorage
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if(err.response?.status === 401){
      localStorage.clear();
      window.location.href = "/auth";
    }
    return Promise.reject(err);
  }
);

export default API;
