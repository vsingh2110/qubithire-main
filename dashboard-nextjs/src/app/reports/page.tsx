'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ChartBarIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  CogIcon,
  BookmarkIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface Report {
  id: number;
  name: string;
  description: string;
  type: string;
  icon: any;
  metrics: string[];
  lastGenerated: string;
  frequency: string;
}

interface SavedSearch {
  id: number;
  name: string;
  description: string;
  filters: Record<string, string>;
  createdBy: string;
  createdAt: string;
  lastUsed: string;
}

const ReportsPageContent = () => {
  const searchParams = useSearchParams();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [dateRange, setDateRange] = useState('30days');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchDescription, setSearchDescription] = useState('');

  // Get the active section from URL query parameter, default to 'overview'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'overview';

  // Sample report data
  const reports: Report[] = [
    {
      id: 1,
      name: 'Hiring Pipeline Report',
      description: 'Comprehensive view of candidates across all stages',
      type: 'pipeline',
      icon: UserGroupIcon,
      metrics: ['Total Candidates', 'Time to Hire', 'Conversion Rates'],
      lastGenerated: '2024-01-20T10:00:00Z',
      frequency: 'weekly'
    },
    {
      id: 2,
      name: 'Interview Performance Report',
      description: 'Interview scheduling and feedback analysis',
      type: 'interviews',
      icon: CalendarIcon,
      metrics: ['Scheduled Interviews', 'Completion Rate', 'Average Rating'],
      lastGenerated: '2024-01-19T14:30:00Z',
      frequency: 'daily'
    },
    {
      id: 3,
      name: 'Offer Acceptance Report',
      description: 'Offer letter tracking and acceptance rates',
      type: 'offers',
      icon: CurrencyDollarIcon,
      metrics: ['Offers Sent', 'Acceptance Rate', 'Time to Accept'],
      lastGenerated: '2024-01-18T09:15:00Z',
      frequency: 'weekly'
    },
    {
      id: 4,
      name: 'BGV Status Report',
      description: 'Background verification progress and completion',
      type: 'bgv',
      icon: CheckCircleIcon,
      metrics: ['BGV Initiated', 'Completion Rate', 'Average Time'],
      lastGenerated: '2024-01-17T16:45:00Z',
      frequency: 'daily'
    },
    {
      id: 5,
      name: 'Cost Analysis Report',
      description: 'Recruitment costs and ROI analysis',
      type: 'costs',
      icon: CurrencyDollarIcon,
      metrics: ['Total Cost', 'Cost per Hire', 'ROI'],
      lastGenerated: '2024-01-16T11:20:00Z',
      frequency: 'monthly'
    },
    {
      id: 6,
      name: 'Source Effectiveness Report',
      description: 'Candidate source performance and quality',
      type: 'sources',
      icon: StarIcon,
      metrics: ['Source Volume', 'Quality Score', 'Conversion Rate'],
      lastGenerated: '2024-01-15T13:10:00Z',
      frequency: 'weekly'
    }
  ];

  // Sample saved searches
  const initialSavedSearches: SavedSearch[] = [
    {
      id: 1,
      name: 'Senior Developers - Last 30 Days',
      description: 'All senior developer candidates from the last 30 days',
      filters: {
        position: 'Senior Developer',
        dateRange: '30days',
        status: 'interview-scheduled'
      },
      createdBy: 'John Doe',
      createdAt: '2024-01-15T10:00:00Z',
      lastUsed: '2024-01-20T14:30:00Z'
    },
    {
      id: 2,
      name: 'High Priority Candidates',
      description: 'Candidates with high scores and urgent hiring needs',
      filters: {
        score: '90+',
        priority: 'high',
        status: 'screening'
      },
      createdBy: 'Sarah Johnson',
      createdAt: '2024-01-10T09:00:00Z',
      lastUsed: '2024-01-19T16:45:00Z'
    },
    {
      id: 3,
      name: 'BGV Pending Candidates',
      description: 'Candidates waiting for background verification',
      filters: {
        status: 'bgv_pending',
        department: 'engineering'
      },
      createdBy: 'Mike Davis',
      createdAt: '2024-01-12T11:30:00Z',
      lastUsed: '2024-01-18T10:15:00Z'
    }
  ];

  useEffect(() => {
    setSavedSearches(initialSavedSearches);
  }, []);

  const generateReport = (report: Report) => {
    setSelectedReport(report);
    // Simulate report generation
    setTimeout(() => {
      console.log(`Generated ${report.name}`);
    }, 1000);
  };

  const exportToCSV = (report: Report) => {
    // Simulate CSV export
    const csvContent = `Name,Email,Position,Status,Score,Applied Date\nJohn Smith,john@email.com,Senior Developer,Interview Scheduled,94,2024-01-15\nSarah Johnson,sarah@email.com,UX Designer,Offer Sent,89,2024-01-12`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const saveSearch = () => {
    const newSearch: SavedSearch = {
      id: Date.now(),
      name: searchName,
      description: searchDescription,
      filters: {
        dateRange,
        department,
        status
      },
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };
    setSavedSearches(prev => [...prev, newSearch]);
    setShowSaveSearchModal(false);
    setSearchName('');
    setSearchDescription('');
  };

  const deleteSavedSearch = (searchId: number) => {
    setSavedSearches(prev => prev.filter(search => search.id !== searchId));
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <UserGroupIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Candidates</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">1,247</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <CalendarIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interviews This Week</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">23</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Offers Sent</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">8</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <ClockIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Time to Hire</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">18 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        );

      case 'new':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Create New Report
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Report Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>Hiring Pipeline Report</option>
                    <option>Interview Performance Report</option>
                    <option>Offer Acceptance Report</option>
                    <option>BGV Status Report</option>
                    <option>Cost Analysis Report</option>
                    <option>Source Effectiveness Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Range
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Frequency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>One-time</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        );

      case 'recent':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.slice(0, 6).map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        );

      case 'saved':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Saved Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(report => report.frequency !== 'one-time').map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        );

      case 'scheduled':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Scheduled Reports
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Weekly Pipeline Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Every Monday at 9:00 AM</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                      Active
                    </span>
                    <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Monthly Cost Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">First day of each month at 8:00 AM</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                      Active
                    </span>
                    <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'saved-searches':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Saved Searches
              </h2>
              <button
                onClick={() => setShowSaveSearchModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>New Search</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedSearches.map(search => (
                <SavedSearchCard key={search.id} search={search} />
              ))}
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Financial Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(report => report.type === 'costs').map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        );

      case 'revenue':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Revenue Reports
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Monthly Revenue Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Revenue analysis and projections</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Quarterly Revenue Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quarterly revenue trends and insights</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'banking':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Banking & Budgeting Reports
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Budget Allocation Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Department budget tracking and analysis</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Expense Tracking Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly expense analysis and trends</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'hr':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              HR Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.filter(report => ['pipeline', 'interviews', 'offers'].includes(report.type)).map(report => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Project Reports
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Project Timeline Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Project progress and milestone tracking</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Resource Allocation Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Team allocation and capacity analysis</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billables':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Time & Billables Reports
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Time Tracking Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Employee time tracking and analysis</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Billable Hours Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Client billable hours and revenue</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'purchases':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Purchase Reports
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Purchase Order Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Purchase order tracking and analysis</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Vendor Analysis Report</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Vendor performance and cost analysis</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Select a section from the navigation dropdown</p>
          </div>
        );
    }
  };

  const ReportCard = ({ report }: { report: Report }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <report.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {report.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {report.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => generateReport(report)}
            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Generate Report"
          >
            <ChartBarIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => exportToCSV(report)}
            className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            title="Export to CSV"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Last Generated:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {new Date(report.lastGenerated).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Frequency:</span>
          <span className="text-gray-900 dark:text-gray-100 capitalize">
            {report.frequency}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Metrics:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {report.metrics.length} metrics
          </span>
        </div>
      </div>
    </div>
  );

  const SavedSearchCard = ({ search }: { search: SavedSearch }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {search.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {search.description}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Run Search"
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteSavedSearch(search.id)}
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete Search"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Created by:</span>
          <span className="text-gray-900 dark:text-gray-100">{search.createdBy}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400">Last used:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {new Date(search.lastUsed).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  const SaveSearchModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Save Search
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Name
            </label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter search name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={searchDescription}
              onChange={(e) => setSearchDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Describe this search"
            />
          </div>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={saveSearch}
            disabled={!searchName.trim()}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Search
          </button>
          <button
            onClick={() => setShowSaveSearchModal(false)}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Generate comprehensive reports and manage saved searches
        </p>
      </div>

      {/* Current Tab Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current View:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {activeSection === 'overview' && 'Reports Overview'}
              {activeSection === 'new' && 'Create New Report'}
              {activeSection === 'recent' && 'Recent Reports'}
              {activeSection === 'saved' && 'Saved Reports'}
              {activeSection === 'scheduled' && 'Scheduled Reports'}
              {activeSection === 'saved-searches' && 'Saved Searches'}
              {activeSection === 'financial' && 'Financial Reports'}
              {activeSection === 'revenue' && 'Revenue Reports'}
              {activeSection === 'banking' && 'Banking & Budgeting'}
              {activeSection === 'hr' && 'HR Reports'}
              {activeSection === 'projects' && 'Project Reports'}
              {activeSection === 'billables' && 'Time & Billables'}
              {activeSection === 'purchases' && 'Purchase Reports'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeSection === 'overview' ? `${reports.length} reports available` : ''}
            {activeSection === 'saved-searches' ? `${savedSearches.length} saved searches` : ''}
          </div>
        </div>
      </div>

      {/* Content based on active section */}
      {renderContent()}

      {/* Modals */}
      {showSaveSearchModal && <SaveSearchModal />}
    </div>
  );
};

const ReportsPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading reports...</p>
        </div>
      </div>
    }>
      <ReportsPageContent />
    </Suspense>
  );
};

export default ReportsPage; 