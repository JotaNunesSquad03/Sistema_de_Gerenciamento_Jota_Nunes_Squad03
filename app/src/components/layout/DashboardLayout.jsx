import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
<<<<<<< HEAD
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) {
=======
    const checkScreenSize = () => {
      const isMobileSize = window.innerWidth <= 1024;
      setIsMobile(isMobileSize);
      
      if (window.innerWidth > 1024) {
>>>>>>> main
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="dashboard-layout">
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