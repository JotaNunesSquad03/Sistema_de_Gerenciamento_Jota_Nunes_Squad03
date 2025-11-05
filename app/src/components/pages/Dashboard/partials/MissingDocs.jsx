import { FileText, Database, FileBarChart, AlertCircle } from "lucide-react";

export default function MissingDocs({metrics}){

    const missingDocs=[
        {icon: <FileText />, label: 'Documentação de Formulas Visuais', value: metrics?.sem_documentacao?.fv},
        {icon: <Database />, label: 'Documentação de Consultas SQL', value: metrics?.sem_documentacao?.sql},
        {icon: <FileBarChart />, label: 'Documentação de Relatórios', value: metrics?.sem_documentacao?.report},
    ]

    return(
        <div className='dashboard-section'>
            <h3>Documentações Pendentes</h3>
            <div className='metrics-grid'>
                {missingDocs.map((item,index)=>(
                    <div key={index} className='metric-card missing-doc-card'>
                        <div className='metric-icon missing-doc-icon'>{item.icon}</div>
                        <div className='metric-content'>
                            <div className='metric-value missing-doc-value'>{item.value ?? "-"}</div>
                            <p className='missing-doc-label'>{item.label}</p>
                        </div>
                        {(item.value && item.value > 0) && (
                            <div className='missing-doc-badge'>
                                <AlertCircle size={14} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}