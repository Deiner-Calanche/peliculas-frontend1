import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  // baseURL: "https://proyecto-peliculas-2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// ✅ Interceptor para agregar token si existe
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agrega el token al header
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export { axiosInstance };
