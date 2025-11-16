// src/data/mockData.js

export const dependencyData = {
    nodes: [
        { id: 'FV_CALCULA_COMISSAO', label: 'FV_CALCULA_COMISSAO', type: 'formula', description: 'Cálculo de comissão por vendedor', color: '#BC1F1B' },
        { id: 'FV_DESCONTO_PROGRESSIVO', label: 'FV_DESCONTO_PROGRESSIVO', type: 'formula', description: 'Aplicação de desconto progressivo', color: '#BC1F1B' },
        { id: 'FV_CALCULA_IMPOSTOS', label: 'FV_CALCULA_IMPOSTOS', type: 'formula', description: 'Cálculo automático de impostos', color: '#BC1F1B' },
        { id: 'SQL_BUSCA_CLIENTES', label: 'SQL_BUSCA_CLIENTES', type: 'sql', description: 'Busca clientes ativos por região', color: '#4F46E5' },
        { id: 'SQL_PRODUTOS_ATIVOS', label: 'SQL_PRODUTOS_ATIVOS', type: 'sql', description: 'Lista produtos em estoque', color: '#4F46E5' },
        { id: 'SQL_VENDEDORES', label: 'SQL_VENDEDORES', type: 'sql', description: 'Lista vendedores ativos', color: '#4F46E5' },
        { id: 'REL_VENDAS_MENSAIS', label: 'REL_VENDAS_MENSAIS', type: 'report', description: 'Relatório de vendas por mês', color: '#10B981' },
        { id: 'REL_ESTOQUE_CRITICO', label: 'REL_ESTOQUE_CRITICO', type: 'report', description: 'Produtos com estoque baixo', color: '#10B981' },
        { id: 'REL_COMISSOES', label: 'REL_COMISSOES', type: 'report', description: 'Relatório de comissões', color: '#10B981' }
    ],
    edges: [
        { from: 'FV_CALCULA_COMISSAO', to: 'SQL_VENDEDORES', arrows: 'to' },
        { from: 'FV_CALCULA_COMISSAO', to: 'SQL_BUSCA_CLIENTES', arrows: 'to' },
        { from: 'FV_DESCONTO_PROGRESSIVO', to: 'SQL_PRODUTOS_ATIVOS', arrows: 'to' },
        { from: 'REL_VENDAS_MENSAIS', to: 'FV_CALCULA_COMISSAO', arrows: 'to' },
        { from: 'REL_VENDAS_MENSAIS', to: 'SQL_BUSCA_CLIENTES', arrows: 'to' },
        { from: 'REL_COMISSOES', to: 'FV_CALCULA_COMISSAO', arrows: 'to' },
        { from: 'REL_ESTOQUE_CRITICO', to: 'SQL_PRODUTOS_ATIVOS', arrows: 'to' },
        { from: 'FV_CALCULA_IMPOSTOS', to: 'SQL_PRODUTOS_ATIVOS', arrows: 'to' }
    ]
};

export const riskRelations = [
    {
        principal: 'REL_VENDAS_MENSAIS',
        dependsOn: 'FV_CALCULA_COMISSAO',
        relationType: 'Dependência Direta',
        riskLevel: 'high',
        impact: 'Falha no cálculo de vendas',
        description: 'Relatório crítico depende de fórmula complexa'
    },
    {
        principal: 'FV_CALCULA_COMISSAO',
        dependsOn: 'SQL_VENDEDORES',
        relationType: 'Fonte de Dados',
        riskLevel: 'high',
        impact: 'Comissões incorretas',
        description: 'Fórmula depende de dados de vendedores'
    },
    {
        principal: 'REL_COMISSOES',
        dependsOn: 'FV_CALCULA_COMISSAO',
        relationType: 'Dependência Direta',
        riskLevel: 'high',
        impact: 'Relatório de comissões inválido',
        description: 'Relatório financeiro crítico'
    },
    {
        principal: 'FV_DESCONTO_PROGRESSIVO',
        dependsOn: 'SQL_PRODUTOS_ATIVOS',
        relationType: 'Fonte de Dados',
        riskLevel: 'medium',
        impact: 'Descontos incorretos',
        description: 'Fórmula de desconto depende de produtos'
    },
    {
        principal: 'REL_ESTOQUE_CRITICO',
        dependsOn: 'SQL_PRODUTOS_ATIVOS',
        relationType: 'Fonte de Dados',
        riskLevel: 'medium',
        impact: 'Alertas de estoque incorretos',
        description: 'Relatório operacional'
    },
    {
        principal: 'FV_CALCULA_IMPOSTOS',
        dependsOn: 'SQL_PRODUTOS_ATIVOS',
        relationType: 'Fonte de Dados',
        riskLevel: 'low',
        impact: 'Cálculos fiscais incorretos',
        description: 'Dependência bem documentada'
    }
];
