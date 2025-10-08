import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';

// Caminhos corrigidos para a estrutura do projeto principal
import { dependencyData, riskRelations } from '../../data/mockData';
import Filters from './dependencias/Filters';
import DependencyGraph from './dependencias/DependencyGraph';
import RiskTable from './dependencias/RiskTable';
import NodeDetailsPanel from './dependencias/NodeDetailsPanel';

export default function DependenciasPage() {
  const [filters, setFilters] = useState({ search: '', type: '', risk: '' });
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [focusedNodes, setFocusedNodes] = useState(null);
  const [impactedPath, setImpactedPath] = useState(null);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ search: '', type: '', risk: '' });
  };

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
  };

  const handleClosePanel = () => {
    setSelectedNodeId(null);
  };

  const handleFocusRelation = (principalId, dependsOnId) => {
    setFocusedNodes([principalId, dependsOnId]);
    setTimeout(() => setFocusedNodes(null), 3000);
  };

  const handleAnalyzeImpact = (startNodeId) => {
    const nodesToVisit = [startNodeId];
    const impactedNodes = new Set([startNodeId]);
    const impactedEdges = new Set();
    const allEdges = dependencyData.edges.map((edge, index) => ({ ...edge, id: edge.id || `${edge.from}-${edge.to}-${index}` }));

    while (nodesToVisit.length > 0) {
        const currentId = nodesToVisit.shift();
        allEdges.forEach(edge => {
            if (edge.from === currentId && !impactedNodes.has(edge.to)) {
                impactedNodes.add(edge.to);
                impactedEdges.add(edge.id);
                nodesToVisit.push(edge.to);
            }
        });
    }
    
    setImpactedPath({ nodes: Array.from(impactedNodes), edges: Array.from(impactedEdges) });
    setTimeout(() => setImpactedPath(null), 5000);
  };

  const selectedNodeData = useMemo(() =>
    selectedNodeId ? dependencyData.nodes.find(n => n.id === selectedNodeId) : null
  , [selectedNodeId]);

  const filteredData = useMemo(() => {
    const { search, type, risk } = filters;
    const lowerCaseSearch = search.toLowerCase();
    const filteredNodes = dependencyData.nodes.filter(node => {
      const typeMatch = !type || node.type === type;
      const searchMatch = !search ||
        node.label.toLowerCase().includes(lowerCaseSearch) ||
        node.description.toLowerCase().includes(lowerCaseSearch);
      return typeMatch && searchMatch;
    });
    const filteredNodeIds = filteredNodes.map(n => n.id);
    const filteredEdges = dependencyData.edges.map((edge, index) => ({ ...edge, id: edge.id || `${edge.from}-${edge.to}-${index}` })).filter(edge =>
      filteredNodeIds.includes(edge.from) && filteredNodeIds.includes(edge.to)
    );
    const filteredRisks = riskRelations.filter(relation => {
      return !risk || relation.riskLevel === risk;
    });
    return { nodes: filteredNodes, edges: filteredEdges, risks: filteredRisks };
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mapa de Dependências</h2>
          <p className="text-gray-600 mt-1">Visualize as relações entre customizações e identifique riscos de impacto</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleClearFilters} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
            <FontAwesomeIcon icon={faTimes} className="mr-2" />Limpar Filtros
          </button>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />Exportar Mapa
          </button>
        </div>
      </div>
      <Filters filterValues={filters} onFilterChange={handleFilterChange} />
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Visualização Gráfica de Dependências</h3>
        </div>
        <div className="p-6">
          <DependencyGraph
            nodes={filteredData.nodes}
            edges={filteredData.edges}
            onNodeClick={handleNodeClick}
            focusedNodes={focusedNodes}
            impactedPath={impactedPath}
          />
        </div>
      </div>
      <RiskTable
        relations={filteredData.risks}
        onFocusRelation={handleFocusRelation}
        onAnalyzeImpact={handleAnalyzeImpact}
      />
      {selectedNodeData && (
        <NodeDetailsPanel 
          node={selectedNodeData} 
          onClose={handleClosePanel} 
          allData={dependencyData}
        />
      )}
    </div>
  );
}