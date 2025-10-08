// src/components/RiskTable.jsx
import React from 'react';
import { Search, Eye, FileText, Link, AlertTriangle, Zap, Target } from 'lucide-react';

const RiskTable = ({ relations, onFocusRelation, onAnalyzeImpact }) => {
    const getRiskClass = (level) => {
        const classes = {
            'high': 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200',
            'medium': 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200',
            'low': 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200',
        };
        return classes[level] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getRiskLabel = (level) => {
        const labels = {
            'high': 'Alto Risco',
            'medium': 'Médio Risco',
            'low': 'Baixo Risco',
        };
        return labels[level] || level;
    };

    const getRiskIcon = (level) => {
        const iconClasses = {
            'high': 'text-red-500',
            'medium': 'text-yellow-500',
            'low': 'text-green-500',
        };
        return iconClasses[level] || 'text-gray-500';
    };

    const getImpactClass = (level) => {
        const classes = {
            'high': 'text-red-600 font-semibold',
            'medium': 'text-yellow-600 font-semibold',
            'low': 'text-green-600 font-semibold',
        };
        return classes[level] || 'text-gray-600';
    };

    const riskStats = relations.reduce((acc, relation) => {
        acc[relation.riskLevel] = (acc[relation.riskLevel] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            Relações de Risco Identificadas
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            {relations.length} dependência{relations.length !== 1 ? 's' : ''} com risco identificado
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        {riskStats.high && (
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">{riskStats.high}</div>
                                <div className="text-xs text-red-600 font-medium">Alto Risco</div>
                            </div>
                        )}
                        {riskStats.medium && (
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-600">{riskStats.medium}</div>
                                <div className="text-xs text-yellow-600 font-medium">Médio Risco</div>
                            </div>
                        )}
                        {riskStats.low && (
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{riskStats.low}</div>
                                <div className="text-xs text-green-600 font-medium">Baixo Risco</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Mobile view - hidden on desktop */}
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-50 sm:hidden">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Dependências e Riscos
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100 sm:hidden">
                        {relations.length === 0 ? (
                            <tr>
                                <td className="px-4 py-8 text-center">
                                    <div className="flex flex-col items-center">
                                        <Target className="h-12 w-12 text-gray-400 mb-3" />
                                        <h3 className="text-base font-medium text-gray-900 mb-1">Nenhum risco identificado</h3>
                                        <p className="text-sm text-gray-500">
                                            Não há dependências com risco identificado.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            relations.map((relation, index) => (
                                <tr key={`${relation.principal}-${relation.dependsOn}`} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-4 py-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <AlertTriangle className={`h-4 w-4 mr-2 ${getRiskIcon(relation.riskLevel)}`} />
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getRiskClass(relation.riskLevel)}`}>
                                                        {getRiskLabel(relation.riskLevel)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 mb-1">Customização Principal</div>
                                                    <div className="text-sm font-semibold text-gray-900">{relation.principal}</div>
                                                    <div className="text-xs text-gray-500">{relation.relationType}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 mb-1">Depende de</div>
                                                    <div className="text-sm font-medium text-gray-900">{relation.dependsOn}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-gray-500 mb-1">Impacto</div>
                                                    <div className={`text-sm font-medium ${getImpactClass(relation.riskLevel)}`}>
                                                        {relation.impact}
                                                    </div>
                                                    {relation.description && (
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {relation.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 pt-2">
                                                <button
                                                    onClick={() => onAnalyzeImpact(relation.dependsOn)}
                                                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-xs font-medium"
                                                >
                                                    <Search className="mr-1.5 h-3 w-3" />
                                                    Analisar
                                                </button>
                                                <button 
                                                    onClick={() => onFocusRelation(relation.principal, relation.dependsOn)} 
                                                    className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-xs font-medium"
                                                >
                                                    <Eye className="mr-1.5 h-3 w-3" />
                                                    Focar
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    
                    {/* Desktop view - hidden on mobile */}
                    <thead className="bg-gradient-to-r from-gray-100 to-gray-50 hidden sm:table-header-group">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Customização Principal
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <Link className="mr-2 h-4 w-4" />
                                    Depende de
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                    Nível de Risco
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                    Impacto Estimado
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <Zap className="mr-2 h-4 w-4" />
                                    Ações
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody id="riskTable" className="bg-white divide-y divide-gray-100 hidden sm:table-row-group">
                        {relations.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <Target className="h-16 w-16 text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum risco identificado</h3>
                                        <p className="text-gray-500 max-w-sm">
                                            Não há dependências com risco identificado nos filtros atuais.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            relations.map((relation, index) => (
                            <tr key={`${relation.principal}-${relation.dependsOn}`} className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                            <FileText className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">{relation.principal}</div>
                                            <div className="text-xs text-gray-500">{relation.relationType}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                            <Link className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">{relation.dependsOn}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <AlertTriangle className={`h-4 w-4 mr-2 ${getRiskIcon(relation.riskLevel)}`} />
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getRiskClass(relation.riskLevel)}`}>
                                            {getRiskLabel(relation.riskLevel)}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <div className={`text-sm font-medium ${getImpactClass(relation.riskLevel)}`}>
                                        {relation.impact}
                                    </div>
                                    {relation.description && (
                                        <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                                            {relation.description}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                console.log(`[PASSO 1] Botão 'Analisar Impacto' clicado. Analisando o nó: ${relation.dependsOn}`);
                                                onAnalyzeImpact(relation.dependsOn);
                                            }}
                                            className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 text-xs font-medium"
                                        >
                                            <Search className="mr-1.5 h-3 w-3" />
                                            Analisar
                                        </button>
                                        <button 
                                            onClick={() => onFocusRelation(relation.principal, relation.dependsOn)} 
                                            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-xs font-medium"
                                        >
                                            <Eye className="mr-1.5 h-3 w-3" />
                                            Focar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RiskTable;