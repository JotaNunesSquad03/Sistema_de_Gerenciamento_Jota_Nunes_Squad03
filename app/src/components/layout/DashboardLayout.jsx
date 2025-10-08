import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth <= 1024;
      setIsMobile(isMobileSize);
      
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    // Apenas permite fechar/abrir no modo mobile
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className={`dashboard-layout ${sidebarOpen && isMobile ? 'sidebar-open' : ''}`}>
      {isMobile && (
        <button 
          className="hamburger-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {isMobile && sidebarOpen && (
        <div 
          className="sidebar-overlay is-active"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar className={sidebarOpen ? 'is-open' : ''} />
      
      <main className="main-content">
        <Outlet /> 
      </main>
    </div>
  );
}