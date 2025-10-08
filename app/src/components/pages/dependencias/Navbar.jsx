// src/components/Navbar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCalculator, faDatabase, faChartBar, faProjectDiagram, faBell } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    // A lógica para o dropdown de notificações será adicionada depois
    return (
        <nav className="bg-secondary shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold text-white">Portal de Customizações RM</h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#" className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />Painel
                                </a>
                                <a href="#" className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    <FontAwesomeIcon icon={faCalculator} className="mr-2" />Fórmulas Visuais
                                </a>
                                <a href="#" className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    <FontAwesomeIcon icon={faDatabase} className="mr-2" />Consultas SQL
                                </a>
                                <a href="#" className="nav-link text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    <FontAwesomeIcon icon={faChartBar} className="mr-2" />Relatórios
                                </a>
                                <a href="#" className="nav-link text-white bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />Dependências
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="relative">
                            <button className="text-gray-300 hover:text-white p-2 rounded-full relative">
                                <FontAwesomeIcon icon={faBell} className="text-lg" />
                                <span id="notificationBadge" className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
