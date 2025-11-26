import api from './api'

export const getDocumentation = async (tabela,id_registro)=>{
    const response = await api.get(`/documentacao/${tabela}/${id_registro}`);
    return response.data;
}

export const createDocumentation = async (payload) =>{
    const response = await api.post('/documentacao/',payload)
    return response.data;
}

export const deleteDocumentation = async (id) =>{
    const response = await api.delete(`/documentacao/${id}`)
    return response.data;
}