import {User,BookOpen,Search} from "lucide-react";

export default function RecentRecords({ handleTechnicalDetails, records}) {

    const tableHeaders = [
        "ID",
        "Descrição do Registro",
        "Usuário",
        "Origem",
        "Data",
        "Ações"
    ]

    return(
        <div className="registros-section">
            <div className="table-container">
                <div className="table-header">
                    <h2>Últimos registros criados</h2>
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
                            {records && records.length>0 ? (
                                records.map((record,index)=>(
                                    <tr key={index}>
                                        <td>{record.id}</td>
                                        <td>{record.descricao}</td>
                                        <td>
                                            <div className="user-info">
                                                <div className="user-avatar sarah-avatar">
                                                    <User/>
                                                </div>
                                                <span>{record.usuario}</span>
                                            </div>
                                        </td>
                                        <td>{record.origem}</td>
                                        <td>{record.data?.split('T')[0]}</td>
                                        <td>
                                            <div className="action-icons">
                                                <BookOpen className="action-icon" onClick={()=>handleTechnicalDetails(record)} title='Detalhes Técnicos'/>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ):
                            (
                                <tr>
                                    <td colSpan='5'>Nenhum registro encontrado.</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}