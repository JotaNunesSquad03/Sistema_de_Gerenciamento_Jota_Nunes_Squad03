import { BarChart3, FileText, Database, FileBarChart } from "lucide-react";

export default function RecentChanges({metrics}){
    if(!metrics) return null;

    const {ultimos_30_dias} = metrics;

    const recentMetrics=[
        {icon: <FileText /> , label: 'Fórmulas Visuais', novos:ultimos_30_dias?.novos?.fv || 0, alterados:ultimos_30_dias?.alterados?.fv || 0},
        {icon: <Database /> , label: 'Consultas SQL', novos:ultimos_30_dias?.novos?.sql || 0, alterados:ultimos_30_dias?.alterados?.sql || 0},
        {icon: <FileBarChart /> , label: 'Relatórios', novos:ultimos_30_dias?.novos?.report || 0, alterados:ultimos_30_dias?.alterados?.report || 0},
    ]

    return(
        <div className="dashboard-section">
            <h3>Últimos 30 dias</h3>
            <div className="metrics-grid">
                {recentMetrics.map((item,index)=>(
                    <div key={index} className="metric-card">
                        <div className="metric-icon">{item.icon}</div>
                        <div className="metric-content">
                            <p className="">{item.label}</p>
                            <div className="recent-values">
                                <span className="new-value">{item.novos} <small>novos</small></span>
                                <span className="changed-value">{item.alterados} <small>alterados</small></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}