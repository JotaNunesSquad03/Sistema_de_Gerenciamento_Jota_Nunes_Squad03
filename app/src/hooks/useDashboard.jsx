import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { getDashboardMetrics } from "../services/dashboardService";
import { getRecentRecords } from "../services/recentRecords";
import { getDocumentation, createDocumentation, deleteDocumentation } from "../services/documentationService";

export const useDashboard = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [metrics, setMetrics] = useState(null);
  const [recentRecords, setRecentRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [documentation, setDocumentation] = useState(null);
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

  const prevMetricsRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [metricsData, recordsData] = await Promise.all([
          getDashboardMetrics(),
          getRecentRecords()
        ]);
        
        setMetrics(metricsData);
        setRecentRecords(recordsData);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        toast.error("Erro ao carregar dados do dashboard. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updated = await getDashboardMetrics();
        setMetrics(updated);
      } catch (error) {
        console.error("Erro ao atualizar métricas do dashboard:", error);
        toast.error("Erro ao atualizar métricas do dashboard. Tente novamente mais tarde.");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Monitorar mudanças nas métricas e exibir toasts
  useEffect(() => {
    if (!metrics) return;

    const prev = prevMetricsRef.current;

    if (!prev) {
      prevMetricsRef.current = metrics;
      return;
    }

    const curr = metrics;
    const messages = [];


    if (prev.totais.fv !== curr.totais.fv) {
      const diff = curr.totais.fv - prev.totais.fv;
      messages.push(`FV total: ${diff > 0 ? "+" + diff : diff}`);
    }

    if (prev.totais.sql !== curr.totais.sql) {
      const diff = curr.totais.sql - prev.totais.sql;
      messages.push(`SQL total: ${diff > 0 ? "+" + diff : diff}`);
    }

    if (prev.totais.report !== curr.totais.report) {
      const diff = curr.totais.report - prev.totais.report;
      messages.push(`Report total: ${diff > 0 ? "+" + diff : diff}`);
    }

    const novosPrev = prev.ultimos_30_dias.novos;
    const novosCurr = curr.ultimos_30_dias.novos;

    if (novosPrev.fv !== novosCurr.fv) {
      messages.push(`FV: ${novosCurr.fv} novos documentos`);
    }

    if (novosPrev.sql !== novosCurr.sql) {
      messages.push(`SQL: ${novosCurr.sql} novos documentos`);
    }

    if (novosPrev.report !== novosCurr.report) {
      messages.push(`Report: ${novosCurr.report} novos documentos`);
    }

    const altPrev = prev.ultimos_30_dias.alterados;
    const altCurr = curr.ultimos_30_dias.alterados;

    if (altPrev.fv !== altCurr.fv) {
      messages.push(`FV: ${altCurr.fv} documentos alterados`);
    }

    if (altPrev.sql !== altCurr.sql) {
      messages.push(`SQL: ${altCurr.sql} documentos alterados`);
    }

    if (altPrev.report !== altCurr.report) {
      messages.push(`Report: ${altCurr.report} documentos alterados`);
    }

    console.log("Prev:", prevMetricsRef.current);
    console.log("Curr:", metrics);
    console.log("Mensagens geradas:", messages);


    const semPrev = prev.sem_documentacao;
    const semCurr = curr.sem_documentacao;

    if (semPrev.fv !== semCurr.fv) {
      messages.push(`FV sem documentação: ${semCurr.fv}`);
    }

    if (semPrev.sql !== semCurr.sql) {
      messages.push(`SQL sem documentação: ${semCurr.sql}`);
    }

    if (semPrev.report !== semCurr.report) {
      messages.push(`Report sem documentação: ${semCurr.report}`);
    }

    if (messages.length > 0) {
      messages.forEach((msg) =>
        toast.custom(
          <div className="custom-toast custom-toast--info">
            <div className="custom-toast__icon">ℹ️</div>
            <div className="custom-toast__body">
              <div className="custom-toast__title">Atualização de métricas</div>
              <div className="custom-toast__message">{msg}</div>
            </div>
          </div>
        )
      );
    }

    prevMetricsRef.current = JSON.parse(JSON.stringify(curr));
  }, [metrics]);

  useEffect(() => { 
    async function loadDocumentacao() {
      if (!selectedRecord) return;
      setLoadingDocs(true);
      try {
        const data = await getDocumentation(
          selectedRecord.origem,
          selectedRecord.id
        );
        setDocumentation(data);
      } catch (error) {
        console.error("Erro ao carregar documentação técnica:", error);
        toast.error("Erro ao carregar documentação técnica. Tente novamente mais tarde.");
        setDocumentation([]);
      }
      setLoadingDocs(false);
    }
    if (showTechnicalDetails) {
      loadDocumentacao();
    }
  }, [showTechnicalDetails, selectedRecord]);

  const handleTechnicalDetails = (record) => {
    setSelectedRecord(record);
    setShowTechnicalDetails(true);
  };

  const closeTechnicalDetails = () => {
    setShowTechnicalDetails(false);
    setSelectedRecord(null);
    setShowCreateDocForm(false);
  };

 
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleDocChange = (e) => {
    setDocForm({
      ...docForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateDocumentation = async () => {
    if (!selectedRecord) {
      toast.error("Nenhum registro selecionado. Por favor, selecione um registro primeiro.");
      return;
    }

    if (!docForm.DESCRICAO.trim()) {
      toast.error("O campo Descrição é obrigatório!");
      return;
    }

    if (!docForm.FUNCIONALIDADES.trim()) {
      toast.error("O campo Funcionalidades é obrigatório!");
      return;
    }

    if (!docForm.CONFIGURACOES.trim()) {
      toast.error("O campo Configurações é obrigatório!");
      return;
    }

    if (!docForm.TABELA || !docForm.ID_REGISTRO) {
      toast.error("Erro: Tabela ou ID do registro não encontrado. Por favor, feche e abra novamente os detalhes técnicos.");
      return;
    }

    try {
      await createDocumentation(docForm);
      toast.success("Documentação técnica criada com sucesso!");

      setShowCreateDocForm(false);

      const data = await getDocumentation(
        selectedRecord.origem,
        selectedRecord.id
      );
      setDocumentation(data);

      setDocForm((prev) => ({
        ...prev,
        DESCRICAO: "",
        FUNCIONALIDADES: "",
        CONFIGURACOES: "",
        OBSERVACAO: "",
      }));
    } catch (error) {
      console.error("Erro ao criar documentação técnica:", error);
      
      let errorMessage = "Erro ao criar documentação técnica. ";
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage += "Você não está autenticado. Por favor, faça login novamente.";
        } else if (error.response.status === 403) {
          errorMessage += "Você não tem permissão para criar documentação.";
        } else if (error.response.status === 400) {
          errorMessage += error.response.data?.message || "Dados inválidos. Verifique os campos preenchidos.";
        } else if (error.response.status === 500) {
          errorMessage += "Erro no servidor. Tente novamente mais tarde.";
        } else {
          errorMessage += error.response.data?.message || `Erro ${error.response.status}: ${error.response.statusText}`;
        }
      } else if (error.request) {
        errorMessage += "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.";
      } else {
        errorMessage += error.message || "Erro desconhecido.";
      }
      
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (!selectedRecord) return;
  
    setDocForm((prev) => ({
      ...prev,
      TABELA: selectedRecord.origem,
      ID_REGISTRO: String(selectedRecord.id), 
    }));
  }, [selectedRecord]);

  const handleDeleteDocumentation = async (docID) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta documentação técnica?");
    if (!confirmDelete) return;

    try {
      await deleteDocumentation(docID);
      toast.success("Documentação técnica excluída com sucesso!");

      const updatedDocs = await getDocumentation(
        selectedRecord.origem,
        selectedRecord.id
      );

      setDocumentation(updatedDocs);
    } catch (error) {
      console.error("Erro ao excluir documentação técnica:", error);
      toast.error("Erro ao excluir documentação técnica. Tente novamente mais tarde.");
    }
  };

  return {
    // UI states
    showFilter,
    showTechnicalDetails,
    selectedRecord,
    
    // Dashboard data
    metrics,
    recentRecords,
    loading,
    
    // Documentation
    documentation,
    loadingDocs,
    showCreateDocForm,
    setShowCreateDocForm,
    docForm,
    
    // Handlers - UI
    handleTechnicalDetails,
    closeTechnicalDetails,
    toggleFilter,
  
    
    // Handlers - Documentation
    handleDocChange,
    handleCreateDocumentation,
    handleDeleteDocumentation,
  };
};
