import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const getTypeLabel = (type) => {
    const labels = {
        'formula': 'Fórmula Visual',
        'sql': 'Consulta SQL',
        'report': 'Relatório'
    };
    return labels[type] || type;
};

const getTypeClass = (type) => {
    const classes = {
        'formula': 'bg-red-100 text-red-800',
        'sql': 'bg-blue-100 text-blue-800',
        'report': 'bg-green-100 text-green-800'
    };
    return classes[type] || 'bg-gray-100 text-gray-800';
};

const NodeDetailsPanel = ({ node, onClose, allData }) => {
    if (!node) {
        return null;
    }

    const directDependencies = allData.edges
        .filter(edge => edge.from === node.id)
        .map(edge => allData.nodes.find(n => n.id === edge.to));

    const usedBy = allData.edges
        .filter(edge => edge.to === node.id)
        .map(edge => allData.nodes.find(n => n.id === edge.from));

    return (
        <div className="node-details-panel bg-white rounded-lg shadow-xl">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{node.label}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeClass(node.type)}`}>
                            {getTypeLabel(node.type)}
                        </span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Descrição</h4>
                        <p className="text-sm text-gray-600">{node.description}</p>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Dependências Diretas</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                            {directDependencies.length > 0 ? (
                                directDependencies.map(dep => dep && <li key={dep.id}>{dep.label}</li>)
                            ) : (
                                <li className="list-none text-gray-400 italic">Nenhuma dependência direta</li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Usado por</h4>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                            {usedBy.length > 0 ? (
                                usedBy.map(user => user && <li key={user.id}>{user.label}</li>)
                            ) : (
                                <li className="list-none text-gray-400 italic">Não é usado por outros itens</li>
                            )}
                        </ul>
                    </div>
                    
                    <div className="pt-4 border-t">
                        <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                            Ver Detalhes Completos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NodeDetailsPanel;