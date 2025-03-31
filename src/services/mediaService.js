import { axiosInstance } from '../helper/axios-config';

// Obtener todos los medios
const getMedios = () => {
    return axiosInstance.get('media', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Crear un nuevo medio
const createMedio = (data) => {
    return axiosInstance.post('media', data, {
        headers: { 'Content-Type': 'application/json' }
    });
};

// Obtener un medio por su ID
const getMedioById = (mediaId) => {
    return axiosInstance.get(`media/${mediaId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Actualizar un medio por su ID
const updateMedio = (mediaId, data) => {
    return axiosInstance.put(`media/${mediaId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Eliminar un medio por su ID
const deleteMedio = (mediaId) => {
    return axiosInstance.delete(`media/${mediaId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


export { getMedios, createMedio, updateMedio, deleteMedio, getMedioById };
