import api from "./api";

export async function getHistoryTable(){
    const response = await api.get('/aud/historico?skip=0&limit=1000')
    return response.data;
}