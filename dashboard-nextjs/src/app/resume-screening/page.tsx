'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DocumentMagnifyingGlassIcon,
  CloudArrowUpIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
  PlusIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  score: number;
  status: string;
  skills: string[];
  experience: string;
  education: string;
  uploadDate: string;
}

const ResumeScreeningPageContent = () => {
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      position: 'Senior React Developer',
      score: 94,
      status: 'shortlisted',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      experience: '5 years',
      education: 'BS Computer Science',
      uploadDate: '2024-01-20T10:00:00Z'
    },
    {
      id: 2,
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      position: 'UX Designer',
      score: 87,
      status: 'reviewed',
      skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      experience: '3 years',
      education: 'BA Design',
      uploadDate: '2024-01-19T14:30:00Z'
    },
    {
      id: 3,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      position: 'Product Manager',
      score: 92,
      status: 'shortlisted',
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
      experience: '7 years',
      education: 'MBA',
      uploadDate: '2024-01-18T09:15:00Z'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      position: 'Marketing Specialist',
      score: 78,
      status: 'rejected',
      skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
      experience: '2 years',
      education: 'BA Marketing',
      uploadDate: '2024-01-17T16:45:00Z'
    },
    {
      id: 5,
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@email.com',
      position: 'DevOps Engineer',
      score: 89,
      status: 'reviewed',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      experience: '4 years',
      education: 'BS Computer Engineering',
      uploadDate: '2024-01-16T11:20:00Z'
    },
    {
      id: 6,
      name: 'Jessica Kim',
      email: 'jessica.kim@email.com',
      position: 'Data Analyst',
      score: 85,
      status: 'pending',
      skills: ['Python', 'SQL', 'Tableau', 'Statistics'],
      experience: '3 years',
      education: 'MS Data Science',
      uploadDate: '2024-01-15T13:10:00Z'
    }
  ]);

  // Get the active section from URL query parameter, default to 'upload_configure'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'upload_configure';

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'shortlisted': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'reviewed': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const handleStartScreening = () => {
    // Simulate screening process
    console.log('Starting AI screening process...');
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'upload_configure':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Upload & Configure
              </h2>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Drag and drop resume files here, or click to select files
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Choose Files
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Position
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>Senior React Developer</option>
                    <option>UX Designer</option>
                    <option>Product Manager</option>
                    <option>Marketing Specialist</option>
                    <option>DevOps Engineer</option>
                    <option>Data Analyst</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Screening Criteria
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <option>Standard</option>
                    <option>Strict</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'screening_process':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Screening Process
              </h2>
              <button
                onClick={handleStartScreening}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <DocumentMagnifyingGlassIcon className="h-4 w-4" />
                <span>Start Screening</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map(candidate => (
                <div key={candidate.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {candidate.position}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                      <span className="text-gray-900 dark:text-gray-100">{candidate.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Education:</span>
                      <span className="text-gray-900 dark:text-gray-100">{candidate.education}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Uploaded:</span>
                      <span className="text-gray-900 dark:text-gray-100">
                        {new Date(candidate.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'result_analysis':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Results & Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.filter(c => c.status === 'shortlisted').map(candidate => (
                <div key={candidate.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {candidate.position}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                      <span className="text-gray-900 dark:text-gray-100">{candidate.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Education:</span>
                      <span className="text-gray-900 dark:text-gray-100">{candidate.education}</span>
                    </div>
                  </div>
                </div>
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

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Resume Screening
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          AI-powered resume analysis and candidate screening
        </p>
      </div>

      {/* Current Tab Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current View:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {activeSection === 'upload_configure' && 'Upload & Configure'}
              {activeSection === 'screening_process' && 'Screening Process'}
              {activeSection === 'result_analysis' && 'Results & Analysis'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeSection === 'screening_process' ? `${candidates.length} candidates` : ''}
            {activeSection === 'result_analysis' ? `${candidates.filter(c => c.status === 'shortlisted').length} shortlisted` : ''}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <DocumentMagnifyingGlassIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Candidates</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{candidates.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Shortlisted</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {candidates.filter(c => c.status === 'shortlisted').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {candidates.filter(c => c.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <StarIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {Math.round(candidates.reduce((acc, c) => acc + c.score, 0) / candidates.length)}
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

const ResumeScreeningPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading resume screening...</p>
        </div>
      </div>
    }>
      <ResumeScreeningPageContent />
    </Suspense>
  );
};

export default ResumeScreeningPage; 