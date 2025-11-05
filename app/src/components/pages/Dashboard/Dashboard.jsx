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
  Bell,
  Trash2,
  BookOpen,
  X,
  Plus,
  MessageSquare,
  Check,
  Activity
} from "lucide-react";
import { useDashboard } from "../../../hooks/useDashboard";
import {useEffect, useState} from "react";
import SystemTotals from "./partials/SystemTotals";
import MissingDocs from "./partials/MissingDocs";
import RecentRecords from "./partials/RecentRecords";
import { getDashboardMetrics } from "../../../services/dashboardService";

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

  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function loadData(){
      try{
        const data = await getDashboardMetrics();
        setMetrics(data);
      }catch(error){
        console.error("Erro ao carregar métricas do dashboard:", error);
      }finally{
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="overview-section">
        <SystemTotals metrics={metrics} loading={loading}/>
        <MissingDocs metrics={metrics}/>
        <RecentRecords handleTechnicalDetails={handleTechnicalDetails}/>
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
