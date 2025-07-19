'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FolderIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  ShareIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserIcon,
  BuildingOfficeIcon,
  LinkIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  ArrowPathIcon,
  InformationCircleIcon,
  DocumentArrowUpIcon,
  BellIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  PhoneIcon,
  PaperClipIcon,
  TrashIcon,
  PencilIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

interface VerificationResults {
  education?: 'verified' | 'pending' | 'failed';
  employment?: 'verified' | 'pending' | 'failed';
  references?: 'verified' | 'pending' | 'failed';
  criminal?: 'clear' | 'pending' | 'failed';
}

interface Document {
  id: number;
  name: string;
  type: 'resume' | 'education' | 'employment' | 'portfolio' | 'certificate' | 'contract';
  size: string;
  uploadDate: string;
  status: 'uploaded' | 'pending_verification' | 'verified' | 'failed';
  bgvStatus?: 'not_started' | 'in_progress' | 'completed' | 'failed';
  bgvVendor?: string;
  bgvComments?: string;
  shareLink?: string;
  sharedWith?: string[];
  verificationResults?: VerificationResults;
  estimatedCompletion?: string;
}

interface Candidate {
  id: number;
  name: string;
  position: string;
  email: string;
  status: 'documents_pending' | 'bgv_in_progress' | 'bgv_completed';
  documents: Document[];
}

interface BGVVendor {
  id: number;
  name: string;
  type: string;
  contact: string;
  phone: string;
  integration: 'portal' | 'email' | 'manual';
  apiEnabled: boolean;
  status: 'active' | 'inactive';
  documentsProcessed: number;
  averageTime: string;
  specialties: string[];
}

// Helper functions defined before component
const getStatusColor = (status: string) => {
  switch (status) {
    case 'documents_pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'bgv_in_progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'bgv_completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getBGVStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'not_started':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'resume':
      return DocumentTextIcon;
    case 'education':
      return AcademicCapIcon;
    case 'employment':
      return BuildingOfficeIcon;
    case 'portfolio':
      return FolderIcon;
    default:
      return DocumentTextIcon;
  }
};

const DocumentsPage = () => {
  const searchParams = useSearchParams();
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBGVModal, setShowBGVModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [bgvMode, setBgvMode] = useState<'portal' | 'email' | 'manual'>('portal');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get the active section from URL query parameter, default to 'all'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'all';

  // Sample BGV vendors
  const bgvVendors: BGVVendor[] = [
    {
      id: 1,
      name: 'VerifyMax Solutions',
      type: 'Full Service',
      contact: 'support@verifymax.com',
      phone: '+1 (555) 123-4567',
      integration: 'portal',
      apiEnabled: true,
      status: 'active',
      documentsProcessed: 1250,
      averageTime: '3-5 days',
      specialties: ['Education', 'Employment', 'Criminal Background', 'Reference Check']
    },
    {
      id: 2,
      name: 'SecureCheck Pro',
      type: 'Education & Employment',
      contact: 'verify@securecheck.com',
      phone: '+1 (555) 987-6543',
      integration: 'email',
      apiEnabled: false,
      status: 'active',
      documentsProcessed: 850,
      averageTime: '2-4 days',
      specialties: ['Education Verification', 'Employment History', 'Professional Licenses']
    },
    {
      id: 3,
      name: 'GlobalVerify Inc',
      type: 'International',
      contact: 'hello@globalverify.com',
      phone: '+1 (555) 456-7890',
      integration: 'manual',
      apiEnabled: false,
      status: 'inactive',
      documentsProcessed: 420,
      averageTime: '5-7 days',
      specialties: ['International Background', 'Global Education', 'Criminal Records']
    }
  ];

  // Sample candidates with BGV documents
  const candidatesWithDocuments: Candidate[] = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Senior React Developer',
      email: 'john.smith@email.com',
      status: 'bgv_in_progress',
      documents: [
        {
          id: 1,
          name: 'Resume.pdf',
          type: 'resume',
          size: '2.4 MB',
          uploadDate: '2024-01-15T10:00:00Z',
          status: 'verified',
          bgvStatus: 'completed',
          bgvVendor: 'VerifyMax Solutions',
          bgvComments: 'All information verified successfully',
          shareLink: 'https://bgv.verifymax.com/docs/abc123',
          sharedWith: ['VerifyMax Solutions'],
          verificationResults: {
            education: 'verified',
            employment: 'verified',
            references: 'verified'
          }
        },
        {
          id: 2,
          name: 'Degree_Certificate.pdf',
          type: 'education',
          size: '1.8 MB',
          uploadDate: '2024-01-15T11:00:00Z',
          status: 'pending_verification',
          bgvStatus: 'in_progress',
          bgvVendor: 'VerifyMax Solutions',
          bgvComments: 'Verification in progress with university',
          shareLink: 'https://bgv.verifymax.com/docs/def456',
          sharedWith: ['VerifyMax Solutions'],
          estimatedCompletion: '2024-01-25'
        },
        {
          id: 3,
          name: 'Previous_Employment_Letter.pdf',
          type: 'employment',
          size: '1.2 MB',
          uploadDate: '2024-01-15T12:00:00Z',
          status: 'verified',
          bgvStatus: 'completed',
          bgvVendor: 'VerifyMax Solutions',
          bgvComments: 'Employment dates and role confirmed',
          shareLink: 'https://bgv.verifymax.com/docs/ghi789',
          sharedWith: ['VerifyMax Solutions']
        }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'UX Designer',
      email: 'sarah.j@email.com',
      status: 'documents_pending',
      documents: [
        {
          id: 4,
          name: 'Sarah_Resume.pdf',
          type: 'resume',
          size: '3.1 MB',
          uploadDate: '2024-01-12T14:00:00Z',
          status: 'uploaded',
          bgvStatus: 'not_started'
        },
        {
          id: 5,
          name: 'Portfolio_Samples.pdf',
          type: 'portfolio',
          size: '15.6 MB',
          uploadDate: '2024-01-12T14:30:00Z',
          status: 'uploaded',
          bgvStatus: 'not_started'
        }
      ]
    },
    {
      id: 3,
      name: 'Mike Davis',
      position: 'Data Scientist',
      email: 'mike.davis@email.com',
      status: 'bgv_completed',
      documents: [
        {
          id: 6,
          name: 'Mike_Resume_2024.pdf',
          type: 'resume',
          size: '2.8 MB',
          uploadDate: '2024-01-18T09:00:00Z',
          status: 'verified',
          bgvStatus: 'completed',
          bgvVendor: 'SecureCheck Pro',
          bgvComments: 'All verifications completed successfully',
          shareLink: 'mailto:verify@securecheck.com?subject=BGV Request',
          sharedWith: ['SecureCheck Pro'],
          verificationResults: {
            education: 'verified',
            employment: 'verified',
            references: 'verified',
            criminal: 'clear'
          }
        }
      ]
    }
  ];

  // Filter candidates based on search and status
  const filteredCandidates = candidatesWithDocuments.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'all':
        return (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Statuses</option>
                  <option value="documents_pending">Documents Pending</option>
                  <option value="bgv_in_progress">BGV In Progress</option>
                  <option value="bgv_completed">BGV Completed</option>
                </select>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredCandidates.length} candidate(s) found
                  </span>
                </div>
              </div>
            </div>

            {/* Candidates with Documents */}
            <div className="space-y-6">
              {filteredCandidates.map(candidate => (
                <div key={candidate.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {candidate.position} • {candidate.email}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                        {candidate.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {candidate.documents.map(document => (
                        <DocumentCard key={document.id} document={document} candidate={candidate} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Upload Documents
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Candidate
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option value="">Choose a candidate...</option>
                    {candidatesWithDocuments.map(candidate => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.position}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Document Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option value="">Select document type...</option>
                    <option value="resume">Resume</option>
                    <option value="education">Education Certificate</option>
                    <option value="employment">Employment Letter</option>
                    <option value="portfolio">Portfolio</option>
                    <option value="certificate">Professional Certificate</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Drag and drop files here, or click to select
                    </p>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Choose Files
                    </button>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Upload Document
                  </button>
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Resume', type: 'resume', icon: DocumentTextIcon, description: 'Candidate resumes and CVs' },
                  { name: 'Education', type: 'education', icon: AcademicCapIcon, description: 'Degree certificates and transcripts' },
                  { name: 'Employment', type: 'employment', icon: BuildingOfficeIcon, description: 'Employment verification letters' },
                  { name: 'Portfolio', type: 'portfolio', icon: FolderIcon, description: 'Work samples and portfolios' },
                  { name: 'Certificate', type: 'certificate', icon: DocumentCheckIcon, description: 'Professional certifications' },
                  { name: 'Contract', type: 'contract', icon: DocumentTextIcon, description: 'Employment contracts and agreements' }
                ].map((docType) => {
                  const Icon = docType.icon;
                  return (
                    <div key={docType.type} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{docType.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{docType.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'expiring':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Expiring Documents
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Employment Certificate</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expires in 5 days</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                    Renew
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="h-5 w-5 text-orange-600" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">Professional License</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expires in 12 days</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700">
                    Renew
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

  const DocumentCard = ({ document, candidate }: { document: Document; candidate: Candidate }) => {
    const Icon = getDocumentIcon(document.type);
    return (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                {document.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {document.size} • {new Date(document.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setSelectedDocument(document);
                setShowShareModal(true);
              }}
              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              title="Share Document"
            >
              <ShareIcon className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-green-600 dark:hover:text-green-400" title="View Document">
              <EyeIcon className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400" title="Download">
              <ArrowDownTrayIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Status:</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
              {document.status.replace('_', ' ')}
            </span>
          </div>
          
          {document.bgvStatus && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">BGV Status:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getBGVStatusColor(document.bgvStatus)}`}>
                {document.bgvStatus.replace('_', ' ')}
              </span>
            </div>
          )}
          
          {document.bgvVendor && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">BGV Vendor:</span>
              <span className="text-gray-900 dark:text-gray-100">{document.bgvVendor}</span>
            </div>
          )}
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
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {vendor.type}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              vendor.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            }`}>
              {vendor.status}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              vendor.apiEnabled ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            }`}>
              {vendor.integration} integration
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="Edit Vendor">
            <PencilIcon className="h-4 w-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400" title="Delete Vendor">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Contact:</span>
          <span className="text-gray-900 dark:text-gray-100">{vendor.contact}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Phone:</span>
          <span className="text-gray-900 dark:text-gray-100">{vendor.phone}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Documents Processed:</span>
          <span className="text-gray-900 dark:text-gray-100">{vendor.documentsProcessed}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Average Time:</span>
          <span className="text-gray-900 dark:text-gray-100">{vendor.averageTime}</span>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Specialties
          </h4>
          <div className="flex flex-wrap gap-1">
            {vendor.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ShareModal = ({ document, onClose }: { document: Document; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Share Document
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Document
            </label>
            <p className="text-sm text-gray-900 dark:text-gray-100">{document.name}</p>
          </div>
          {document.shareLink && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Share Link
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={document.shareLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Copy
                </button>
              </div>
            </div>
          )}
          {document.sharedWith && document.sharedWith.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Shared With
              </label>
              <div className="space-y-2">
                {document.sharedWith.map((recipient, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-sm text-gray-900 dark:text-gray-100">{recipient}</span>
                    <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Share
          </button>
          <button onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">
            Cancel
          </button>
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
          Manage candidate documents, background verification, and vendor integrations
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Documents</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {candidatesWithDocuments.reduce((acc, c) => acc + c.documents.length, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending BGV</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {candidatesWithDocuments.reduce((acc, c) => 
                  acc + c.documents.filter(d => d.bgvStatus === 'in_progress').length, 0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {candidatesWithDocuments.reduce((acc, c) => 
                  acc + c.documents.filter(d => d.bgvStatus === 'completed').length, 0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <BuildingOfficeIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Vendors</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {bgvVendors.filter(v => v.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
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
            {activeSection === 'all' ? `${filteredCandidates.length} candidates` : ''}
          </div>
        </div>
      </div>

      {/* Content based on active section */}
      {renderContent()}

      {/* BGV Vendors Section */}
      {activeSection === 'all' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              BGV Vendor Management
            </h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <span>Add Vendor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bgvVendors.map(vendor => (
              <BGVVendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showShareModal && selectedDocument && (
        <ShareModal 
          document={selectedDocument} 
          onClose={() => {
            setShowShareModal(false);
            setSelectedDocument(null);
          }}
        />
      )}
    </div>
  );
};

export default DocumentsPage; 