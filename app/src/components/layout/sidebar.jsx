import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Logo from '../../assets/logo-jotanunes.png';
import './sidebar.scss'; 

// Importe seus ícones aqui
import { Grid, FilePlus, Bell, Clock, FileText, Settings, Share2 } from 'lucide-react';

const navItems = [
  { path: "/dashboard", icon: <Grid />, label: "Dashboard" },
  { path: "/novos-registros", icon: <FilePlus />, label: "Novos Registros" },
  { path: "/alertas", icon: <Bell />, label: "Alertas de Alterações" },
  { path: "/historico", icon: <Clock />, label: "Histórico de Alterações" },
  { path: "/documentacao", icon: <FileText />, label: "Documentação Técnica" },
  { path: "/dependencias", icon: <Share2 />, label: "Dependências" },
  { path: "/settings", icon: <Settings />, label: "Settings" },
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
        {navItems.map((item) => (
          <NavLink 
            to={item.path} 
            key={item.path}
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
          <span className="nav__label">Signout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;