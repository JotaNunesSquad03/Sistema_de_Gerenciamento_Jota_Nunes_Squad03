import "./Dashboard.scss";
import Sidebar from "../components/Sidebar";   // importa o componente Sidebar
import "../components/Sidebar.scss";          // importa os estilos da Sidebar

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Conteúdo principal */}
      <main className="main-content">
        <h1>Dashboard</h1>
        <p>Conteúdo do dashboard aqui...</p>
      </main>
    </div>
  );
}
