'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { PencilSquareIcon, DocumentTextIcon, ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

const JDEnhancement: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">JD Enhancement</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            AI-powered job description enhancement and optimization
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Enhance JD</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Improve job descriptions</p>
              </div>
              <PencilSquareIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Templates</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">JD templates</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Analysis</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">JD analysis</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">History</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Enhancement history</p>
              </div>
              <ClockIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Job Description Enhancement
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <PencilSquareIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                JD enhancement tools coming soon. Optimize your job descriptions with AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JDEnhancement; 