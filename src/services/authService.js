// src/services/authService.js
import { axiosInstance } from "../helper/axios-config";

export const login = async (email, password) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.access_token);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login";
};

export const recuperarContrasena = async (email, password = null) => {
  const res = await axiosInstance.post("/auth/recuperar", {
    email,
    ...(password && { password }), 
  });
  return res.data;
};
