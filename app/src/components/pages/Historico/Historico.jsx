import React from 'react';
import './Historico.scss'; 

const Historico = () => {
    return (
        <div className="historico-page">
            <aside className="sidebar">
                <div className="logo-section">
                    <img src="/path/to/jotanunes-logo.png" alt="Jotanunes Construtora" className="logo" />
                    <span className="portal-text">Portal de</span>
                    <span className="gerenciamento-text">Gerenciamento</span>
                </div>
                <nav className="navigation">
                    <ul>
                        <li>
                            <a href="#dashboard" className="nav-item">
                                <i className="fas fa-tachometer-alt"></i> Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="#novos-registros" className="nav-item">
                                <i className="fas fa-file-alt"></i> Novos Registros
                            </a>
                        </li>
                        <li>
                            <a href="#alerta-alteracoes" className="nav-item active">
                                <i className="fas fa-exclamation-triangle"></i> Alerta de Alterações
                            </a>
                        </li>
                        <li>
                            <a href="#historico-alteracoes" className="nav-item">
                                <i className="fas fa-history"></i> Histórico de Alterações
                            </a>
                        </li>
                        <li>
                            <a href="#documentacao-tecnica" className="nav-item">
                                <i className="fas fa-book"></i> Documentação Técnica
                            </a>
                        </li>
                        <li>
                            <a href="#dependencias" className="nav-item">
                                <i className="fas fa-project-diagram"></i> Dependências
                            </a>
                        </li>
                        <li>
                            <a href="#configuracoes" className="nav-item">
                                <i className="fas fa-cog"></i> Configurações
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="signout-section">
                    <a href="#signout" className="signout-link">
                        <i className="fas fa-sign-out-alt"></i> Signout
                    </a>
                </div>
            </aside>

            <main className="main-content">
                <header className="main-header">
                    <div className="search-bar">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search" />
                    </div>
                </header>

                <section className="historico-section">
                    <div className="section-header">
                        <h2>Histórico de Alterações</h2>
                        <div className="notifications">
                            <i className="fas fa-bell"></i>
                            <span className="notification-count">30</span>
                            <span className="notification-text">Novas Notificações</span>
                        </div>
                    </div>

                    <div className="filters">
                        <div className="filter-item">
                            <label>Tipo de Alteração</label>
                            <select>
                                <option>Registro Alterado</option>
                                <option>Cálculo de Comissão</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Data</label>
                            <select>
                                <option>27/08/2025</option>
                                <option>15/08/2025</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Usuário</label>
                            <select>
                                <option>José Silva</option>
                                <option>Marta Regina</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Registro Alterado</th>
                                    <th>Tipo de Alteração</th>
                                    <th>Data</th>
                                    <th>Alterado por</th>
                                    <th>Impacto pode</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cálculo de Comissão</td>
                                    <td>Fórmula</td>
                                    <td>27/08/2025 – 10:32</td>
                                    <td>José Silva</td>
                                    <td>Pode afetar Relatórios</td>
                                </tr>
                                <tr>
                                    <td>Regras de CashBack</td>
                                    <td>Consulta</td>
                                    <td>15/08/2025 – 14:03</td>
                                    <td>Marta Regina</td>
                                    <td>Pode afetar cálculos de lucro</td>
                                </tr>
                                <tr>
                                    <td>Cálculo de Comissão</td>
                                    <td>Relatório</td>
                                    <td>18/08/2025 – 16:03</td>
                                    <td>Gustavo Alves</td>
                                    <td>Pode afetar erros de fluxo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Listas de Customização Alteradas</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Registro Alterado</th>
                                    <th>Tipo de Alteração</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cálculo de Comissão</td>
                                    <td>Fórmula</td>
                                    <td>25/08/2025</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Historico;