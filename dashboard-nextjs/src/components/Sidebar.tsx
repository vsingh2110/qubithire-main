'use client';

import React from 'react';
import {
  HomeIcon,
  DocumentMagnifyingGlassIcon,
  UsersIcon,
  CalendarIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  FolderIcon,
  ChartBarIcon,
  CogIcon,
  PencilSquareIcon,
  DocumentArrowDownIcon,
  UserGroupIcon,
  BellIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const shortcutSections = [
  {
    header: 'Screening',
    links: [
      { name: 'Home', path: '/', icon: HomeIcon },
      { name: 'Resume Screening', path: '/resume-screening', icon: DocumentMagnifyingGlassIcon },
      { name: 'Candidates', path: '/candidates', icon: UsersIcon },
    ]
  },
  {
    header: 'Interviews & Offers',
    links: [
      { name: 'Interviews', path: '/interviews', icon: CalendarIcon },
      { name: 'Offers', path: '/offers', icon: BriefcaseIcon },
    ]
  },
  {
    header: 'Management',
    links: [
      { name: 'Communication', path: '/communication', icon: EnvelopeIcon },
      { name: 'Documents', path: '/documents', icon: FolderIcon },
      { name: 'JD Enhancement', path: '/jd-enhancement', icon: PencilSquareIcon },
      { name: 'Reports', path: '/reports', icon: DocumentArrowDownIcon },
      { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
      { name: 'Admin', path: '/admin', icon: UserGroupIcon },
      { name: 'Settings', path: '/settings', icon: CogIcon },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  // Example reminders
  const reminders = [
    { label: 'Pending Approvals', count: 2, icon: BellIcon, color: 'text-blue-600' },
    { label: 'Interviews Today', count: 1, icon: CalendarIcon, color: 'text-green-600' },
    { label: 'Offers to Send', count: 1, icon: BriefcaseIcon, color: 'text-yellow-600' },
    { label: 'Completed BGV', count: 3, icon: CheckCircleIcon, color: 'text-green-600' }
  ];

  return (
    <aside className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      fixed inset-y-0 left-0 z-20 w-64 lg:translate-x-0 lg:static lg:inset-0 flex flex-col h-full`}>
      {/* Reminders Card */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 tracking-wide">Reminders</h2>
        <div className="space-y-2">
          {reminders.map((rem) => (
            <div key={rem.label} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200">
              <rem.icon className={`h-4 w-4 ${rem.color}`} />
              <span>{rem.label}</span>
              <span className="ml-auto font-bold text-xs bg-gray-200 dark:bg-gray-700 rounded px-2 py-0.5">{rem.count}</span>
          </div>
          ))}
        </div>
      </div>
      {/* Navigation Shortcuts */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2 tracking-wide">Navigation Shortcuts</h2>
        <div className="space-y-4">
          {shortcutSections.map((section) => (
            <div key={section.header}>
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-1 pl-2">{section.header}</div>
              <div className="space-y-1">
                {section.links.map(link => {
                  const Icon = link.icon;
              return (
                <Link
                      key={link.name}
                      href={link.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActive(link.path)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}
                      `}
                >
                      <Icon className="h-4 w-4" />
                      <span>{link.name}</span>
                </Link>
              );
            })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 