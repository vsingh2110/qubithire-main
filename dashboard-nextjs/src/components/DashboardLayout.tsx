'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import NavigationBar from './NavigationBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} bg-gray-100 min-h-screen w-full`}>
      {/* Header and NavigationBar at the very top */}
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <NavigationBar />
      {/* Main area: Sidebar left, content right */}
      <div className="flex flex-row w-full min-h-[calc(100vh-112px)]"> {/* 112px = header (56px) + nav (56px) */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 w-full">
          <div className="w-full px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 