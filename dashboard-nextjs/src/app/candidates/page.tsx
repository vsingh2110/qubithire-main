'use client';

import React from 'react';
import { UsersIcon, PlusIcon, FunnelIcon } from '@heroicons/react/24/outline';

const Candidates: React.FC = () => {
  return (
    <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Candidates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and track your candidate pipeline
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">All Candidates</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View all candidates</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Shortlisted</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top candidates</p>
              </div>
              <FunnelIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Rejected</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Declined candidates</p>
              </div>
              <UsersIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Candidate</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add new candidate</p>
              </div>
              <PlusIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Candidate List
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No candidates found. Start by adding candidates or screening resumes.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Candidates; 