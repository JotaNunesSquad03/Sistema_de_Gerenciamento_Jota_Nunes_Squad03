import {User,BookOpen,Search} from "lucide-react";

export default function RecentRecords({ handleTechnicalDetails}) {

    const records =[
        {name: "Relatório Financeiro 2025", createdBy: "Ana Silva", status: "Pendente", date: "2024-06-15"},
        {
            name: "Consulta SQL - Clientes Ativos",
            createdBy: "Lucas Almeida",
            status: "Em Revisão",
            date: "2025-10-28",
        },
        {
            name: "Formulário de Cadastro V2",
            createdBy: "João Silva",
            status: "Pendente",
            date: "2025-10-25",
        },
        {
            name: "Dashboard de Vendas",
            createdBy: "Ana Souza",
            status: "Aprovado",
            date: "2025-10-22",
        },
    ]

    const tableHeaders = [
        "Nome do Registro",
        "Criado por",
        "Status",
        "Data",
        "Ações"
    ]

    return(
        <div className="registros-section">
            <div className="table-container">
                <div className="table-header">
                    <h2>Últimos registros criados</h2>
                    <div className="search-bar">
                        <div className="search-input">
                            <Search className="search-icon"/>
                            <input type="text" placeholder="Buscar registros" className="search-field"/>
                        </div>
                    </div>
                </div>
                <table className="registros-table">
                    <thead>
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                            {records.length > 0 ? (
                                records.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.name}</td>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-avatar sarah-avatar">
                                                    <User/>
                                                </div>
                                                <span>{record.createdBy}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-label status-${record.status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td>{record.date}</td>
                                        <td>
                                            <div className="action-icons">
                                                <BookOpen
                                                    className="action-icon"
                                                    title="Detalhes técnicos"
                                                    onClick={()=> handleTechnicalDetails(record)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ): (
                                <tr>
                                    <td>
                                        Nenhum registro encontrado.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}