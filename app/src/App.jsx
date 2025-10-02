import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import NovosRegistros from "./components/pages/NovosRegistros";
import Alertas from "./components/pages/Alertas";
import Historico from "./components/pages/Historico";
import Documentacao from "./components/pages/Documentacao";
import Settings from "./components/pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";
import DependenciasPage from "./components/pages/DependenciasPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Rotas que usam o layout com a barra lateral */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/novos-registros" element={<NovosRegistros />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/documentacao" element={<Documentacao />} />
        <Route path="/dependencias" element={<DependenciasPage />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}