// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/sidebar"; // sua sidebar
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  return (
    <Routes>
      {/* Tela de login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard com sidebar */}
      <Route
        path="/dashboard"
        element={
          <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1, padding: "1rem" }}>
              <Dashboard />
            </div>
          </div>
        }
      />
    </Routes>
  );
}
