import "./Dashboard.scss";
import { 
  Search,
  BarChart3,
  User,
  AlertTriangle,
  Users,
  Filter,
  Edit,
  Eye,
  Trash2,
  BookOpen,
  X,
  Plus,
  MessageSquare,
  Check,
  Activity
} from "lucide-react";
import { useDashboard } from "../../../hooks/useDashboard";

export default function Dashboard() {
  const {
    showFilter,
    showTechnicalDetails,
    selectedRecord,
    observations,
    newObservation,
    editingObservation,
    setNewObservation,
    setEditingObservation,
    handleTechnicalDetails,
    closeTechnicalDetails,
    addObservation,
    editObservation,
    deleteObservation,
    toggleFilter
  } = useDashboard();

  return (
    <div className="dashboard-page">
      <div className="overview-section">
        <h2>Visão Geral das métricas</h2>
        <button className="filter_button" onClick={toggleFilter}>
          <Filter className="filter-icon" />Filtros 
        </button>
        {showFilter && (
          <div className="filter_container">
            <div className="filter_group">
              <div className="input">
                <label>Data de Início</label>
                <input type='date'></input>
              </div>
              <div className="input">
                <label>Data de Fim</label>
                <input type='date'></input>
              </div>
            </div>
          </div>
        )}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">
              <BarChart3 />
            </div>
            <div className="metric-content">
              <div className="metric-value">320</div>
              <p>Novos Registros (quantidade ou último registro)</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Eye />
            </div>
            <div className="metric-content">
              <div className="metric-value">12</div>
              <p>Alterações recentes feitas nos últimos 7 dias</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <AlertTriangle />
            </div>
            <div className="metric-content">
              <div className="metric-value">5</div>
              <p>Alertas pendentes</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Users />
            </div>
            <div className="metric-content">
              <div className="metric-value">110</div>
              <p>Usuários ativos</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <AlertTriangle />
            </div>
            <div className="metric-content">
              <div className="metric-value">3</div>
              <p>Dependências críticas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="registros-section">
        <div className="table-container">
          <div className="table-header">
            <h2>Visão Geral novos registros criados</h2>
            <div className="search-bar">
              <div className="search-input">
                <Search className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="search-field"
                />
              </div>
            </div>
          </div>
          <table className="registros-table">
            <thead>
              <tr>
                <th>Nome do Registro</th>
                <th>Criado por</th>
                <th>Status</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <BookOpen 
                      className="action-icon" 
                      title="Detalhes técnicos" 
                      onClick={() => handleTechnicalDetails({
                        name: "Text",
                        createdBy: "Sarah Eastern",
                        status: "LABEL",
                        date: "2023/09/17"
                      })}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <BookOpen 
                      className="action-icon" 
                      title="Detalhes técnicos" 
                      onClick={() => handleTechnicalDetails({
                        name: "Text",
                        createdBy: "Sarah Eastern",
                        status: "LABEL",
                        date: "2023/09/17"
                      })}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <BookOpen 
                      className="action-icon" 
                      title="Detalhes técnicos" 
                      onClick={() => handleTechnicalDetails({
                        name: "Text",
                        createdBy: "Sarah Eastern",
                        status: "LABEL",
                        date: "2023/09/17"
                      })}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <BookOpen 
                      className="action-icon" 
                      title="Detalhes técnicos" 
                      onClick={() => handleTechnicalDetails({
                        name: "Text",
                        createdBy: "Sarah Eastern",
                        status: "LABEL",
                        date: "2023/09/17"
                      })}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <BookOpen 
                      className="action-icon" 
                      title="Detalhes técnicos" 
                      onClick={() => handleTechnicalDetails({
                        name: "Text",
                        createdBy: "Sarah Eastern",
                        status: "LABEL",
                        date: "2023/09/17"
                      })}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <div className="user-info">
                    <div className="user-avatar sarah-avatar">
                      <User />
                    </div>
                    <span>Sarah Eastern</span>
                  </div>
                </td>
                <td>
                  <span className="status-label">LABEL</span>
                </td>
                <td>2023/09/17</td>
                <td>
                  <div className="action-icons">
                    <BookOpen 
                      className="action-icon" 
                      title="Detalhes técnicos" 
                      onClick={() => handleTechnicalDetails({
                        name: "Text",
                        createdBy: "Sarah Eastern",
                        status: "LABEL",
                        date: "2023/09/17"
                      })}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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
                      <span className="detail-value">{selectedRecord?.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Criado por:</span>
                      <span className="detail-value">{selectedRecord?.createdBy}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">{selectedRecord?.status}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Data de Criação:</span>
                      <span className="detail-value">{selectedRecord?.date}</span>
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
                    {observations[selectedRecord?.name]?.length > 0 ? (
                      observations[selectedRecord.name].map((observation) => (
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
