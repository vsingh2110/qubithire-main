'use client';

import React from 'react';
import { CogIcon, ServerIcon, CircleStackIcon, KeyIcon } from '@heroicons/react/24/outline';

const SystemPreferences: React.FC = () => {
  return (
    <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">System Preferences</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Advanced system configuration and preferences
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Application</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">App settings</p>
              </div>
              <CogIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Database</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Database config</p>
              </div>
              <CircleStackIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">API Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">API settings</p>
              </div>
              <KeyIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Health</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Health monitoring</p>
              </div>
              <ServerIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              System Configuration
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <CogIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                System preferences available to administrators only.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SystemPreferences; 