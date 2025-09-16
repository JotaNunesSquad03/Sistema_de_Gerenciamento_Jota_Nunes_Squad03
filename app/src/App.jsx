// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "bootstrap-icons/font/bootstrap-icons.css";
import NovosRegistros from "./pages/NovosRegistros";
import Alertas from "./pages/Alertas";
import Historico from "./pages/Historico";
import Dependencias from "./pages/Dependencias";
import Documentacao from "./pages/Documentacao";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/novos-registros" element={<NovosRegistros />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/documentacao" element={<Documentacao />} />
        <Route path="/dependencias" element={<Dependencias />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
