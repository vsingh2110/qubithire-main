'use client';

import React from 'react';
import { DocumentMagnifyingGlassIcon, ArrowUpTrayIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const ResumeScreening: React.FC = () => {
  return (
    <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Resume Screening</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            AI-powered resume screening and candidate evaluation
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Upload & Configure</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Upload resumes and configure screening criteria
                </p>
              </div>
              <ArrowUpTrayIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Screening Process</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Monitor and manage active screening processes
                </p>
              </div>
              <AdjustmentsHorizontalIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Results & Analysis</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  View screening results and detailed analysis
                </p>
              </div>
              <DocumentMagnifyingGlassIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Recent Screening Results
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <DocumentMagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No screening results yet. Upload resumes to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ResumeScreening; 