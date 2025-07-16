'use client';

import React from 'react';
import { EnvelopeIcon, InboxIcon, PaperAirplaneIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Communication: React.FC = () => {
  return (
    <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Communication</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage email communication with candidates
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Inbox</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Received messages</p>
              </div>
              <InboxIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sent</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sent messages</p>
              </div>
              <PaperAirplaneIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Templates</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Email templates</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Compose</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">New email</p>
              </div>
              <EnvelopeIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Email Communication
            </h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <EnvelopeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Email communication features coming soon. Manage candidate emails here.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Communication; 