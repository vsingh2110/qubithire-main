'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  EnvelopeIcon,
  PaperAirplaneIcon,
  InboxIcon,
  ArchiveBoxIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface Email {
  id: number;
  from: string;
  to: string;
  subject: string;
  type: 'interview-confirmation' | 'offer-letter' | 'application-confirmation' | 'interview-reminder' | 'rejection';
  status: 'sent' | 'delivered' | 'pending' | 'failed';
  date: string;
  content: string;
  candidate: string;
  isRead: boolean;
}

interface Template {
  id: number;
  name: string;
  type: 'interview-invitation' | 'offer-letter' | 'application-confirmation' | 'interview-reminder' | 'rejection';
  subject: string;
  usage: number;
}

// Helper functions defined before component
const getStatusColor = (status: string) => {
  switch (status) {
    case 'sent':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'delivered':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'failed':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'interview-invitation':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'offer-letter':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'application-confirmation':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'interview-reminder':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'rejection':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const CommunicationPage = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  // Get the active section from URL query parameter, default to 'inbox'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'inbox';

  const emails: Email[] = [
    {
      id: 1,
      from: 'system@qubitHire.com',
      to: 'john.smith@email.com',
      subject: 'Interview Confirmation - Senior React Developer Position',
      type: 'interview-confirmation',
      status: 'sent',
      date: '2024-01-20T09:00:00Z',
      content: 'Thank you for your interest in our Senior React Developer position. We are pleased to confirm your interview scheduled for January 25th, 2024 at 2:00 PM. Please arrive 10 minutes early and bring a copy of your resume. If you have any questions, please don\'t hesitate to contact us.',
      candidate: 'John Smith',
      isRead: true
    },
    {
      id: 2,
      from: 'hr@company.com',
      to: 'sarah.j@email.com',
      subject: 'Offer Letter - UX Designer Position',
      type: 'offer-letter',
      status: 'sent',
      date: '2024-01-19T14:30:00Z',
      content: 'We are excited to extend an offer for the UX Designer position. Your proposed start date is February 1st, 2024. Please review the attached offer letter and respond within 5 business days. We look forward to having you join our team!',
      candidate: 'Sarah Johnson',
      isRead: true
    },
    {
      id: 3,
      from: 'system@qubitHire.com',
      to: 'mike.davis@email.com',
      subject: 'Application Received - Data Scientist Position',
      type: 'application-confirmation',
      status: 'delivered',
      date: '2024-01-18T11:15:00Z',
      content: 'We have received your application for the Data Scientist position. Our team will review your qualifications and get back to you within 3-5 business days. Thank you for your interest in joining our company.',
      candidate: 'Mike Davis',
      isRead: false
    },
    {
      id: 4,
      from: 'system@qubitHire.com',
      to: 'emily.chen@email.com',
      subject: 'Interview Reminder - Product Manager Position',
      type: 'interview-reminder',
      status: 'pending',
      date: '2024-01-21T08:00:00Z',
      content: 'This is a friendly reminder about your upcoming interview for the Product Manager position. Your interview is scheduled for tomorrow at 10:00 AM. Please prepare to discuss your experience and portfolio.',
      candidate: 'Emily Chen',
      isRead: false
    }
  ];

  const templates: Template[] = [
    {
      id: 1,
      name: 'Interview Invitation',
      type: 'interview-invitation',
      subject: 'Interview Invitation - {{position}} Position',
      usage: 24
    },
    {
      id: 2,
      name: 'Offer Letter',
      type: 'offer-letter',
      subject: 'Job Offer - {{position}} Position',
      usage: 8
    },
    {
      id: 3,
      name: 'Application Received',
      type: 'application-confirmation',
      subject: 'Application Received - {{position}}',
      usage: 156
    },
    {
      id: 4,
      name: 'Interview Reminder',
      type: 'interview-reminder',
      subject: 'Interview Reminder - {{position}}',
      usage: 32
    },
    {
      id: 5,
      name: 'Rejection Letter',
      type: 'rejection',
      subject: 'Update on Your Application - {{position}}',
      usage: 89
    }
  ];

  const filteredEmails = emails.filter(email =>
    email.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'inbox':
        return (
          <div className="space-y-4">
            {filteredEmails.map(email => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>
        );

      case 'sent':
        return (
          <div className="space-y-4">
            {filteredEmails.filter(email => email.status === 'sent').map(email => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>
        );

      case 'templates':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        );

      case 'scheduled':
        return (
          <div className="space-y-4">
            {filteredEmails.filter(email => email.status === 'pending').map(email => (
              <EmailCard key={email.id} email={email} />
            ))}
          </div>
        );

      case 'compose':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Compose Email
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    To
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="recipient@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Email subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Write your message here..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Save Draft
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
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
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer ${
        !email.isRead ? 'border-l-4 border-l-blue-500' : ''
      }`}
      onClick={() => setSelectedEmail(email)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className={`text-sm font-medium ${!email.isRead ? 'font-bold' : ''} text-gray-900 dark:text-gray-100`}>
              {email.candidate}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(email.status)}`}>
              {email.status}
            </span>
          </div>
          <p className={`text-sm ${!email.isRead ? 'font-semibold' : ''} text-gray-700 dark:text-gray-300 mb-1`}>
            {email.subject}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {email.content.substring(0, 100)}...
          </p>
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 text-xs rounded ${getTypeColor(email.type)}`}>
              {email.type.replace('-', ' ')}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(email.date).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded">
            <EyeIcon className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
            <ArchiveBoxIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const TemplateCard = ({ template }: { template: Template }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {template.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {template.subject}
          </p>
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 text-xs rounded ${getTypeColor(template.type)}`}>
              {template.type.replace('-', ' ')}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Used {template.usage} times
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded">
            <PencilIcon className="h-4 w-4" />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded">
            <PaperAirplaneIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Email Communication
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Automated email management and communication templates
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <PencilIcon className="h-5 w-5" />
          <span>Compose Email</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <EnvelopeIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Emails</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">1,247</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <PaperAirplaneIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Sent Today</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">32</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">1,195</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      {activeSection !== 'templates' && activeSection !== 'compose' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Filters</span>
            </button>
          </div>
        </div>
      )}

      {/* Current Tab Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current View:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {activeSection === 'inbox' && 'Inbox'}
              {activeSection === 'sent' && 'Sent'}
              {activeSection === 'templates' && 'Templates'}
              {activeSection === 'scheduled' && 'Scheduled'}
              {activeSection === 'compose' && 'Compose Email'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeSection === 'templates' ? `${templates.length} templates` : `${filteredEmails.length} emails`}
          </div>
        </div>
      </div>

      {/* Content based on active section */}
      {renderContent()}

      {/* Email Detail Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedEmail.subject}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    To: {selectedEmail.to}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedEmail.date).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>{selectedEmail.content}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Reply
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                  Forward
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationPage; 