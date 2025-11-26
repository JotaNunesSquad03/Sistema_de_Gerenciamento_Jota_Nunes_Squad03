import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { getDocumentation, createDocumentation, deleteDocumentation } from "../services/documentationService";

export function useHistorico(apiData = []) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [tabelaFilter, setTabelaFilter] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [tipoFilter, setTipoFilter] = useState("TODOS");
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  
  
  // Estados de documentação
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
  
  const itemsPerPage = 10;

  const sourceData = Array.isArray(apiData) ? apiData : []

  const filteredData = useMemo(() => {
    return sourceData.filter((item) => {
      const matchesSearch =
        item.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.usuario?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTipo = tipoFilter === "TODOS" || item.origem === tipoFilter;

      // NOVO: filtro por tabela
      const matchesTabela = tabelaFilter === "" || item.origem === tabelaFilter;

      return matchesSearch && matchesTipo && matchesTabela;
    });
  }, [searchTerm, tipoFilter, tabelaFilter, sourceData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  const handleTechnicalDetails = (record) => {
    setSelectedRecord(record);
    setShowTechnicalDetails(true);
  };

  const closeTechnicalDetails = () => {
    setShowTechnicalDetails(false);
    setSelectedRecord(null);
    setShowCreateDocForm(false);
  };

  // Carregar documentação quando abrir detalhes técnicos
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
        setDocumentation([]);
      }
      setLoadingDocs(false);
    }
    if (showTechnicalDetails) {
      loadDocumentacao();
    }
  }, [showTechnicalDetails, selectedRecord]);

  // Preencher formulário quando abrir detalhes técnicos
  useEffect(() => {
    if (showTechnicalDetails && selectedRecord) {
      setDocForm((prev) => ({
        ...prev,
        TABELA: selectedRecord.origem,
        ID_REGISTRO: selectedRecord.id
      }));
    }
  }, [showTechnicalDetails, selectedRecord]);

  useEffect(() => {
    if (!selectedRecord) return;
  
    setDocForm({
      TABELA: selectedRecord.origem,
      ID_REGISTRO: selectedRecord.id,
      DESCRICAO: "",
      FUNCIONALIDADES: "",
      CONFIGURACOES: "",
      OBSERVACAO: "",
    });
  }, [selectedRecord]);

  // Handlers de documentação
  const handleDocChange = (e) => {
    setDocForm({
      ...docForm,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateDocumentation = async () => {
    // Validação: verificar se selectedRecord existe
    if (!selectedRecord) {
      toast.error("Nenhum registro selecionado. Por favor, selecione um registro primeiro.");
      return;
    }

    // Validação: verificar se os campos obrigatórios estão preenchidos
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

    // Validação: verificar se TABELA e ID_REGISTRO estão preenchidos
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
      
      // Tratamento de erro mais detalhado
      let errorMessage = "Erro ao criar documentação técnica. ";
      
      if (error.response) {
        // Erro da API
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
        // Requisição foi feita mas não houve resposta
        errorMessage += "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.";
      } else {
        // Erro ao configurar a requisição
        errorMessage += error.message || "Erro desconhecido.";
      }
      
      toast.error(errorMessage);
    }
  };

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
    currentPage,
    searchTerm,
    showFilter,
    statusFilter,
    tipoFilter,
    showTechnicalDetails,
    selectedRecord,
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
    goToPage,
    goToPreviousPage,
    goToNextPage,
    handleTechnicalDetails,
    closeTechnicalDetails,
    // Documentation handlers
    handleDocChange,
    handleCreateDocumentation,
    handleDeleteDocumentation,
    tabelaFilter,
    setTabelaFilter,
  };
}
