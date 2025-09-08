import React, { useState } from 'react';
import '../components/sidebar.scss';
import logo from "../assets/logo-jotanunes.png"; // coloque sua logo aqui

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  { id: 'novos',     label: 'Novos Registros', icon: 'bi-file-earmark-plus' },
  { id: 'alertas',   label: 'Alertas de Alterações', icon: 'bi-bell' },
  { id: 'historico', label: 'Histórico de Alterações', icon: 'bi-clock-history' },
  { id: 'docs',      label: 'Documentação Técnica', icon: 'bi-journal-text' },
  { id: 'deps',      label: 'Dependências', icon: 'bi-puzzle' },
  { id: 'settings',  label: 'Settings', icon: 'bi-gear' },
];

export default function Sidebar({ initial = 'dashboard', onNavigate }) {
  const [active, setActive] = useState(initial);

  function go(itemId, e) {
    e.preventDefault();
    setActive(itemId);
    if (onNavigate) onNavigate(itemId); // callback opcional para integração de rota
  }

  return (
    <aside className="sidebar" aria-label="Barra lateral de navegação">
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <img src={logo} alt="Jotanunes logo" />
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Menu principal">
        <ul>
          {MENU_ITEMS.map(item => (
            <li key={item.id} className={`sidebar__item ${active === item.id ? 'active' : ''}`}>
              <a
                href="#"
                onClick={(e) => go(item.id, e)}
                aria-current={active === item.id ? 'page' : undefined}
                className="sidebar__link"
              >
                <i className={`sidebar__icon bi ${item.icon}`} aria-hidden="true" />
                <span className="sidebar__label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar__bottom">
        <button
          className="sidebar__logout"
          type="button"
          onClick={() => { /* Implementar logout / rota */ }}
        >
          <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
          <span className="sidebar__label">Signout</span>
        </button>
      </div>
    </aside>
  );
}
