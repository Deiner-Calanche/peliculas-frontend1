import { axiosInstance } from "../helper/axios-config";

// Obtener Tipos
const getTipos = () => {
    return axiosInstance.get('tipos', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Crear Tipo
const createTipo = (data) => {
    return axiosInstance.post('tipos', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Actualizar Tipo por ID
const updateTipo = (tipoId, data) => {
    return axiosInstance.put(`tipos/${tipoId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Eliminar Tipo por ID
const deleteTipo = (tipoId) => {
    return axiosInstance.delete(`tipos/${tipoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export { getTipos, createTipo, updateTipo, deleteTipo };
