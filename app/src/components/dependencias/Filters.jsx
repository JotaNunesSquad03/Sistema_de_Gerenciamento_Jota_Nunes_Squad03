// src/components/Filters.jsx
import React from 'react';

// 1. Receba as props: filterValues e onFilterChange
const Filters = ({ filterValues, onFilterChange }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros de Visualização</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Customização</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Digite o nome..."
                        // 2. Conecte o valor do input ao estado do App
                        value={filterValues.search}
                        // 3. Quando o valor mudar, chame a função do App para atualizar o estado
                        onChange={(e) => onFilterChange('search', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                    <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={filterValues.type}
                        onChange={(e) => onFilterChange('type', e.target.value)}
                    >
                        <option value="">Todos os tipos</option>
                        <option value="formula">Fórmulas Visuais</option>
                        <option value="sql">Consultas SQL</option>
                        <option value="report">Relatórios</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Risco</label>
                    <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={filterValues.risk}
                        onChange={(e) => onFilterChange('risk', e.target.value)}
                    >
                        <option value="">Todos os níveis</option>
                        <option value="high">Alto Risco</option>
                        <option value="medium">Médio Risco</option>
                        <option value="low">Baixo Risco</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filters;