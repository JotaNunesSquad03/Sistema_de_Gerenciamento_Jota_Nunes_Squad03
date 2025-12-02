import api from "./api";

export const getDependencias = async () =>{
    const response = await api.get('/dependencias');
    return response.data;
}

export const createDependencia = async (payload) =>{
    const response = await api.post('/dependencias', payload);
    return response.data;
}

