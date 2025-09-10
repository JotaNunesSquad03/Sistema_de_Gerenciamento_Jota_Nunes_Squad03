import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 importa
import "./sidebar.scss";
import logoJotaNunes from "../assets/logo-jotanunes.png";
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
  { id: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
  { id: "novos", label: "Novos Registros", icon: <LuUserPlus /> },
  { id: "alertas", label: "Alertas de Alterações", icon: <LuBell /> },
  { id: "historico", label: "Histórico de Alterações", icon: <LuClock3 /> },
  { id: "docs", label: "Documentação Técnica", icon: <LuFileText /> },
  { id: "dependencias", label: "Dependências", icon: <LuBoxes /> },
  { id: "settings", label: "Settings", icon: <LuSettings /> },
];

export default function Sidebar({ onNavigate }) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate(); // 👈 hook do router

  const handleClick = (id) => {
    setActiveItem(id);
    if (onNavigate) onNavigate(id);
    if (id === "dashboard") navigate("/dashboard"); // exemplo simples
  };

  const handleLogout = () => {
    // se tiver token ou sessão, limpa aqui
    localStorage.removeItem("authToken");
    navigate("/", { replace: true }); // 👈 redireciona pro login
  };

  return (
    <aside className="sidebar">
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
            className={`nav__item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleClick(item.id)}
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
