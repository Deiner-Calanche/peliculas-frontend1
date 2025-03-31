import { axiosInstance } from "../helper/axios-config";


//Obtener Director

const getDirectores = () => {
    return axiosInstance.get('directores',{
        headers:{
            'Content-Type': 'application/json'
        }
    });
}


//Crear Director

const createDirector = (data) => {
    return axiosInstance.post('directores', data,{
        headers:{
            'Content-Type': 'application/json' 
        }
    });
}

//Actualizar Director por ID

const updateDirector = (directorId, data) => {
    return axiosInstance.put (`directores/${directorId}`, data,{
        headers:{
            'Content-Type': 'application/json'
        }
        
    });
}

//Eliminar Director por ID

const deleteDirector = (directorId) => {
    return axiosInstance.delete (`directores/${directorId}`, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
}
export{
    getDirectores, createDirector, updateDirector, deleteDirector 
};