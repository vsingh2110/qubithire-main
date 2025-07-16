'use client';

import React from 'react';
import { BellIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  toggleSidebar?: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 w-full">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8 w-full">
        {/* Left: QubitHire logo, Company logo, Company name */}
        <div className="flex items-center space-x-4 min-w-0">
          {/* QubitHire Logo */}
          <div className="flex items-center flex-shrink-0">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">Q</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">QubitHire</span>
          </div>
          {/* Company Logo and Name */}
          <div className="ml-4 flex items-center space-x-2">
            {/* Wintellisys logo: W with sky blue background */}
            <div className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center text-lg font-bold text-white border border-sky-600">
              W
            </div>
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Wintellisys</span>
          </div>
        </div>
        {/* Center: Search bar */}
        <div className="flex-1 flex justify-center min-w-0">
          <div className="relative w-full max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search candidates, jobs..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        {/* Right: Quick actions, notifications, user */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
              <button className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800">
                New Job
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Screen Resumes
              </button>
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Toggle dark mode"
            >
              {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m8.485-8.485h-1.5m-15 0H3m15.364-6.364l-1.06 1.06m-12.728 0l-1.06-1.06m12.728 12.728l-1.06-1.06m-12.728 0l-1.06 1.06M16.24 7.76A6 6 0 117.76 16.24 6 6 0 0116.24 7.76z" />
              </svg>
              ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.438-9.093a.75.75 0 01.908.325.75.75 0 01-.062.87A7.501 7.501 0 0012 19.5a7.48 7.48 0 006.648-3.904.75.75 0 01.87-.062.75.75 0 01.325.908z" />
              </svg>
              )}
            </button>
            {/* Notifications */}
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 relative" aria-label="Notifications">
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800"></span>
              </button>
          {/* User */}
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    HR Manager
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    hr@company.com
                  </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 