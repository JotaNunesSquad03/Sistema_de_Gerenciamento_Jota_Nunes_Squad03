import Sidebar from "../sidebar";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet /> 
      </main>
    </div>
  );
}
