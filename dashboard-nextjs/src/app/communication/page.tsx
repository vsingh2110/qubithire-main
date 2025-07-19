'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  EnvelopeIcon,
  PaperAirplaneIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  StarIcon,
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface Email {
  id: number;
  subject: string;
  candidateName: string;
  type: string;
  status: string;
  sentDate: string;
  template: string;
  priority: string;
}

interface Template {
  id: number;
  name: string;
  category: string;
  usage: number;
  lastUsed: string;
  description: string;
}

const CommunicationPageContent = () => {
  const searchParams = useSearchParams();
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      subject: 'Interview Invitation - Senior React Developer',
      candidateName: 'John Smith',
      type: 'interview_invitation',
      status: 'sent',
      sentDate: '2024-01-20T10:00:00Z',
      template: 'Interview Invitation',
      priority: 'high'
    },
    {
      id: 2,
      subject: 'Offer Letter - UX Designer Position',
      candidateName: 'Emily Chen',
      type: 'offer_letter',
      status: 'sent',
      sentDate: '2024-01-19T14:30:00Z',
      template: 'Offer Letter',
      priority: 'high'
    },
    {
      id: 3,
      subject: 'Application Received - Thank You',
      candidateName: 'David Wilson',
      type: 'application_received',
      status: 'scheduled',
      sentDate: '2024-01-18T09:15:00Z',
      template: 'Application Received',
      priority: 'medium'
    },
    {
      id: 4,
      subject: 'Rejection Letter - Product Manager',
      candidateName: 'Sarah Johnson',
      type: 'rejection_letter',
      status: 'draft',
      sentDate: '2024-01-17T16:45:00Z',
      template: 'Rejection Letter',
      priority: 'low'
    },
    {
      id: 5,
      subject: 'Background Check Initiated',
      candidateName: 'Michael Rodriguez',
      type: 'bgv_initiated',
      status: 'sent',
      sentDate: '2024-01-16T11:20:00Z',
      template: 'BGV Initiated',
      priority: 'medium'
    },
    {
      id: 6,
      subject: 'Onboarding Welcome - New Hire',
      candidateName: 'Jessica Kim',
      type: 'onboarding_welcome',
      status: 'scheduled',
      sentDate: '2024-01-15T13:10:00Z',
      template: 'Onboarding Welcome',
      priority: 'high'
    }
  ]);

  const templates: Template[] = [
    {
      id: 1,
      name: 'Interview Invitation',
      category: 'Interview',
      usage: 45,
      lastUsed: '2024-01-20T10:00:00Z',
      description: 'Standard interview invitation template'
    },
    {
      id: 2,
      name: 'Offer Letter',
      category: 'Offer',
      usage: 32,
      lastUsed: '2024-01-19T14:30:00Z',
      description: 'Professional offer letter template'
    },
    {
      id: 3,
      name: 'Application Received',
      category: 'Acknowledgment',
      usage: 128,
      lastUsed: '2024-01-18T09:15:00Z',
      description: 'Thank you for your application'
    },
    {
      id: 4,
      name: 'Rejection Letter',
      category: 'Rejection',
      usage: 23,
      lastUsed: '2024-01-17T16:45:00Z',
      description: 'Professional rejection letter'
    },
    {
      id: 5,
      name: 'BGV Initiated',
      category: 'Background Check',
      usage: 19,
      lastUsed: '2024-01-16T11:20:00Z',
      description: 'Background verification initiation'
    },
    {
      id: 6,
      name: 'Onboarding Welcome',
      category: 'Onboarding',
      usage: 8,
      lastUsed: '2024-01-15T13:10:00Z',
      description: 'Welcome new hires to the team'
    }
  ];

  // Get the active section from URL query parameter, default to 'inbox'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'inbox';

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'sent': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'scheduled': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'draft': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'failed': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'interview_invitation': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'offer_letter': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'application_received': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'rejection_letter': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'bgv_initiated': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'onboarding_welcome': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'inbox':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Inbox
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <PlusIcon className="h-4 w-4" />
                <span>Compose Email</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emails.filter(email => email.status === 'sent').map(email => (
                <EmailCard key={email.id} email={email} />
              ))}
            </div>
          </div>
        );

      case 'sent':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Sent Emails
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emails.filter(email => email.status === 'sent').map(email => (
                <EmailCard key={email.id} email={email} />
              ))}
            </div>
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Email Templates
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <PlusIcon className="h-4 w-4" />
                <span>Create Template</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        );

      case 'scheduled':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Scheduled Emails
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emails.filter(email => email.status === 'scheduled').map(email => (
                <EmailCard key={email.id} email={email} />
              ))}
            </div>
          </div>
        );

      case 'compose':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Compose Email
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter recipient email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter email subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option value="">Select a template</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter your message..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Save Draft
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Select a section from the navigation dropdown</p>
          </div>
        );
    }
  };

  const EmailCard = ({ email }: { email: Email }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {email.subject}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {email.candidateName}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(email.status)}`}>
              {email.status}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(email.type)}`}>
              {email.type.replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="View">
            <EyeIcon className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400" title="Edit">
            <PencilIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Sent:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {new Date(email.sentDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Template:</span>
          <span className="text-gray-900 dark:text-gray-100">{email.template}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Priority:</span>
          <span className={`text-gray-900 dark:text-gray-100 capitalize ${
            email.priority === 'high' ? 'text-red-600 dark:text-red-400' :
            email.priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
            'text-green-600 dark:text-green-400'
          }`}>
            {email.priority}
          </span>
        </div>
      </div>
    </div>
  );

  const TemplateCard = ({ template }: { template: Template }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {template.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {template.description}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {template.category}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="Use Template">
            <DocumentTextIcon className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400" title="Edit">
            <PencilIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Usage:</span>
          <span className="text-gray-900 dark:text-gray-100">{template.usage} times</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Last Used:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {new Date(template.lastUsed).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Email Communication
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage email communications and templates
        </p>
      </div>

      {/* Current Tab Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current View:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {activeSection === 'inbox' && 'Inbox'}
              {activeSection === 'sent' && 'Sent Emails'}
              {activeSection === 'templates' && 'Email Templates'}
              {activeSection === 'scheduled' && 'Scheduled Emails'}
              {activeSection === 'compose' && 'Compose Email'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeSection === 'inbox' ? `${emails.filter(e => e.status === 'sent').length} emails` : ''}
            {activeSection === 'sent' ? `${emails.filter(e => e.status === 'sent').length} sent` : ''}
            {activeSection === 'templates' ? `${templates.length} templates` : ''}
            {activeSection === 'scheduled' ? `${emails.filter(e => e.status === 'scheduled').length} scheduled` : ''}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <EnvelopeIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Emails</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{emails.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <PaperAirplaneIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Sent Today</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {emails.filter(e => e.status === 'sent' && new Date(e.sentDate).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {emails.filter(e => e.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {emails.filter(e => e.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active section */}
      {renderContent()}
    </div>
  );
};

const CommunicationPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading communication...</p>
        </div>
      </div>
    }>
      <CommunicationPageContent />
    </Suspense>
  );
};

export default CommunicationPage; 
