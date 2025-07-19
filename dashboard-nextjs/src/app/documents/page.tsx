'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FolderIcon,
  DocumentTextIcon,
  DocumentArrowUpIcon,
  EyeIcon,
  TrashIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  CalendarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Document {
  id: number;
  name: string;
  type: string;
  candidateName: string;
  uploadDate: string;
  expiryDate?: string;
  status: string;
  size: string;
  uploadedBy: string;
}

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
}

interface BGVVendor {
  id: number;
  name: string;
  status: string;
  completionRate: number;
  avgProcessingTime: string;
  lastUpdated: string;
}

const DocumentsPageContent = () => {
  const searchParams = useSearchParams();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'John_Smith_Resume.pdf',
      type: 'resume',
      candidateName: 'John Smith',
      uploadDate: '2024-01-20T10:00:00Z',
      status: 'verified',
      size: '2.3 MB',
      uploadedBy: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'Emily_Chen_Certificate.pdf',
      type: 'certificate',
      candidateName: 'Emily Chen',
      uploadDate: '2024-01-19T14:30:00Z',
      expiryDate: '2025-06-15',
      status: 'active',
      size: '1.8 MB',
      uploadedBy: 'Mike Davis'
    },
    {
      id: 3,
      name: 'David_Wilson_Contract.pdf',
      type: 'contract',
      candidateName: 'David Wilson',
      uploadDate: '2024-01-18T09:15:00Z',
      status: 'pending',
      size: '3.1 MB',
      uploadedBy: 'Lisa Wang'
    },
    {
      id: 4,
      name: 'Sarah_Johnson_BGV_Report.pdf',
      type: 'background_check',
      candidateName: 'Sarah Johnson',
      uploadDate: '2024-01-17T16:45:00Z',
      status: 'verified',
      size: '4.2 MB',
      uploadedBy: 'Tom Brown'
    },
    {
      id: 5,
      name: 'Michael_Rodriguez_Portfolio.pdf',
      type: 'portfolio',
      candidateName: 'Michael Rodriguez',
      uploadDate: '2024-01-16T11:20:00Z',
      status: 'active',
      size: '5.7 MB',
      uploadedBy: 'Anna Lee'
    },
    {
      id: 6,
      name: 'Jessica_Kim_Reference_Letter.pdf',
      type: 'reference',
      candidateName: 'Jessica Kim',
      uploadDate: '2024-01-15T13:10:00Z',
      expiryDate: '2024-12-31',
      status: 'expiring',
      size: '1.5 MB',
      uploadedBy: 'Chris Park'
    }
  ]);

  const candidates: Candidate[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', position: 'Senior React Developer', status: 'interview-scheduled' },
    { id: 2, name: 'Emily Chen', email: 'emily.chen@email.com', position: 'UX Designer', status: 'offer-sent' },
    { id: 3, name: 'David Wilson', email: 'david.wilson@email.com', position: 'Product Manager', status: 'screening' },
    { id: 4, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', position: 'Marketing Specialist', status: 'hired' },
    { id: 5, name: 'Michael Rodriguez', email: 'michael.rodriguez@email.com', position: 'DevOps Engineer', status: 'interview-scheduled' },
    { id: 6, name: 'Jessica Kim', email: 'jessica.kim@email.com', position: 'Data Analyst', status: 'screening' }
  ];

  const bgvVendors: BGVVendor[] = [
    {
      id: 1,
      name: 'BackgroundCheck Pro',
      status: 'active',
      completionRate: 95,
      avgProcessingTime: '3-5 days',
      lastUpdated: '2024-01-20T10:00:00Z'
    },
    {
      id: 2,
      name: 'VerifyFirst Solutions',
      status: 'active',
      completionRate: 88,
      avgProcessingTime: '5-7 days',
      lastUpdated: '2024-01-19T14:30:00Z'
    },
    {
      id: 3,
      name: 'SecureScreen Inc',
      status: 'inactive',
      completionRate: 92,
      avgProcessingTime: '4-6 days',
      lastUpdated: '2024-01-18T09:15:00Z'
    }
  ];

  // Get the active section from URL query parameter, default to 'all'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'all';

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'verified': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'active': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'expiring': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'expired': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getBGVStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getDocumentIcon = (type: string) => {
    const icons: Record<string, any> = {
      'resume': DocumentTextIcon,
      'certificate': DocumentTextIcon,
      'contract': DocumentTextIcon,
      'background_check': DocumentTextIcon,
      'portfolio': DocumentTextIcon,
      'reference': DocumentTextIcon
    };
    return icons[type] || DocumentTextIcon;
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'all':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                All Documents
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <PlusIcon className="h-4 w-4" />
                <span>Upload Document</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map(document => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Upload Document
              </h2>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drag and drop files here, or click to select files
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Choose Files
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Document Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>Resume</option>
                    <option>Certificate</option>
                    <option>Contract</option>
                    <option>Background Check</option>
                    <option>Portfolio</option>
                    <option>Reference Letter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Candidate
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>Select candidate</option>
                    {candidates.map(candidate => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.position}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'types':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Document Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['resume', 'certificate', 'contract', 'background_check', 'portfolio', 'reference'].map(type => {
                const Icon = getDocumentIcon(type);
                const count = documents.filter(d => d.type === type).length;
                return (
                  <div key={type} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 capitalize">
                          {type.replace('_', ' ')}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {count} documents
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Active:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {documents.filter(d => d.type === type && d.status === 'active').length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Verified:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {documents.filter(d => d.type === type && d.status === 'verified').length}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'expiring':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Expiring Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.filter(doc => doc.expiryDate && new Date(doc.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).map(document => (
                <DocumentCard key={document.id} document={document} />
              ))}
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

  const DocumentCard = ({ document }: { document: Document }) => {
    const Icon = getDocumentIcon(document.type);
    const candidate = candidates.find(c => c.name === document.candidateName);
    const isExpiringSoon = document.expiryDate && new Date(document.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {document.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {document.candidateName} • {document.type.replace('_', ' ')}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
                  {document.status}
                </span>
                {isExpiringSoon && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    Expiring Soon
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="View">
              <EyeIcon className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400" title="Download">
              <ArrowDownTrayIcon className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400" title="Share">
              <ShareIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Uploaded:</span>
            <span className="text-gray-900 dark:text-gray-100">
              {new Date(document.uploadDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Size:</span>
            <span className="text-gray-900 dark:text-gray-100">{document.size}</span>
          </div>
          {document.expiryDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Expires:</span>
              <span className={`text-gray-900 dark:text-gray-100 ${isExpiringSoon ? 'text-orange-600 dark:text-orange-400 font-medium' : ''}`}>
                {new Date(document.expiryDate).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">By:</span>
            <span className="text-gray-900 dark:text-gray-100">{document.uploadedBy}</span>
          </div>
        </div>
      </div>
    );
  };

  const BGVVendorCard = ({ vendor }: { vendor: BGVVendor }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {vendor.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBGVStatusColor(vendor.status)}`}>
              {vendor.status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Completion Rate:</span>
          <span className="text-gray-900 dark:text-gray-100">{vendor.completionRate}%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Avg Processing:</span>
          <span className="text-gray-900 dark:text-gray-100">{vendor.avgProcessingTime}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {new Date(vendor.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Document Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload, organize, and track candidate documents
        </p>
      </div>

      {/* Current Tab Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current View:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {activeSection === 'all' && 'All Documents'}
              {activeSection === 'upload' && 'Upload Document'}
              {activeSection === 'types' && 'Document Types'}
              {activeSection === 'expiring' && 'Expiring Documents'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeSection === 'all' ? `${documents.length} total documents` : ''}
            {activeSection === 'types' ? '6 document types' : ''}
            {activeSection === 'expiring' ? `${documents.filter(d => d.expiryDate && new Date(d.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length} expiring soon` : ''}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <FolderIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Documents</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{documents.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {documents.filter(d => d.status === 'verified').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending BGV</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {bgvVendors.filter(v => v.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <UserIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Vendors</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {bgvVendors.filter(v => v.status === 'active').length}
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

const DocumentsPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading documents...</p>
        </div>
      </div>
    }>
      <DocumentsPageContent />
    </Suspense>
  );
};

export default DocumentsPage; 