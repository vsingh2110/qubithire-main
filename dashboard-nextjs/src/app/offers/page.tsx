'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  UserIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ShareIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface Offer {
  id: number;
  candidateName: string;
  position: string;
  department: string;
  offerAmount: string;
  status: string;
  sentDate: string;
  expiryDate: string;
  expiryTime: string;
  responseDeadline: string;
  approvalFlow: {
    hr: string;
    manager: string;
    finance: string;
  };
  notes: Array<{
    id: number;
    text: string;
    type: string;
    timestamp: string;
    author: string;
  }>;
}

const OffersPageContent = () => {
  const searchParams = useSearchParams();
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 1,
      candidateName: 'John Smith',
      position: 'Senior React Developer',
      department: 'Engineering',
      offerAmount: '$85,000',
      status: 'sent',
      sentDate: '2024-01-20T10:00:00Z',
      expiryDate: '2024-01-27',
      expiryTime: '17:00',
      responseDeadline: '2024-01-27T17:00:00Z',
      approvalFlow: {
        hr: 'approved',
        manager: 'approved',
        finance: 'pending'
      },
      notes: [
        {
          id: 1,
          text: 'Candidate showed strong interest during interview',
          type: 'internal',
          timestamp: '2024-01-20T10:30:00Z',
          author: 'Sarah Johnson'
        }
      ]
    },
    {
      id: 2,
      candidateName: 'Emily Chen',
      position: 'UX Designer',
      department: 'Design',
      offerAmount: '$75,000',
      status: 'accepted',
      sentDate: '2024-01-18T14:00:00Z',
      expiryDate: '2024-01-25',
      expiryTime: '17:00',
      responseDeadline: '2024-01-25T17:00:00Z',
      approvalFlow: {
        hr: 'approved',
        manager: 'approved',
        finance: 'approved'
      },
      notes: [
        {
          id: 2,
          text: 'Offer accepted! Starting date: March 1st',
          type: 'internal',
          timestamp: '2024-01-19T09:15:00Z',
          author: 'Mike Davis'
        }
      ]
    },
    {
      id: 3,
      candidateName: 'David Wilson',
      position: 'Product Manager',
      department: 'Product',
      offerAmount: '$95,000',
      status: 'expiring',
      sentDate: '2024-01-15T11:00:00Z',
      expiryDate: '2024-01-22',
      expiryTime: '17:00',
      responseDeadline: '2024-01-22T17:00:00Z',
      approvalFlow: {
        hr: 'approved',
        manager: 'approved',
        finance: 'approved'
      },
      notes: [
        {
          id: 3,
          text: 'Candidate requested additional time to consider',
          type: 'internal',
          timestamp: '2024-01-20T16:45:00Z',
          author: 'Lisa Wang'
        }
      ]
    },
    {
      id: 4,
      candidateName: 'Sarah Johnson',
      position: 'Marketing Specialist',
      department: 'Marketing',
      offerAmount: '$65,000',
      status: 'declined',
      sentDate: '2024-01-12T09:00:00Z',
      expiryDate: '2024-01-19',
      expiryTime: '17:00',
      responseDeadline: '2024-01-19T17:00:00Z',
      approvalFlow: {
        hr: 'approved',
        manager: 'approved',
        finance: 'approved'
      },
      notes: [
        {
          id: 4,
          text: 'Candidate declined due to higher offer from another company',
          type: 'internal',
          timestamp: '2024-01-16T14:20:00Z',
          author: 'Tom Brown'
        }
      ]
    },
    {
      id: 5,
      candidateName: 'Michael Rodriguez',
      position: 'DevOps Engineer',
      department: 'Engineering',
      offerAmount: '$90,000',
      status: 'sent',
      sentDate: '2024-01-19T15:30:00Z',
      expiryDate: '2024-01-26',
      expiryTime: '17:00',
      responseDeadline: '2024-01-26T17:00:00Z',
      approvalFlow: {
        hr: 'approved',
        manager: 'pending',
        finance: 'pending'
      },
      notes: []
    }
  ]);

  // Get the active section from URL query parameter, default to 'active'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'active';

  // Helper functions
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'sent': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'accepted': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'declined': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'expiring': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'expired': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      'sent': EnvelopeIcon,
      'accepted': CheckCircleIcon,
      'declined': XCircleIcon,
      'expiring': ExclamationTriangleIcon,
      'expired': ClockIcon
    };
    return icons[status] || EnvelopeIcon;
  };

  const getTimeUntilExpiry = (expiryDate: string, expiryTime: string) => {
    const expiry = new Date(`${expiryDate}T${expiryTime}:00`);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Less than 1h';
  };

  const isOfferExpiringSoon = (expiryDate: string, expiryTime: string) => {
    const expiry = new Date(`${expiryDate}T${expiryTime}:00`);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    const hours = diff / (1000 * 60 * 60);
    return hours > 0 && hours <= 24; // Expiring within 24 hours
  };

  const getApprovalStatus = (approvalFlow: Offer['approvalFlow']) => {
    const statuses = Object.values(approvalFlow);
    if (statuses.every(status => status === 'approved')) return 'approved';
    if (statuses.some(status => status === 'rejected')) return 'rejected';
    return 'pending';
  };

  const extendOffer = (offerId: number, newExpiryDate: string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, expiryDate: newExpiryDate }
        : offer
    ));
  };

  const addNote = (offerId: number, noteText: string, noteType: string = 'internal') => {
    const newNote = {
      id: Date.now(),
      text: noteText,
      type: noteType,
      timestamp: new Date().toISOString(),
      author: 'Current User'
    };
    
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, notes: [...offer.notes, newNote] }
        : offer
    ));
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'active':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Active Offers
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <PlusIcon className="h-4 w-4" />
                <span>New Offer</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.filter(offer => offer.status === 'sent').map(offer => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        );

      case 'expiring':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Expiring Soon
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.filter(offer => isOfferExpiringSoon(offer.expiryDate, offer.expiryTime)).map(offer => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        );

      case 'completed':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Completed Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.filter(offer => ['accepted', 'declined'].includes(offer.status)).map(offer => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        );

      case 'all':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              All Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map(offer => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        );

      case 'create':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Create New Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Candidate Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter candidate name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter position"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Offer Amount
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter offer amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Create Offer
                </button>
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

  const OfferCard = ({ offer }: { offer: Offer }) => {
    const StatusIcon = getStatusIcon(offer.status);
    const timeUntilExpiry = getTimeUntilExpiry(offer.expiryDate, offer.expiryTime);
    const isExpiringSoon = isOfferExpiringSoon(offer.expiryDate, offer.expiryTime);
    const approvalStatus = getApprovalStatus(offer.approvalFlow);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {offer.candidateName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {offer.position} • {offer.department}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(offer.status)}`}>
                {offer.status}
              </span>
              {isExpiringSoon && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  Expiring Soon
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusIcon className="h-5 w-5 text-gray-400" />
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {offer.offerAmount}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Sent:</span>
            <span className="text-gray-900 dark:text-gray-100">
              {new Date(offer.sentDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Expires:</span>
            <span className={`text-gray-900 dark:text-gray-100 ${isExpiringSoon ? 'text-orange-600 dark:text-orange-400 font-medium' : ''}`}>
              {offer.expiryDate} at {offer.expiryTime} ({timeUntilExpiry})
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Approval:</span>
            <span className={`text-sm font-medium ${
              approvalStatus === 'approved' ? 'text-green-600 dark:text-green-400' :
              approvalStatus === 'rejected' ? 'text-red-600 dark:text-red-400' :
              'text-yellow-600 dark:text-yellow-400'
            }`}>
              {approvalStatus}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Notes:</span>
            <span className="text-gray-900 dark:text-gray-100">
              {offer.notes.length} note{offer.notes.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Offer Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track and manage candidate offers and responses
        </p>
      </div>

      {/* Current Tab Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current View:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {activeSection === 'active' && 'Active Offers'}
              {activeSection === 'expiring' && 'Expiring Soon'}
              {activeSection === 'completed' && 'Completed Offers'}
              {activeSection === 'all' && 'All Offers'}
              {activeSection === 'create' && 'Create New Offer'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeSection === 'active' ? `${offers.filter(o => o.status === 'sent').length} active offers` : ''}
            {activeSection === 'expiring' ? `${offers.filter(o => isOfferExpiringSoon(o.expiryDate, o.expiryTime)).length} expiring soon` : ''}
            {activeSection === 'completed' ? `${offers.filter(o => ['accepted', 'declined'].includes(o.status)).length} completed` : ''}
            {activeSection === 'all' ? `${offers.length} total offers` : ''}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Offers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{offers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <EnvelopeIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Offers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {offers.filter(o => o.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
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
            <ExclamationTriangleIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Expiring Soon</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {offers.filter(o => isOfferExpiringSoon(o.expiryDate, o.expiryTime)).length}
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

const OffersPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading offers...</p>
        </div>
      </div>
    }>
      <OffersPageContent />
    </Suspense>
  );
};

export default OffersPage; 