'use client';

import React from 'react';
import { BriefcaseIcon, PlusIcon, ClockIcon, CheckIcon } from '@heroicons/react/24/outline';

const Offers: React.FC = () => {
  return (
    <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Offers</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage job offers and track responses
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Active Offers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Current offers</p>
              </div>
              <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Expiring Soon</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">2 expiring</p>
              </div>
              <ClockIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Completed</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Accepted/Rejected</p>
              </div>
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">All Offers</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View all</p>
              </div>
              <BriefcaseIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Create Offer</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">New offer</p>
              </div>
              <PlusIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Offer Management
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No offers created yet. Create your first offer for a candidate.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Offers; 