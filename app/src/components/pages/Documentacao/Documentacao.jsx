import React from 'react';
import './Documentacao.scss'; 

const DocCard = ({ icon, title, active = false }) => (
    <div className={`doc-card ${active ? 'active' : ''}`}>
        <i className={`fas ${icon}`}></i>
        <span>{title}</span>
    </div>
);

const Documentacao = () => {
    return (
        <div className="documentacao-page">
            {}
            <aside className="sidebar">
                <div className="logo-section">
                    <img src="/logo-jotanunes.png" alt="Jotanunes Construtora" className="logo" />
                    <span className="portal-text">Portal de</span>
                    <span className="gerenciamento-text">Gerenciamento</span>
                </div>
                <nav className="navigation">
                    <ul>
                        <li><a href="#dashboard" className="nav-item"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
                        <li><a href="#novos-registros" className="nav-item"><i className="fas fa-file-alt"></i> Novos Registros</a></li>
                        <li><a href="#alerta-alteracoes" className="nav-item"><i className="fas fa-exclamation-triangle"></i> Alertas de Alterações</a></li>
                        <li><a href="#historico-alteracoes" className="nav-item"><i className="fas fa-history"></i> Histórico de Alterações</a></li>
                        <li><a href="#documentacao-tecnica" className="nav-item active"><i className="fas fa-book"></i> Documentação Técnica</a></li>
                        <li><a href="#dependencias" className="nav-item"><i className="fas fa-project-diagram"></i> Dependências</a></li>
                        <li><a href="#configuracoes" className="nav-item"><i className="fas fa-cog"></i> Configurações</a></li>
                    </ul>
                </nav>
                <div className="signout-section">
                    <a href="#signout" className="signout-link"><i className="fas fa-sign-out-alt"></i> Sair</a>
                </div>
            </aside>

            <main className="main-content">
                <header className="main-header">
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search" />
                    </div>
                </header>

                <section className="documentacao-section">
                    <h2>Documentação Técnica</h2>

                    <div className="doc-cards-container">
                        <DocCard icon="fa-chart-line" title="Custo médio por Produto" active={true} />
                        <DocCard icon="fa-dollar-sign" title="Regras de Cashback" />
                        <DocCard icon="fa-calculator" title="Cálculo de Comissão" />
                    </div>

                    <div className="doc-details-container">
                        <div className="detail-card large">
                            <h3>Custo Médio por Produto</h3>
                            <div className="detail-section">
                                <h4>Descrição</h4>
                                <p>Calcula o custo médio por produto com base nos dados de entrada</p>
                            </div>
                            <div className="detail-section">
                                <h4>Código/Fórmula</h4>
                                <pre><code>codigo codigo codigo codigo / codigo codigo codigo / codigo</code></pre>
                            </div>
                            <div className="detail-section">
                                <h4>Dependências</h4>
                                <p>Preço do produto</p>
                            </div>
                        </div>

                        <div className="detail-card small">
                            <div className="detail-section">
                                <h4>Descrição</h4>
                                <p>Calcula o custo médio por produto com base nos dados de entrada.</p>
                            </div>
                            <div className="detail-section">
                                <h4>Parametro de Entrada/Saída</h4>
                                <p>Preço do produto</p>
                                <p>Quantidade Vendida</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Documentacao; // Export ajustado
