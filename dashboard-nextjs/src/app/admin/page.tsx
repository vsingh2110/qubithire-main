'use client';

import React from 'react';
import { UserGroupIcon, ShieldCheckIcon, DocumentTextIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const Admin: React.FC = () => {
  return (
    <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            System administration and user management
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage users</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Role Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure roles</p>
              </div>
              <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Permissions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Access control</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Audit Logs</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">System logs</p>
              </div>
              <ClipboardDocumentListIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Admin Dashboard
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Admin features are under development. Check back soon.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Admin; 