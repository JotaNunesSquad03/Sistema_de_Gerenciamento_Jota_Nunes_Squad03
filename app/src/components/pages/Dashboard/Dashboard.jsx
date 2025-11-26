import "./Dashboard.scss";
import { Search,BarChart3, User, AlertTriangle,Users,Filter,Edit,Eye,Bell,Trash2,BookOpen,X,Plus,MessageSquare,Check,Activity
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
import { createDocumentation } from "../../../services/documentationService";
import { deleteDocumentation } from "../../../services/documentationService";

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
  const [showCreateDocForm, setShowCreateDocForm] = useState(false);
  const [docForm, setDocForm] = useState({
    TABELA: "",
    ID_REGISTRO: "",
    DESCRICAO: "",
    FUNCIONALIDADES: "",
    CONFIGURACOES: "",
    OBSERVACAO: "",
});

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
      setLoadingDocs(true);
      try{
        const data = await getDocumentation(
          selectedRecord.origem,
          selectedRecord.id
        )
        setdocumentation(data);
      }catch(error){
        console.error("Erro ao carregar documentação técnica:", error);
        setdocumentation([]);
      }
      setLoadingDocs(false)
    }
    if(showTechnicalDetails){
      loadDocumentacao();
    }
  },[showTechnicalDetails, selectedRecord]);

  useEffect(() => {
    console.log("selectedRecord =", selectedRecord);
  }, [selectedRecord]);

  //fill form fields when opening technical details
  useEffect(()=>{
    if(showTechnicalDetails && selectedRecord){
      setDocForm((prev)=>({
        ...prev,
        TABELA: selectedRecord.origem,
        ID_REGISTRO: selectedRecord.id
      }))
    }
  },[showTechnicalDetails, selectedRecord]);

  const handleDocChange = (e) =>{
    setDocForm({
      ...docForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateDocumentation = async () =>{
       // validation to ensure required fields are filled
      if (!docForm.DESCRICAO.trim()) {
        alert("O campo Descrição é obrigatório!");
        return;
      }

      if (!docForm.FUNCIONALIDADES.trim()) {
        alert("O campo Funcionalidades é obrigatório!");
        return;
      }

      if (!docForm.CONFIGURACOES.trim()) {
        alert("O campo Configurações é obrigatório!");
        return;
      }

      try{
        await createDocumentation(docForm);
        alert("Documentação técnica criada com sucesso!");

        setShowCreateDocForm(false);

        const data = await getDocumentation(
          selectedRecord.origem,
          selectedRecord.id
        )
        setdocumentation(data);

        setDocForm((prev) => ({
        ...prev,
        DESCRICAO: "",
        FUNCIONALIDADES: "",
        CONFIGURACOES: "",
        OBSERVACAO: "",
      }));

      } catch(error){
        console.error("Erro ao criar documentação técnica:", error);
      }
  }

  const handleDeleteDocumentation = async (docID) =>{
    const confirmDelete = confirm("Tem certeza que deseja excluir esta documentação técnica?");
    if(!confirmDelete) return;

    try{
      await deleteDocumentation(docID)
      alert("Documentação técnica excluída com sucesso!");

      const updatedDocs = await getDocumentation(
      selectedRecord.origem,
      selectedRecord.id
    );

    setdocumentation(updatedDocs);
    }catch(error){
      console.error("Erro ao excluir documentação técnica:", error);
      alert("Erro ao excluir documentação técnica. Tente novamente mais tarde.");
    }
  }
  

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
                  ):(
                    <button className="btn-secondary" onClick={()=>setShowCreateDocForm(!showCreateDocForm)}>
                    <Plus size={16} />
                    Criar Documentação 
                  </button>
                  )}

                  {showCreateDocForm && (
                    <div>
                      <input 
                      className="input-doc"
                      name='DESCRICAO'
                      placeholder="Descrição"
                      value={docForm.DESCRICAO}
                      onChange={handleDocChange}/>
                      <input
                      className="input-doc"
                      name='FUNCIONALIDADES'
                      placeholder="Funcionalidades"
                      value={docForm.FUNCIONALIDADES}
                      onChange={handleDocChange}/>
                      <input
                      className="input-doc"
                      name='CONFIGURACOES'
                      placeholder="Configurações"
                      value={docForm.CONFIGURACOES}
                      onChange={handleDocChange}
                      />
                      <textarea
                      className="input-doc"
                      name="OBSERVACAO"
                      placeholder="Observação"
                      value={docForm.OBSERVACAO}
                      onChange={handleDocChange}/>

                      <button onClick={handleCreateDocumentation} className="btn-add-observation">
                          Salvar Documentação
                      </button>
                    </div>
                  )}


                  <div className="documentation-content">
                    {loadingDocs? (
                      <div>Carregando documentação...</div>
                    ): documentation?.length > 0 ? (
                      documentation.map((doc,index) => (
                        <div key={index}>
                          <p><strong>ID do Registro:</strong> {doc.ID_REGISTRO}</p>
                          <p><strong>Tabela:</strong> {doc.TABELA}</p>
                          <p><strong>Descrição:</strong> {doc.DESCRICAO}</p>
                          <p><strong>Funcionalidades:</strong> {doc.FUNCIONALIDADES}</p>
                          <p><strong>Configurações: </strong> {doc.CONFIGURACOES}</p>
                          <p><strong>ID Interno:</strong> {doc.ID}</p>

                          <p><strong>Criado em:</strong> {doc.RECCREATEDON.split('T')[0]}</p>
                          <p><strong>Modificado em:</strong> { doc.RECMODIFIEDON ? doc.RECMODIFIEDON.split('T')[0] : 'Nunca modificado'}</p>

                          <button className="btn-delete" onClick={()=> handleDeleteDocumentation(doc.ID)}>
                            <Trash2 size={16} />Deletar Documentação
                          </button>
                        </div>
                      ))
                    ):(
                      <p>Nenhuma documentação encontrada.</p>
                    )}
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
