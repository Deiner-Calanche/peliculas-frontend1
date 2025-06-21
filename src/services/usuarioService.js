import { axiosInstance } from "../helper/axios-config";

// Obtener todos los usuarios
const getUsuarios = async () => {
  const res = await axiosInstance.get("/usuarios");
  return res.data;
};

// Crear un nuevo usuario
const createUsuario = async (data) => {
  const res = await axiosInstance.post("/usuarios", data);
  return res.data;
};

// Actualizar un usuario por ID
const updateUsuario = (usuarioId, data) => {
  return axiosInstance.put(`/usuarios/${usuarioId}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// Eliminar un usuario por ID
const deleteUsuario = (usuarioId) => {
  return axiosInstance.delete(`/usuarios/${usuarioId}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// Exportar todas las funciones
export {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
