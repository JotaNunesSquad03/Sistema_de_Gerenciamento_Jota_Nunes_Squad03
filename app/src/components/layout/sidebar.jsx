import { useNavigate, useLocation } from "react-router-dom"; 
import "./sidebar.scss";
import logoJotaNunes from "../../assets/logo-jotanunes.png";
import {
  LuLayoutDashboard,
  LuUserPlus,
  LuBell,
  LuClock3,
  LuFileText,
  LuBoxes,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard />, path: "/dashboard" },
  { id: "historico", label: "Histórico de Alterações", icon: <LuClock3 />, path: "/historico" },
  { id: "dependencias", label: "Dependências", icon: <LuBoxes />, path: "/dependencias" },
  { id: "settings", label: "Settings", icon: <LuSettings />, path: "/settings" },
];

export default function Sidebar({ onNavigate, isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    if (onNavigate) onNavigate(item.path);
    if (item.path) navigate(item.path);
    if (onClose) onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true }); 
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <img src={logoJotaNunes} alt="Logo" />
        </div>

        <div className="sidebar__portal">
          <span className="portal__title">Portal de</span>
          <span className="portal__highlight">Gerenciamento</span>
        </div>

        <div className="sidebar__divider"></div>
      </div>

      <nav className="sidebar__nav">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav__item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            <span className="nav__icon">{item.icon}</span>
            <span className="nav__label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar__bottom">
        <button type="button" className="logout__btn" onClick={handleLogout}>
          <LuLogOut className="nav__icon" />
          <span className="nav__label">Signout</span>
        </button>
      </div>
    </aside>
  );
}
