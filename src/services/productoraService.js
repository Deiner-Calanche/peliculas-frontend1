import { axiosInstance } from "../helper/axios-config";

// Obtener Productoras
const getProductoras = () => {
    return axiosInstance.get('productoras', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Crear Productora
const createProductora = (data) => {
    return axiosInstance.post('productoras', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Actualizar Productora por ID
const updateProductora = (productoraId, data) => {
    return axiosInstance.put(`productoras/${productoraId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Eliminar Productora por ID
const deleteProductora = (productoraId) => {
    return axiosInstance.delete(`productoras/${productoraId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export { getProductoras, createProductora, updateProductora, deleteProductora };
