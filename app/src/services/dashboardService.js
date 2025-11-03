import api from "./api";

export const getDashboardMetrics = async ()=>{
    try{
        const response =await api.get("/dashboard")
        return response.data;
    } catch (error){
        console.error("Erro ao buscar métricas do dashboard:", error);
        throw error;
    }
}