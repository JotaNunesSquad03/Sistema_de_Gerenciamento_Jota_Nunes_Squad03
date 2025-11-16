import { BookOpen, User } from "lucide-react";

export default function HistoricoTable({ 
  historyTable = [],
  handleTechnicalDetails 
}) {

    const tableHeaders = [
        "ID",
        "Descrição do Registro",
        "Usuário",
        "Origem",
        "Data de Alteração",
        "Ações"
    ]

    const data = Array.isArray(historyTable) ? historyTable : []

    return (
        <table className="historico-table">
            <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={item.id || index}>
                            <td>{item.id ? item.id : 'Sem ID'}</td>
                            <td>{item.descricao}</td>
                            <td>
                                <div className="user-info">
                                    <div className="user-avatar">
                                        <User />
                                    </div>
                                    <span>{item.usuario}</span>
                                </div>
                            </td>
                            <td>{item.origem}</td>
                            <td>{item.data?.split('T')[0] ? item.data?.split('T')[0] : 'Sem data'}</td>
                            <td>
                                <div className="action-icons">
                                    <BookOpen 
                                        className="action-icon" 
                                        onClick={() => handleTechnicalDetails(item)} 
                                        title="Detalhes Técnicos"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Nenhum registro encontrado.</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

