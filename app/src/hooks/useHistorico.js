import { useState, useMemo } from "react";

export function useHistorico(apiData = []) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [tipoFilter, setTipoFilter] = useState("TODOS");
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [observations, setObservations] = useState({});
  const [newObservation, setNewObservation] = useState('');
  const [editingObservation, setEditingObservation] = useState(null);
  
  const itemsPerPage = 10;

  const sourceData = Array.isArray(apiData) ? apiData : []

  const filteredData = useMemo(() => {
    return sourceData.filter(item => {
      const matchesSearch = item.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.usuario?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTipo = tipoFilter === "TODOS" || item.origem === tipoFilter;
      
      return matchesSearch && matchesTipo;
    });
  }, [searchTerm, tipoFilter, sourceData]);

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
    setNewObservation('');
    setEditingObservation(null);
  };

  const addObservation = () => {
    if (newObservation.trim() && selectedRecord) {
      const recordId = selectedRecord.id;
      const observation = {
        id: Date.now(),
        text: newObservation.trim(),
        author: 'Equipe de Controle',
        date: new Date().toLocaleString('pt-BR'),
        type: 'observation'
      };
      
      setObservations(prev => ({
        ...prev,
        [recordId]: [...(prev[recordId] || []), observation]
      }));
      setNewObservation('');
    }
  };

  const editObservation = (observationId, newText) => {
    if (selectedRecord) {
      const recordId = selectedRecord.id;
      setObservations(prev => ({
        ...prev,
        [recordId]: prev[recordId]?.map(obs => 
          obs.id === observationId ? { ...obs, text: newText, date: new Date().toLocaleString('pt-BR') } : obs
        ) || []
      }));
      setEditingObservation(null);
    }
  };

  const deleteObservation = (observationId) => {
    if (selectedRecord) {
      const recordId = selectedRecord.id;
      setObservations(prev => ({
        ...prev,
        [recordId]: prev[recordId]?.filter(obs => obs.id !== observationId) || []
      }));
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
    handleTechnicalDetails,
    closeTechnicalDetails,
    addObservation,
    editObservation,
    deleteObservation
  };
}
