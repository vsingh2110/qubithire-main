'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { DocumentArrowDownIcon, PlusIcon, ClockIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const Reports: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Generate and manage recruitment reports
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Overview</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Reports overview</p>
              </div>
              <DocumentArrowDownIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">New Report</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create new report</p>
              </div>
              <PlusIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Scheduled</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Scheduled reports</p>
              </div>
              <ClockIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Saved</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Saved reports</p>
              </div>
              <BookmarkIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Report Management
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <DocumentArrowDownIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No reports generated yet. Create your first report to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports; 