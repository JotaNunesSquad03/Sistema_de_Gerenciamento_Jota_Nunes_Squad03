import { NavLink, useNavigate } from 'react-router-dom';
// CORREÇÃO 1: Removido o prefixo "Lu" dos nomes dos ícones na importação
import { LogOut, LayoutDashboard, Clock3, Boxes, Settings } from 'lucide-react';
import Logo from '../../assets/logo-jotanunes.png';
import './sidebar.scss'; 

const MENU_ITEMS = [
  // CORREÇÃO 2: Removido o prefixo "Lu" do uso dos ícones
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
  { id: "historico", label: "Histórico de Alterações", icon: <Clock3 />, path: "/historico" },
  { id: "dependencias", label: "Dependências", icon: <Boxes />, path: "/dependencias" },
  { id: "configurações", label: "Configurações", icon: <Settings />, path: "/configurações" },
];

const Sidebar = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <img src={Logo} alt="Logo Jota Nunes" />
        </div>
        <div className="sidebar__portal">
          <span className="portal__title">Portal de</span>
          <span className="portal__highlight">Gerenciamento</span>
        </div>
        <div className="sidebar__divider"></div>
      </div>

      <nav className="sidebar__nav">
        {MENU_ITEMS.map((item) => (
          <NavLink 
            to={item.path} 
            key={item.id}
            className={({ isActive }) => `nav__item ${isActive ? 'active' : ''}`}
          >
            <span className="nav__icon">{item.icon}</span>
            <span className="nav__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__bottom">
        <button type="button" className="logout__btn" onClick={handleLogout}>
          <span className="nav__icon"><LogOut /></span>
          <span className="nav__label">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;