'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
  PencilIcon,
  EyeIcon,
  PrinterIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  ArrowPathIcon,
  BellIcon,
  DocumentArrowUpIcon,
  HandRaisedIcon,
  ShieldCheckIcon,
  CogIcon,
  InformationCircleIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

interface Note {
  id: number;
  text: string;
  author: string;
  date: string;
  type: 'internal' | 'negotiation' | 'response' | 'update' | 'system';
}

interface ApprovalStep {
  id: number;
  name: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  required: boolean;
  date?: string;
}

interface ApprovalFlow {
  currentStep: number;
  steps: ApprovalStep[];
}

interface CandidateResponse {
  id: number;
  type: 'accepted' | 'declined' | 'negotiation';
  message: string;
  date: string;
  conditions: string[];
}

interface Offer {
  id: number;
  candidate: string;
  position: string;
  department: string;
  salary: string;
  equity: string;
  startDate: string;
  offerDate: string;
  expiryDate: string;
  expiryTime: string;
  status: 'pending_approval' | 'approved' | 'sent' | 'accepted' | 'declined' | 'expired' | 'negotiating';
  autoExpire: boolean;
  benefits: string[];
  bonusAmount: string;
  workLocation: string;
  notes: Note[];
  approvalFlow: ApprovalFlow;
  candidateResponses: CandidateResponse[];
  remindersSent: number;
  maxReminders: number;
  expirationActions: string[];
}

// Helper functions defined before component
const isOfferExpiringSoon = (expiryDate: string, expiryTime: string) => {
  const now = new Date();
  const expiry = new Date(`${expiryDate}T${expiryTime}`);
  const diff = expiry.getTime() - now.getTime();
  const hoursUntilExpiry = diff / (1000 * 60 * 60);
  
  return hoursUntilExpiry <= 24 && hoursUntilExpiry > 0;
};

const getTimeUntilExpiry = (expiryDate: string, expiryTime: string) => {
  const now = new Date();
  const expiry = new Date(`${expiryDate}T${expiryTime}`);
  const diff = expiry.getTime() - now.getTime();
  
  if (diff <= 0) return 'Expired';
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending_approval':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'approved':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'sent':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'accepted':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'declined':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'expired':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    case 'negotiating':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending_approval':
      return HandRaisedIcon;
    case 'approved':
      return ShieldCheckIcon;
    case 'sent':
      return EnvelopeIcon;
    case 'accepted':
      return CheckCircleIcon;
    case 'declined':
      return XCircleIcon;
    case 'expired':
      return ClockIcon;
    case 'negotiating':
      return ChatBubbleLeftIcon;
    default:
      return DocumentTextIcon;
  }
};

const getApprovalStatus = (approvalFlow: ApprovalFlow) => {
  const totalSteps = approvalFlow.steps.length;
  const completedSteps = approvalFlow.steps.filter(step => step.status === 'approved').length;
  
  if (completedSteps === 0) return 'Not Started';
  if (completedSteps === totalSteps) return 'Completed';
  return `${completedSteps}/${totalSteps} Approved`;
};

const OffersPage = () => {
  const searchParams = useSearchParams();
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [expirationWarnings, setExpirationWarnings] = useState(true);

  // Get the active section from URL query parameter, default to 'active'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'active';

  // Handle URL parameters
  useEffect(() => {
    const actionParam = searchParams.get('action');

    if (actionParam === 'create') {
      setShowOfferForm(true);
    }
  }, [searchParams]);

  // Enhanced offer data structure
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      candidate: 'John Smith',
      position: 'Senior React Developer',
      department: 'Engineering',
      salary: '$120,000',
      equity: '0.25%',
      startDate: '2024-02-01',
      offerDate: '2024-01-15',
      expiryDate: '2024-01-25',
      expiryTime: '17:00',
      status: 'pending_approval',
      autoExpire: true,
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k', 'PTO'],
      bonusAmount: '$10,000',
      workLocation: 'Remote',
      notes: [
        {
          id: 1,
          text: 'Negotiated remote work arrangement',
          author: 'Sarah Wilson',
          date: '2024-01-15T09:00:00Z',
          type: 'internal'
        },
        {
          id: 2,
          text: 'Candidate requested higher salary',
          author: 'Mike Johnson',
          date: '2024-01-15T11:30:00Z',
          type: 'negotiation'
        }
      ],
      approvalFlow: {
        currentStep: 0,
        steps: [
          { id: 1, name: 'Hiring Manager', approver: 'Sarah Wilson', status: 'pending', required: true },
          { id: 2, name: 'Finance Team', approver: 'David Kim', status: 'pending', required: true },
          { id: 3, name: 'Department Head', approver: 'Jennifer Lee', status: 'pending', required: true }
        ]
      },
      candidateResponses: [],
      remindersSent: 0,
      maxReminders: 3,
      expirationActions: ['withdraw', 'extend', 'escalate']
    },
    {
      id: 2,
      candidate: 'Sarah Johnson',
      position: 'UX Designer',
      department: 'Design',
      salary: '$95,000',
      equity: '0.15%',
      startDate: '2024-01-29',
      offerDate: '2024-01-12',
      expiryDate: '2024-01-22',
      expiryTime: '17:00',
      status: 'accepted',
      autoExpire: true,
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k', 'PTO'],
      bonusAmount: '$5,000',
      workLocation: 'Hybrid',
      notes: [
        {
          id: 1,
          text: 'Accepted with minor salary adjustment',
          author: 'Lisa Park',
          date: '2024-01-20T14:00:00Z',
          type: 'response'
        }
      ],
      approvalFlow: {
        currentStep: 3,
        steps: [
          { id: 1, name: 'Hiring Manager', approver: 'Lisa Park', status: 'approved', required: true, date: '2024-01-12T10:00:00Z' },
          { id: 2, name: 'Finance Team', approver: 'David Kim', status: 'approved', required: true, date: '2024-01-12T14:00:00Z' },
          { id: 3, name: 'Department Head', approver: 'Jennifer Lee', status: 'approved', required: true, date: '2024-01-12T16:00:00Z' }
        ]
      },
      candidateResponses: [
        {
          id: 1,
          type: 'accepted',
          message: 'I am excited to join the team!',
          date: '2024-01-20T14:00:00Z',
          conditions: ['salary_adjustment']
        }
      ],
      remindersSent: 1,
      maxReminders: 3,
      expirationActions: ['withdraw']
    },
    {
      id: 3,
      candidate: 'Mike Davis',
      position: 'Data Scientist',
      department: 'Analytics',
      salary: '$110,000',
      equity: '0.20%',
      startDate: '2024-02-15',
      offerDate: '2024-01-18',
      expiryDate: '2024-01-28',
      expiryTime: '17:00',
      status: 'sent',
      autoExpire: true,
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k', 'PTO'],
      bonusAmount: '$8,000',
      workLocation: 'On-site',
      notes: [
        {
          id: 1,
          text: 'Requested higher salary and flexible hours',
          author: 'Tom Wilson',
          date: '2024-01-22T10:00:00Z',
          type: 'negotiation'
        },
        {
          id: 2,
          text: 'Considering counter offer - will respond by Friday',
          author: 'HR Team',
          date: '2024-01-24T15:30:00Z',
          type: 'update'
        }
      ],
      approvalFlow: {
        currentStep: 3,
        steps: [
          { id: 1, name: 'Hiring Manager', approver: 'Tom Wilson', status: 'approved', required: true, date: '2024-01-18T09:00:00Z' },
          { id: 2, name: 'Finance Team', approver: 'David Kim', status: 'approved', required: true, date: '2024-01-18T11:00:00Z' },
          { id: 3, name: 'Department Head', approver: 'Jennifer Lee', status: 'approved', required: true, date: '2024-01-18T13:00:00Z' }
        ]
      },
      candidateResponses: [
        {
          id: 1,
          type: 'negotiation',
          message: 'Thank you for the offer. I would like to discuss the salary and work flexibility.',
          date: '2024-01-22T10:00:00Z',
          conditions: ['salary_increase', 'flexible_hours']
        }
      ],
      remindersSent: 2,
      maxReminders: 3,
      expirationActions: ['extend', 'withdraw']
    },
    {
      id: 4,
      candidate: 'Emily Chen',
      position: 'Product Manager',
      department: 'Product',
      salary: '$130,000',
      equity: '0.30%',
      startDate: '2024-01-20',
      offerDate: '2024-01-05',
      expiryDate: '2024-01-15',
      expiryTime: '17:00',
      status: 'expired',
      autoExpire: true,
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k', 'PTO'],
      bonusAmount: '$12,000',
      workLocation: 'On-site',
      notes: [
        {
          id: 1,
          text: 'Declined due to relocation requirements',
          author: 'HR Team',
          date: '2024-01-14T16:00:00Z',
          type: 'response'
        },
        {
          id: 2,
          text: 'Offer expired - candidate did not respond in time',
          author: 'System',
          date: '2024-01-15T17:00:00Z',
          type: 'system'
        }
      ],
      approvalFlow: {
        currentStep: 3,
        steps: [
          { id: 1, name: 'Hiring Manager', approver: 'Mike Johnson', status: 'approved', required: true, date: '2024-01-05T10:00:00Z' },
          { id: 2, name: 'Finance Team', approver: 'David Kim', status: 'approved', required: true, date: '2024-01-05T14:00:00Z' },
          { id: 3, name: 'Department Head', approver: 'Jennifer Lee', status: 'approved', required: true, date: '2024-01-05T16:00:00Z' }
        ]
      },
      candidateResponses: [],
      remindersSent: 3,
      maxReminders: 3,
      expirationActions: ['withdraw']
    }
  ]);

  // Auto-expire offers
  useEffect(() => {
    const checkExpiration = () => {
      const now = new Date();
      setOffers(prevOffers => 
        prevOffers.map(offer => {
          const expiryDateTime = new Date(`${offer.expiryDate}T${offer.expiryTime}`);
          
          if (offer.autoExpire && 
              now > expiryDateTime && 
              !['expired', 'accepted', 'declined'].includes(offer.status)) {
            
            // Add system note about expiration
            const expiredOffer = {
              ...offer,
              status: 'expired',
              notes: [
                ...offer.notes,
                {
                  id: Date.now(),
                  text: 'Offer automatically expired',
                  author: 'System',
                  date: now.toISOString(),
                  type: 'system'
                }
              ]
            };
            return expiredOffer;
          }
          return offer;
        })
      );
    };

    // Check every minute
    const interval = setInterval(checkExpiration, 60000);
    checkExpiration(); // Initial check

    return () => clearInterval(interval);
  }, []);

  // Filter offers based on active tab
  const filteredOffers = offers.filter(offer => {
    switch (activeSection) {
      case 'active':
        return ['pending_approval', 'approved', 'sent', 'pending', 'negotiating'].includes(offer.status);
      case 'expiring':
        return isOfferExpiringSoon(offer.expiryDate, offer.expiryTime) && 
               !['accepted', 'declined', 'expired'].includes(offer.status);
      case 'completed':
        return ['accepted', 'declined', 'expired'].includes(offer.status);
      case 'all':
        return true;
      default:
        return true;
    }
  });

  const extendOffer = (offerId: number, newExpiryDate: string) => {
    setOffers(prevOffers => 
      prevOffers.map(offer => 
        offer.id === offerId 
          ? { ...offer, expiryDate: newExpiryDate }
          : offer
      )
    );
  };

  const addNote = (offerId: number, noteText: string, noteType: Note['type'] = 'internal') => {
    setOffers(prevOffers => 
      prevOffers.map(offer => 
        offer.id === offerId 
          ? {
              ...offer,
              notes: [
                ...offer.notes,
                {
                  id: Date.now(),
                  text: noteText,
                  author: 'Current User',
                  date: new Date().toISOString(),
                  type: noteType
                }
              ]
            }
          : offer
      )
    );
  };

  const OfferCard = ({ offer }: { offer: Offer }) => {
    const StatusIcon = getStatusIcon(offer.status);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {offer.candidate}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {offer.position} • {offer.department}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(offer.status)}`}>
              {offer.status.replace('_', ' ').toUpperCase()}
            </span>
            <StatusIcon className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Salary</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{offer.salary}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Equity</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{offer.equity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {new Date(offer.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Expires</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {new Date(offer.expiryDate).toLocaleDateString()} at {offer.expiryTime}
            </p>
          </div>
        </div>

        {isOfferExpiringSoon(offer.expiryDate, offer.expiryTime) && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-red-700 dark:text-red-300">
                Expires in {getTimeUntilExpiry(offer.expiryDate, offer.expiryTime)}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Approval: {getApprovalStatus(offer.approvalFlow)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {offer.notes.length} notes
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedOffer(offer);
              setShowNotesModal(true);
            }}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View Notes
          </button>
          <button
            onClick={() => {
              setSelectedOffer(offer);
              setShowApprovalModal(true);
            }}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Approval
          </button>
          <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Actions
          </button>
        </div>
      </div>
    );
  };

  const NotesModal = ({ offer, onClose }: { offer: Offer; onClose: () => void }) => {
    const [newNote, setNewNote] = useState('');
    const [noteType, setNoteType] = useState<Note['type']>('internal');

    const handleAddNote = () => {
      if (newNote.trim()) {
        addNote(offer.id, newNote, noteType);
        setNewNote('');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Notes - {offer.candidate}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4 mb-6">
              {offer.notes.map((note) => (
                <div key={note.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {note.author}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(note.date).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{note.text}</p>
                  <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                    note.type === 'internal' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    note.type === 'negotiation' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    note.type === 'response' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {note.type}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex space-x-2 mb-4">
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value as Note['type'])}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="internal">Internal</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="response">Response</option>
                  <option value="update">Update</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ApprovalModal = ({ offer, onClose }: { offer: Offer; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Approval Flow - {offer.candidate}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {offer.approvalFlow.steps.map((step) => (
                <div key={step.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {step.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.approver}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        step.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        step.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {step.status.toUpperCase()}
                      </span>
                      {step.required && (
                        <span className="text-xs text-red-600 dark:text-red-400">Required</span>
                      )}
                    </div>
                  </div>
                  {step.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {new Date(step.date).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Offer Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage job offers, track approvals, and monitor candidate responses.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setExpirationWarnings(!expirationWarnings)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              expirationWarnings
                ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <BellIcon className="h-4 w-4" />
            <span>Warnings</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Offers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{offers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <HandRaisedIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Approval</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {offers.filter(o => o.status === 'pending_approval').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {offers.filter(o => o.status === 'accepted').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Expiring Soon</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {offers.filter(o => isOfferExpiringSoon(o.expiryDate, o.expiryTime)).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Expired</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {offers.filter(o => o.status === 'expired').length}
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
              {activeSection === 'active' && 'Active Offers'}
              {activeSection === 'expiring' && 'Expiring Soon'}
              {activeSection === 'completed' && 'Completed'}
              {activeSection === 'all' && 'All Offers'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {filteredOffers.length} offers
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOffers.map(offer => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {/* Modals */}
      {showNotesModal && selectedOffer && (
        <NotesModal 
          offer={selectedOffer} 
          onClose={() => {
            setShowNotesModal(false);
            setSelectedOffer(null);
          }}
        />
      )}
      
      {showApprovalModal && selectedOffer && (
        <ApprovalModal 
          offer={selectedOffer} 
          onClose={() => {
            setShowApprovalModal(false);
            setSelectedOffer(null);
          }}
        />
      )}

      {/* Offer Form Modal */}
      {showOfferForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Create New Offer
                </h2>
                <button
                  onClick={() => setShowOfferForm(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Candidate
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Select candidate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Position
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Job position"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Base Salary
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="$120,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Equity
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="0.25%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Offer Expiry Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Expiry Time
                    </label>
                    <input
                      type="time"
                      defaultValue="17:00"
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Auto-Expire
                    </label>
                    <div className="mt-1 flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Automatically expire offer at deadline
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Approval Workflow
                  </label>
                  <div className="mt-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Hiring Manager Approval</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Finance Team Approval</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Department Head Approval</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowOfferForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Create Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersPage; 