// src/components/RiskTable.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';

const RiskTable = ({ relations, onFocusRelation, onAnalyzeImpact }) => {
    const getRiskClass = (level) => {
        const classes = {
            'high': 'bg-red-100 text-red-800',
            'medium': 'bg-yellow-100 text-yellow-800',
            'low': 'bg-green-100 text-green-800',
        };
        return classes[level] || 'bg-gray-100 text-gray-800';
    };

    const getRiskLabel = (level) => {
        const labels = {
            'high': 'Alto Risco',
            'medium': 'Médio Risco',
            'low': 'Baixo Risco',
        };
        return labels[level] || level;
    };

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Relações de Risco Identificadas</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customização Principal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Depende de</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nível de Risco</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impacto Estimado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="riskTable" className="bg-white divide-y divide-gray-200">
                        {relations.map((relation) => (
                            <tr key={`${relation.principal}-${relation.dependsOn}`} className={`risk-${relation.riskLevel}`}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{relation.principal}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{relation.dependsOn}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskClass(relation.riskLevel)}`}>
                                        {getRiskLabel(relation.riskLevel)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{relation.impact}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => {
                                            // PONTO DE VERIFICAÇÃO 1
                                            console.log(`[PASSO 1] Botão 'Analisar Impacto' clicado. Analisando o nó: ${relation.dependsOn}`);
                                            onAnalyzeImpact(relation.dependsOn);
                                        }}
                                        className="text-primary hover:text-red-700 mr-3"
                                    >
                                        <FontAwesomeIcon icon={faSearch} className="mr-1" />Analisar Impacto
                                    </button>
                                    <button 
                                        onClick={() => onFocusRelation(relation.principal, relation.dependsOn)} 
                                        className="text-accent hover:text-indigo-700"
                                    >
                                        <FontAwesomeIcon icon={faEye} className="mr-1" />Focar no Gráfico
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RiskTable;