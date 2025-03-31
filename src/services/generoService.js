import { axiosInstance } from "../helper/axios-config";

// Obtener Géneros
const getGeneros = () => {
    return axiosInstance.get('generos', {
        headers: {  
            'Content-Type': 'application/json'
        }
    });
};

// Crear Género
const createGenero = (data) => {
    return axiosInstance.post('generos', data, {
        headers: {
            'Content-Type': 'application/json' 
        }
    });
};

// Actualizar Género por ID
const updateGenero = (generoId, data) => {
    return axiosInstance.put(`generos/${generoId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Eliminar Género por ID
const deleteGenero = (generoId) => {
    return axiosInstance.delete(`generos/${generoId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export { getGeneros, createGenero, updateGenero, deleteGenero };
