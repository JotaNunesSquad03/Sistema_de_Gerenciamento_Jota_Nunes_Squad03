import { useState } from "react";

export const useDashboard = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [observations, setObservations] = useState({});
  const [newObservation, setNewObservation] = useState('');
  const [editingObservation, setEditingObservation] = useState(null);

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

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return {
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
  };
};
