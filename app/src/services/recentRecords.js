import api from "./api";

export async function getRecentRecords(){
    const response = await api.get('/aud/ultimos')
    return response.data;
}