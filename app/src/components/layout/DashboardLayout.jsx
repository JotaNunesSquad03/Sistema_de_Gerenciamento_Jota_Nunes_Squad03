import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth <= 1024;
      setIsMobile(isMobileSize);
      
      // Em desktop, sidebar sempre aberta
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else {
        // Em mobile, sidebar fechada por padrão
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      {/* Botão Hambúrguer - só aparece em mobile */}
      {isMobile && (
        <button 
          className="hamburger-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      )}

      {/* Overlay para mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <Outlet /> 
      </main>
    </div>
  );
}
