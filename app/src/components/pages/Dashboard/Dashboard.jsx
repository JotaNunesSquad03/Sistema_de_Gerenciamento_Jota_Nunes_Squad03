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
import RecentChanges from "./partials/RecentChanges";
import { getDashboardMetrics } from "../../../services/dashboardService";
import { getRecentRecords } from "../../../services/recentRecords";
import { getDocumentation } from "../../../services/documentationService";

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
  const [recentRecords, setRecentRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [documentation, setdocumentation] =useState(null)
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(()=>{
    async function loadData(){
      try{
        const data = await getDashboardMetrics();
        setMetrics(data);

        const records = await getRecentRecords();
        setRecentRecords(records);

      }catch(error){
        console.error("Erro ao carregar dados do dashboard:", error);
      }finally{
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(()=>{
    async function loadDocumentacao(){
      if (!selectedRecord) return;
      setLoading(true);
      try{
        const data = await getDocumentation(
          selectedRecord.origem,
          selectedRecord.id
        )
        setdocumentation(data);
      }catch(error){
        console.error("Erro ao carregar documentação técnica:", error);
        setdocumentation(null);
      }
      setLoadingDocs(false)
    }
    if(showTechnicalDetails){
      loadDocumentacao();
    }
  },[showTechnicalDetails, selectedRecord]);


  return (
    <div className="dashboard-page">
      <div className="overview-section">
        <SystemTotals metrics={metrics} loading={loading}/>
        <RecentChanges metrics= {metrics}/>
        <MissingDocs metrics={metrics}/>
        <RecentRecords records={recentRecords} handleTechnicalDetails={handleTechnicalDetails}/>
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
                  <div className="documentation-content">
                    {loadingDocs ? (
                      <p>Carregando documentação...</p>
                    ): !documentation ?(
                      <div className="no-doc">
                        <button className="btn-add-doc">
                          Criar Documentação
                        </button>
                      </div>
                    ):(
                      <div className="doc-view">
                        <p>mostra doc</p>
                      </div>)}  
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
                    {observations[selectedRecord?.id]?.length > 0 ? (
                      observations[selectedRecord.id].map((observation) => (
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
