'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  ChevronDownIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

// Dropdown menu data for each tab
const menuData: Record<string, Array<{name: string; path: string; icon?: React.ComponentType<any>; count?: number}>> = {
  'Resume Screening': [
    { name: 'Upload & Configure', path: '/resume-screening?upload_configure' },
    { name: 'Screening Process', path: '/resume-screening?screening_process' },
    { name: 'Results & Analysis', path: '/resume-screening?result_analysis' },
  ],
  Candidates: [
    { name: 'All Candidates', path: '/candidates?all' },
    { name: 'Shortlisted', path: '/candidates?shortlisted' },
    { name: 'Rejected', path: '/candidates?rejected' },
    { name: 'Add Candidate', path: '/candidates?add' },
  ],
  Interviews: [
    { name: 'Schedule Interview', path: '/interviews?schedule' },
    { name: 'Upcoming Interviews', path: '/interviews?upcoming' },
    { name: 'Past Interviews', path: '/interviews?past' },
    { name: 'Interview Feedback', path: '/interviews?feedback' },
  ],
  Offers: [
    { name: 'Active Offers', path: '/offers?active' },
    { name: 'Expiring Soon', path: '/offers?expiring' },
    { name: 'Completed', path: '/offers?completed' },
    { name: 'All Offers', path: '/offers?all' },
    { name: 'Create Offer', path: '/offers?create', icon: PlusIcon },
  ],
  Communication: [
    { name: 'Inbox', path: '/communication?inbox' },
    { name: 'Sent', path: '/communication?sent' },
    { name: 'Templates', path: '/communication?templates' },
    { name: 'Scheduled', path: '/communication?scheduled' },
    { name: 'Compose Email', path: '/communication?compose' },
  ],
  Documents: [
    { name: 'All Documents', path: '/documents?all' },
    { name: 'Upload Document', path: '/documents?upload' },
    { name: 'Document Types', path: '/documents?types' },
    { name: 'Expiring Documents', path: '/documents?expiring' },
  ],
  'JD Enhancement': [
    { name: 'Enhance JD', path: '/jd-enhancement?enhance' },
    { name: 'Templates', path: '/jd-enhancement?templates' },
    { name: 'Analysis', path: '/jd-enhancement?analysis' },
    { name: 'History', path: '/jd-enhancement?history' },
  ],
  Reports: [
    { name: 'Reports Overview', path: '/reports?overview' },
    { name: 'New Report', path: '/reports?new' },
    { name: 'Recent Reports', path: '/reports?recent' },
    { name: 'Saved Reports', path: '/reports?saved' },
    { name: 'Scheduled Reports', path: '/reports?scheduled' },
    { name: 'Saved Searches', path: '/reports?saved-searches' },
    { name: 'Financial', path: '/reports?financial' },
    { name: 'Revenue', path: '/reports?revenue' },
    { name: 'Banking/Budgeting', path: '/reports?banking' },
    { name: 'Employees/HR', path: '/reports?hr' },
    { name: 'Projects', path: '/reports?projects' },
    { name: 'Time & Billables', path: '/reports?billables' },
    { name: 'Purchases', path: '/reports?purchases' },
  ],
  Admin: [
    { name: 'User Management', path: '/admin?users' },
    { name: 'Role Management', path: '/admin?roles' },
    { name: 'Permissions', path: '/admin?permissions' },
    { name: 'Audit Logs', path: '/admin?audit' },
  ],
  Settings: [
    { name: 'General', path: '/settings?general' },
    { name: 'Notifications', path: '/settings?notifications' },
    { name: 'Integrations', path: '/settings?integrations' },
    { name: 'Security', path: '/settings?security' },
  ],
  'System Preferences': [
    { name: 'Application Settings', path: '/system-preferences?application' },
    { name: 'Database Configuration', path: '/system-preferences?database' },
    { name: 'API Management', path: '/system-preferences?api' },
    { name: 'Email Configuration', path: '/system-preferences?email' },
    { name: 'File Storage', path: '/system-preferences?storage' },
    { name: 'Backup & Recovery', path: '/system-preferences?backup' },
    { name: 'Performance Tuning', path: '/system-preferences?performance' },
    { name: 'Logging & Monitoring', path: '/system-preferences?logging' },
    { name: 'System Health', path: '/system-preferences?health' },
    { name: 'Maintenance Mode', path: '/system-preferences?maintenance' },
  ],
};

const navigationItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Resume Screening', path: '/resume-screening', icon: DocumentMagnifyingGlassIcon },
  { name: 'Candidates', path: '/candidates', icon: UsersIcon },
  { name: 'Interviews', path: '/interviews', icon: CalendarIcon },
  { name: 'Offers', path: '/offers', icon: BriefcaseIcon },
  { name: 'Communication', path: '/communication', icon: EnvelopeIcon },
  { name: 'Documents', path: '/documents', icon: FolderIcon },
  { name: 'JD Enhancement', path: '/jd-enhancement', icon: PencilSquareIcon },
  { name: 'Reports', path: '/reports', icon: DocumentArrowDownIcon },
  { name: 'Admin', path: '/admin', icon: UserGroupIcon },
  { name: 'Settings', path: '/settings', icon: CogIcon },
  { name: 'System Preferences', path: '/system-preferences', icon: CogIcon },
];

const NavigationBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, width: 320 });
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [visibleTabs, setVisibleTabs] = useState(navigationItems);
  const [overflowTabs, setOverflowTabs] = useState<typeof navigationItems>([]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        navBarRef.current &&
        !navBarRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  // Update dropdown position when openDropdown changes
  useEffect(() => {
    if (openDropdown && tabRefs.current[openDropdown]) {
      const rect = tabRefs.current[openDropdown]?.getBoundingClientRect();
      const navRect = navBarRef.current?.getBoundingClientRect();
      if (rect && navRect) {
        setDropdownPosition({
          left: rect.left - navRect.left,
          width: 320
        });
      }
    }
  }, [openDropdown]);

  // Responsive overflow logic
  useEffect(() => {
    const handleResize = () => {
      if (!navBarRef.current) return;
      const navWidth = navBarRef.current.offsetWidth;
      let total = 0;
      let lastVisible = navigationItems.length;
      const tempVisible = [];
      const tempOverflow = [];
      for (let i = 0; i < navigationItems.length; i++) {
        const tab = tabRefs.current[navigationItems[i].name];
        if (!tab) continue;
        total += tab.offsetWidth;
        if (total + 40 > navWidth) { // 40px buffer for 'More'
          lastVisible = i;
          break;
        }
      }
      for (let i = 0; i < navigationItems.length; i++) {
        if (i < lastVisible) tempVisible.push(navigationItems[i]);
        else tempOverflow.push(navigationItems[i]);
      }
      setVisibleTabs(tempVisible);
      setOverflowTabs(tempOverflow);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dropdown open/close handlers
  const handleTabMouseEnter = (item: typeof navigationItems[0]) => {
    if (menuData[item.name]) setOpenDropdown(item.name);
  };
  const handleTabMouseLeave = (item: typeof navigationItems[0]) => {
    // Delay to allow moving into dropdown
    setTimeout(() => {
      if (!dropdownRef.current?.matches(':hover') && !navBarRef.current?.matches(':hover')) {
        setOpenDropdown(null);
      }
    }, 100);
  };
  const handleTabClick = (item: typeof navigationItems[0], e: React.MouseEvent) => {
    if (menuData[item.name]) {
      e.preventDefault();
      setOpenDropdown(openDropdown === item.name ? null : item.name);
    }
  };
  const handleDropdownMouseLeave = () => {
    setOpenDropdown(null);
  };
  const handleDropdownItemClick = (path: string) => {
    router.push(path);
    setOpenDropdown(null);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm relative z-30">
      <div ref={navBarRef} className="flex space-x-0.5 px-1 sm:px-2 lg:px-4 overflow-x-auto relative z-30">
        {visibleTabs.map((item) => {
          const Icon = item.icon;
          const hasDropdown = !!menuData[item.name];
          return (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => hasDropdown && handleTabMouseEnter(item)}
              onMouseLeave={() => hasDropdown && handleTabMouseLeave(item)}
              style={{ display: 'inline-block' }}
              ref={el => {
                tabRefs.current[item.name] = el;
              }}
            >
              <Link
                href={item.path}
                onClick={hasDropdown ? (e) => handleTabClick(item, e) : undefined}
                className={`flex items-center space-x-1 px-3 py-2 mt-1 mb-0.5 rounded-t-md border-b-2 text-sm font-medium whitespace-nowrap transition-colors
                  ${isActive(item.path) || openDropdown === item.name
                    ? 'border-blue-600 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-700 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-400'}
                `}
                style={{ minWidth: 'max-content' }}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </div>
          );
        })}
        {/* More dropdown for overflow tabs */}
        {overflowTabs.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown('More')}
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ display: 'inline-block' }}
            ref={el => { tabRefs.current['More'] = el; }}
          >
            <button
              className="flex items-center space-x-1 px-3 py-2 mt-1 mb-0.5 rounded-t-md border-b-2 text-sm font-medium whitespace-nowrap transition-colors border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-700 hover:bg-white dark:hover:bg-gray-800 hover:border-blue-400"
            >
              <span>More</span>
            </button>
          </div>
        )}
      </div>
      {/* Absolutely positioned dropdown below nav, left-aligned with tab */}
      {openDropdown && ((menuData[openDropdown] && openDropdown !== 'More') || openDropdown === 'More') && (
        <div
          ref={dropdownRef}
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-[9999] rounded-md"
          style={{
            top: navBarRef.current ? navBarRef.current.getBoundingClientRect().bottom + window.scrollY : 56,
            left: dropdownPosition.left + (navBarRef.current ? navBarRef.current.getBoundingClientRect().left + window.scrollX : 0),
            width: dropdownPosition.width,
            minWidth: 220,
            maxWidth: 320
          }}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="flex flex-col py-2">
            {openDropdown === 'More'
              ? overflowTabs.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.path)}
                    className="flex items-center w-full px-6 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                  >
                    <item.icon className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                ))
              : menuData[openDropdown]?.map((option, idx) => (
                  <button
                    key={option.name}
                    onClick={() => handleDropdownItemClick(option.path)}
                    className="flex items-center justify-between w-full px-6 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      {option.icon ? (
                        <option.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-sm font-medium">{option.name}</span>
                    </div>
                    {option.count !== undefined && (
                      <span className={`py-0.5 px-2 text-xs rounded-full ${
                        option.name === 'Expiring Soon' && option.count > 0
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                      }`}>
                        {option.count}
                      </span>
                    )}
                  </button>
                ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar; 