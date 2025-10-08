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

// Dados mock para histórico de alterações
export const historicoData = [
    {
        id: 1,
        nome: "Sistema de Relatórios v2.1",
        criadoPor: "Sarah Eastern",
        status: "ATIVO",
        dataCriacao: "2024/01/15",
        tipo: "Criação",
        descricao: "Novo sistema de relatórios com funcionalidades avançadas"
    },
    {
        id: 2,
        nome: "Módulo de Autenticação",
        criadoPor: "João Silva",
        status: "EM_REVISAO",
        dataCriacao: "2024/01/14",
        tipo: "Atualização",
        descricao: "Atualização do sistema de autenticação com 2FA"
    },
    {
        id: 3,
        nome: "API de Integração Externa",
        criadoPor: "Maria Santos",
        status: "ATIVO",
        dataCriacao: "2024/01/13",
        tipo: "Criação",
        descricao: "Nova API para integração com sistemas externos"
    },
    {
        id: 4,
        nome: "Sistema de Backup Automático",
        criadoPor: "Carlos Oliveira",
        status: "PENDENTE",
        dataCriacao: "2024/01/12",
        tipo: "Criação",
        descricao: "Sistema automatizado de backup de dados"
    },
    {
        id: 5,
        nome: "Dashboard de Monitoramento",
        criadoPor: "Ana Costa",
        status: "ATIVO",
        dataCriacao: "2024/01/11",
        tipo: "Criação",
        descricao: "Dashboard para monitoramento em tempo real"
    },
    {
        id: 6,
        nome: "Módulo de Notificações",
        criadoPor: "Pedro Lima",
        status: "ATIVO",
        dataCriacao: "2024/01/10",
        tipo: "Criação",
        descricao: "Sistema de notificações push e email"
    },
    {
        id: 7,
        nome: "Sistema de Logs",
        criadoPor: "Fernanda Rocha",
        status: "ATIVO",
        dataCriacao: "2024/01/09",
        tipo: "Atualização",
        descricao: "Melhorias no sistema de logs de auditoria"
    },
    {
        id: 8,
        nome: "API de Relatórios",
        criadoPor: "Roberto Alves",
        status: "ATIVO",
        dataCriacao: "2024/01/08",
        tipo: "Criação",
        descricao: "API para geração de relatórios personalizados"
    },
    {
        id: 9,
        nome: "Sistema de Cache",
        criadoPor: "Juliana Mendes",
        status: "ATIVO",
        dataCriacao: "2024/01/07",
        tipo: "Criação",
        descricao: "Sistema de cache para otimização de performance"
    },
    {
        id: 10,
        nome: "Módulo de Usuários",
        criadoPor: "Lucas Ferreira",
        status: "EM_REVISAO",
        dataCriacao: "2024/01/06",
        tipo: "Atualização",
        descricao: "Atualização do módulo de gerenciamento de usuários"
    },
    {
        id: 11,
        nome: "Sistema de Permissões",
        criadoPor: "Camila Souza",
        status: "ATIVO",
        dataCriacao: "2024/01/05",
        tipo: "Criação",
        descricao: "Sistema granular de permissões e roles"
    },
    {
        id: 12,
        nome: "API de Dados",
        criadoPor: "Diego Costa",
        status: "ATIVO",
        dataCriacao: "2024/01/04",
        tipo: "Criação",
        descricao: "API para acesso e manipulação de dados"
    },
    {
        id: 13,
        nome: "Sistema de Validação",
        criadoPor: "Patricia Lima",
        status: "ATIVO",
        dataCriacao: "2024/01/03",
        tipo: "Criação",
        descricao: "Sistema de validação de dados e formulários"
    },
    {
        id: 14,
        nome: "Módulo de Relatórios",
        criadoPor: "Gabriel Santos",
        status: "PENDENTE",
        dataCriacao: "2024/01/02",
        tipo: "Atualização",
        descricao: "Atualização do módulo de relatórios existente"
    },
    {
        id: 15,
        nome: "Sistema de Configurações",
        criadoPor: "Mariana Oliveira",
        status: "ATIVO",
        dataCriacao: "2024/01/01",
        tipo: "Criação",
        descricao: "Sistema centralizado de configurações"
    },
    {
        id: 16,
        nome: "API de Autenticação",
        criadoPor: "Rafael Silva",
        status: "ATIVO",
        dataCriacao: "2023/12/31",
        tipo: "Criação",
        descricao: "API para autenticação e autorização"
    },
    {
        id: 17,
        nome: "Sistema de Monitoramento",
        criadoPor: "Beatriz Costa",
        status: "ATIVO",
        dataCriacao: "2023/12/30",
        tipo: "Criação",
        descricao: "Sistema de monitoramento de performance"
    },
    {
        id: 18,
        nome: "Módulo de Relatórios",
        criadoPor: "Thiago Almeida",
        status: "ATIVO",
        dataCriacao: "2023/12/29",
        tipo: "Criação",
        descricao: "Módulo base para geração de relatórios"
    },
    {
        id: 19,
        nome: "Sistema de Backup",
        criadoPor: "Larissa Rocha",
        status: "ATIVO",
        dataCriacao: "2023/12/28",
        tipo: "Criação",
        descricao: "Sistema de backup e recuperação de dados"
    },
    {
        id: 20,
        nome: "API de Integração",
        criadoPor: "Felipe Mendes",
        status: "ATIVO",
        dataCriacao: "2023/12/27",
        tipo: "Criação",
        descricao: "API para integração com sistemas terceiros"
    }
];