import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#222" }}>
        <Link to="/" style={{ marginRight: "1rem", color: "white" }}>
          Login
        </Link>
        <Link to="/dashboard" style={{ color: "white" }}>
          Dashboard
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
