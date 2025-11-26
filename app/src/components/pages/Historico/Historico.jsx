import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Plus,
  MessageSquare,
  Check,
  Edit,
  Trash2
} from "lucide-react";
import { useHistorico } from "../../../hooks/useHistorico";
import HistoricoTable from "./partials/HistoricoTable";
import { getHistoryTable } from "../../../services/historytable";
import "./Historico.scss";
import { useState, useEffect } from "react";

export default function Historico() {
  const [historyTable, setHistoryTable] = useState([]);

  useEffect(()=>{
    async function loadData(){
      try{
        const data = await getHistoryTable();
        const historyData = Array.isArray(data) 
          ? data 
          : (data?.data || data?.items || []);
        setHistoryTable(historyData);
      }catch(error){
        console.error("Erro ao carregar dados do histórico", error);
        setHistoryTable([]);
      }
    }
    loadData();
  },[]);

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
    // Documentation
    documentation,
    loadingDocs,
    showCreateDocForm,
    setShowCreateDocForm,
    docForm,
    setSearchTerm,
    setShowFilter,
    setStatusFilter,
    setTipoFilter,
    setNewObservation,
    setEditingObservation,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    handleTechnicalDetails,
    closeTechnicalDetails,
    addObservation,
    editObservation,
    deleteObservation,
    // Documentation handlers
    handleDocChange,
    handleCreateDocumentation,
    handleDeleteDocumentation,
  } = useHistorico(historyTable);

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
        
        <HistoricoTable 
          historyTable={currentData}
          handleTechnicalDetails={handleTechnicalDetails}
        />
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
                      <span className="detail-label">Id do registro:</span>
                      <span className="detail-value">{selectedRecord?.id}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Descrição:</span>
                      <span className="detail-value">{selectedRecord?.descricao}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Criado por:</span>
                      <span className="detail-value">{selectedRecord?.usuario}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Origem:</span>
                      <span className="detail-value">{selectedRecord?.origem}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Data de Criação:</span>
                      <span className="detail-value">{selectedRecord?.data?.split('T')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Documentação Técnica</h4>

                  {documentation?.length > 0 ? (
                    <button className="btn-secondary" disabled>
                      <Plus size={16} />
                      Criar Documentação 
                    </button>
                  ) : (
                    <button className="btn-secondary" onClick={() => setShowCreateDocForm(!showCreateDocForm)}>
                      <Plus size={16} />
                      Criar Documentação 
                    </button>
                  )}

                  {showCreateDocForm && (
                    <div>
                      <input 
                        className="input-doc"
                        name="DESCRICAO"
                        placeholder="Descrição"
                        value={docForm.DESCRICAO}
                        onChange={handleDocChange}
                      />
                      <input
                        className="input-doc"
                        name="FUNCIONALIDADES"
                        placeholder="Funcionalidades"
                        value={docForm.FUNCIONALIDADES}
                        onChange={handleDocChange}
                      />
                      <input
                        className="input-doc"
                        name="CONFIGURACOES"
                        placeholder="Configurações"
                        value={docForm.CONFIGURACOES}
                        onChange={handleDocChange}
                      />
                      <textarea
                        className="input-doc"
                        name="OBSERVACAO"
                        placeholder="Observação"
                        value={docForm.OBSERVACAO}
                        onChange={handleDocChange}
                      />

                      <button onClick={handleCreateDocumentation} className="btn-add-observation">
                        Salvar Documentação
                      </button>
                    </div>
                  )}

                  <div className="documentation-content">
                    {loadingDocs ? (
                      <div>Carregando documentação...</div>
                    ) : documentation?.length > 0 ? (
                      documentation.map((doc, index) => (
                        <div key={index}>
                          <p><strong>ID do Registro:</strong> {doc.ID_REGISTRO}</p>
                          <p><strong>Tabela:</strong> {doc.TABELA}</p>
                          <p><strong>Descrição:</strong> {doc.DESCRICAO}</p>
                          <p><strong>Funcionalidades:</strong> {doc.FUNCIONALIDADES}</p>
                          <p><strong>Configurações:</strong> {doc.CONFIGURACOES}</p>
                          <p><strong>ID Interno:</strong> {doc.ID}</p>

                          <p><strong>Criado em:</strong> {doc.RECCREATEDON.split('T')[0]}</p>
                          <p><strong>Modificado em:</strong> {doc.RECMODIFIEDON ? doc.RECMODIFIEDON.split('T')[0] : 'Nunca modificado'}</p>

                          <button className="btn-delete" onClick={() => handleDeleteDocumentation(doc.ID)}>
                            <Trash2 size={16} />Deletar Documentação
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>Nenhuma documentação encontrada.</p>
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
