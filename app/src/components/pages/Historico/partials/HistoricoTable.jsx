import { BookOpen, User } from "lucide-react";

export default function HistoricoTable({ 
  currentData, 
  getStatusClass, 
  getTipoClass, 
  handleTechnicalDetails 
}) {
  return (
    <>
      <table className="historico-table">
        <thead>
          <tr>
            <th>Nome do Registro</th>
            <th>Criado por</th>
            <th>Status</th>
            <th>Tipo</th>
            <th>Data de Criação</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td className="nome-cell">{item.nome}</td>
              <td>
                <div className="user-info">
                  <div className="user-avatar">
                    <User />
                  </div>
                  <span>{item.criadoPor}</span>
                </div>
              </td>
              <td>
                <span className={`status-label ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td>
                <span className={`tipo-label ${getTipoClass(item.tipo)}`}>
                  {item.tipo}
                </span>
              </td>
              <td>{item.dataCriacao}</td>
              <td className="descricao-cell">{item.descricao}</td>
              <td>
                <div className="action-icons">
                  <BookOpen 
                    className="action-icon" 
                    title="Detalhes técnicos"
                    onClick={() => handleTechnicalDetails(item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentData.length === 0 && (
        <div className="no-data">
          <p>Nenhum registro encontrado com os filtros aplicados.</p>
        </div>
      )}
    </>
  );
}

