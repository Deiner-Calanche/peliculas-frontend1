import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  // baseURL: "https://proyecto-peliculas-2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
