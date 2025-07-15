'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ChartBarIcon, ChartPieIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline';

const Analytics: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Recruitment analytics and performance insights
          </p>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Analytics Dashboard
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Analytics dashboard coming soon. Track your recruitment metrics here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics; 