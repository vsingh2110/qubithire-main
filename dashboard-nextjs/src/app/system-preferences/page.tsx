'use client';

import React, { Suspense } from 'react';
import { CogIcon, ServerIcon, CircleStackIcon, KeyIcon } from '@heroicons/react/24/outline';

const SystemPreferencesContent: React.FC = () => {
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

const SystemPreferencesFallback: React.FC = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

const SystemPreferences: React.FC = () => {
  return (
    <Suspense fallback={<SystemPreferencesFallback />}>
      <SystemPreferencesContent />
    </Suspense>
  );
};

export default SystemPreferences; 