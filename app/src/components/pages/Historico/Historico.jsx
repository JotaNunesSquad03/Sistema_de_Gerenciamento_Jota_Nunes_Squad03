import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  BookOpen,
  Filter,
  X,
  Plus,
  MessageSquare,
  Check,
  Edit,
  Trash2
} from "lucide-react";
import { useHistorico } from "../../../hooks/useHistorico";
import "./Historico.scss";

export default function Historico() {
  const {
    currentPage,
    searchTerm,
    showFilter,
    statusFilter,
    tipoFilter,
    showTechnicalDetails,
    selectedRecord,
    observations,
    newObservation,
    editingObservation,
    filteredData,
    totalPages,
    startIndex,
    endIndex,
    currentData,
    itemsPerPage,
    setSearchTerm,
    setShowFilter,
    setStatusFilter,
    setTipoFilter,
    setNewObservation,
    setEditingObservation,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    getStatusClass,
    getTipoClass,
    handleTechnicalDetails,
    closeTechnicalDetails,
    addObservation,
    editObservation,
    deleteObservation
  } = useHistorico();

  return (
    <div className="historico-page">
      <div className="page-header">
        <h1>Histórico de Alterações</h1>
        <p>Consulte o histórico de todas as alterações realizadas no sistema.</p>
      </div>

      <div className="table-container">
        <div className="table-header">
          <h2>Registros de Alterações</h2>
          <div className="search-bar">
            <div className="search-input">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Filtrar" 
                className="search-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
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
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="pagination">
          <div className="pagination-info">
            Página {currentPage} de {totalPages}
          </div>
          
          <div className="pagination-controls">
            <button 
              className="pagination-btn"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
              Anterior
            </button>
            
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                // Mostrar apenas algumas páginas ao redor da atual
                if (
                  page === 1 || 
                  page === totalPages || 
                  (page >= currentPage - 2 && page <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={page}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 3 || 
                  page === currentPage + 3
                ) {
                  return <span key={page} className="page-ellipsis">...</span>;
                }
                return null;
              })}
            </div>
            
            <button 
              className="pagination-btn"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Próxima
              <ChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* Modal de Detalhes Técnicos */}
      {showTechnicalDetails && (
        <div className="modal-overlay" onClick={closeTechnicalDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalhes Técnicos da Customização</h3>
              <button className="close-button" onClick={closeTechnicalDetails}>
                <X />
              </button>
            </div>
            <div className="modal-body">
              <div className="technical-details">
                <div className="detail-section">
                  <h4>Informações do Registro</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Nome:</span>
                      <span className="detail-value">{selectedRecord?.nome}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Criado por:</span>
                      <span className="detail-value">{selectedRecord?.criadoPor}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">{selectedRecord?.status}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Tipo:</span>
                      <span className="detail-value">{selectedRecord?.tipo}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Data de Criação:</span>
                      <span className="detail-value">{selectedRecord?.dataCriacao}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Descrição:</span>
                      <span className="detail-value">{selectedRecord?.descricao}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Especificações Técnicas</h4>
                  <div className="technical-specs">
                    <div className="spec-item">
                      <span className="spec-label">Tipo de Customização:</span>
                      <span className="spec-value">Módulo de Relatórios</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Versão da API:</span>
                      <span className="spec-value">v2.1.3</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Framework Utilizado:</span>
                      <span className="spec-value">React 18.2.0</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Dependências:</span>
                      <span className="spec-value">Lodash, Axios, Chart.js</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Banco de Dados:</span>
                      <span className="spec-value">PostgreSQL 14.5</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Ambiente:</span>
                      <span className="spec-value">Produção</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Documentação Técnica</h4>
                  <div className="documentation-content">
                    <p><strong>Descrição:</strong> Este módulo implementa um sistema de relatórios personalizado que permite a geração de métricas em tempo real e exportação de dados em múltiplos formatos.</p>
                    
                    <p><strong>Funcionalidades Principais:</strong></p>
                    <ul>
                      <li>Geração de relatórios personalizados</li>
                      <li>Filtros avançados por período</li>
                      <li>Exportação em PDF, Excel e CSV</li>
                      <li>Cache inteligente para performance</li>
                      <li>Integração com APIs externas</li>
                    </ul>

                    <p><strong>Configurações Específicas:</strong></p>
                    <ul>
                      <li>Timeout de requisições: 30 segundos</li>
                      <li>Cache TTL: 5 minutos</li>
                      <li>Máximo de registros por página: 100</li>
                      <li>Compressão de dados: GZIP</li>
                    </ul>

                    <p><strong>Notas de Implementação:</strong></p>
                    <p>Esta customização foi desenvolvida seguindo os padrões de arquitetura definidos pela equipe de desenvolvimento. Utiliza hooks personalizados para gerenciamento de estado e implementa lazy loading para otimização de performance.</p>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>
                    <MessageSquare className="section-icon" />
                    Observações da Equipe de Controle
                  </h4>
                  
                  <div className="add-observation-form">
                    <div className="form-group">
                      <textarea
                        value={newObservation}
                        onChange={(e) => setNewObservation(e.target.value)}
                        placeholder="Adicione uma observação, customização ou nota sobre este registro..."
                        className="observation-input"
                        rows="3"
                      />
                      <button 
                        className="btn-add-observation" 
                        onClick={addObservation}
                        disabled={!newObservation.trim()}
                      >
                        <Plus className="btn-icon" />
                        Adicionar Observação
                      </button>
                    </div>
                  </div>

                  <div className="observations-list">
                    {observations[selectedRecord?.id || selectedRecord?.nome]?.length > 0 ? (
                      observations[selectedRecord.id || selectedRecord.nome].map((observation) => (
                        <div key={observation.id} className="observation-item">
                          <div className="observation-header">
                            <div className="observation-meta">
                              <span className="observation-author">{observation.author}</span>
                              <span className="observation-date">{observation.date}</span>
                            </div>
                            <div className="observation-actions">
                              <button
                                className="action-btn edit-btn"
                                onClick={() => setEditingObservation(observation.id)}
                                title="Editar observação"
                              >
                                <Edit />
                              </button>
                              <button
                                className="action-btn delete-btn"
                                onClick={() => deleteObservation(observation.id)}
                                title="Excluir observação"
                              >
                                <Trash2 />
                              </button>
                            </div>
                          </div>
                          
                          {editingObservation === observation.id ? (
                            <div className="edit-observation">
                              <textarea
                                defaultValue={observation.text}
                                className="edit-input"
                                rows="3"
                                ref={(textarea) => {
                                  if (textarea) {
                                    textarea.focus();
                                    textarea.select();
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.ctrlKey) {
                                    editObservation(observation.id, e.target.value);
                                  }
                                  if (e.key === 'Escape') {
                                    setEditingObservation(null);
                                  }
                                }}
                              />
                              <div className="edit-actions">
                                <button
                                  className="btn-save"
                                  onClick={(e) => {
                                    const textarea = e.target.parentElement.previousElementSibling;
                                    editObservation(observation.id, textarea.value);
                                  }}
                                >
                                  <Check className="btn-icon" />
                                  Salvar
                                </button>
                                <button
                                  className="btn-cancel"
                                  onClick={() => setEditingObservation(null)}
                                >
                                  <X className="btn-icon" />
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="observation-content">
                              {observation.text}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="no-observations">
                        <MessageSquare className="no-observations-icon" />
                        <p>Nenhuma observação adicionada ainda.</p>
                        <p>Adicione a primeira observação usando o formulário acima.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeTechnicalDetails}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
