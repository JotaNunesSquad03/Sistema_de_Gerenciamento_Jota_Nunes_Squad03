import api from "./api";

export const getDependencias = async () =>{
    const response = await api.get('/dependencias');
    return response.data;
}

export const createDependencia = async (payload) =>{
    const response = await api.post('/dependencias', payload);
    return response.data;
}

export const getDependenciasRegistro = async (tabela,id) => {
    const response = await api.get(`/dependencias/registro/${tabela}/${id}`)
    return response.data;
}
export const createDependenciaRegistro = async (data) => {
    const response = await api.post('/dependencias/registro', data)
    return response.data;
}