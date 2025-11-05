import { BarChart3, AlertTriangle, Bell, Activity } from "lucide-react";

export default function SystemTotals({metrics,loading}){
    const totals = [
        {icon: <BarChart3 />, label: 'Formulas Visuais', value: metrics?.totais?.fv},
        {icon: <AlertTriangle />, label: 'Consultas SQL', value: metrics?.totais?.sql},
        {icon: <Bell />, label: 'Relatórios', value: metrics?.totais?.report},
        {icon: <Activity />, label: 'Dependências', value: metrics?.totais?.dependencias},
    ]
    
    return(
        <div>
             <h3>Totais do Sistema</h3>
             <div className="metrics-grid">
                {loading ? (
                    <div>Carregando métricas...</div>
                ): (
                    totals.map((card,index)=>(
                        <div key={index} className="metric-card">
                            <div className="metric-icon">{card.icon}</div>
                            <div className="metric-content">
                                <div className="metric-value">{card.value ?? "-"}</div>
                                <p>{card.label}</p>
                            </div>
                        </div>
                    ))
                )}
             </div>
        </div>
    )
}