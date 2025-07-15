import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import ResumeScreening from './pages/ResumeScreening';
import CandidateManagement from './pages/CandidateManagement';
import InterviewScheduling from './pages/InterviewScheduling';
import OfferManagement from './pages/OfferManagement';
import EmailCommunication from './pages/EmailCommunication';
import DocumentManagement from './pages/DocumentManagement';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import JDEnhancement from './pages/JDEnhancement';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`${darkMode ? 'dark' : ''} bg-gray-100 min-h-screen w-full`}>
        {/* Header and NavigationBar at the very top */}
        <Header 
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <NavigationBar />
        {/* Main area: Sidebar left, content right */}
        <div className="flex flex-row w-full min-h-[calc(100vh-112px)]"> {/* 112px = header (56px) + nav (56px) */}
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 w-full">
            <div className="w-full px-6 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resume-screening" element={<ResumeScreening />} />
                <Route path="/candidates" element={<CandidateManagement />} />
                <Route path="/interviews" element={<InterviewScheduling />} />
                <Route path="/offers" element={<OfferManagement />} />
                <Route path="/communication" element={<EmailCommunication />} />
                <Route path="/documents" element={<DocumentManagement />} />
                <Route path="/jd-enhancement" element={<JDEnhancement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App; 