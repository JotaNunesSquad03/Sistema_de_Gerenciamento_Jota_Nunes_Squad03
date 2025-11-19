import api from './api'

export const getDocumentation = async (tabela,id_registro)=>{
    const response = await api.get('/documentacao?tabela=${tabela}&id_registro=${id_registro}')
    return response.data;
}