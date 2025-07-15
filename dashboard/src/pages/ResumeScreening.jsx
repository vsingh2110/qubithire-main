import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DocumentTextIcon,
  CloudArrowUpIcon,
  ChartBarIcon,
  UserIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const ResumeScreening = () => {
  const [searchParams] = useSearchParams();
  const [isScreening, setIsScreening] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');

  // Get the active section from URL query parameter, default to 'upload_configure'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'upload_configure';

  const jobs = [
    { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Remote' },
    { id: 2, title: 'Data Scientist', department: 'Analytics', location: 'San Francisco' },
    { id: 3, title: 'UX Designer', department: 'Design', location: 'New York' },
    { id: 4, title: 'Product Manager', department: 'Product', location: 'Seattle' }
  ];

  const screeningResults = [
    {
      id: 1,
      candidate: 'John Smith',
      email: 'john.smith@email.com',
      score: 94,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      experience: '5 years',
      status: 'recommended',
      matchReasons: ['Strong React experience', 'Leadership skills', 'Cloud expertise']
    },
    {
      id: 2,
      candidate: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      score: 87,
      skills: ['React', 'JavaScript', 'CSS', 'GraphQL'],
      experience: '3 years',
      status: 'recommended',
      matchReasons: ['Solid frontend skills', 'Good communication', 'Portfolio quality']
    },
    {
      id: 3,
      candidate: 'Mike Davis',
      email: 'mike.davis@email.com',
      score: 72,
      skills: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
      experience: '2 years',
      status: 'review',
      matchReasons: ['Basic skills match', 'Needs React training', 'Junior level']
    },
    {
      id: 4,
      candidate: 'Jane Doe',
      email: 'jane.doe@email.com',
      score: 45,
      skills: ['PHP', 'MySQL', 'WordPress'],
      experience: '1 year',
      status: 'rejected',
      matchReasons: ['Skills mismatch', 'Limited experience', 'Different tech stack']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'recommended':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleStartScreening = () => {
    setIsScreening(true);
    // Simulate screening process
    setTimeout(() => {
      setIsScreening(false);
    }, 3000);
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'upload_configure':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Select Job Position
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedJob === job.id.toString()
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedJob(job.id.toString())}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {job.department} • {job.location}
                          </p>
                        </div>
                        <input
                          type="radio"
                          name="job"
                          value={job.id}
                          checked={selectedJob === job.id.toString()}
                          onChange={() => setSelectedJob(job.id.toString())}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Upload Resumes
                </h2>
              </div>
              <div className="p-6">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Drop files here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    PDF, DOC, DOCX up to 10MB each
                  </p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Choose Files
                  </button>
                </div>
                
                {/* Email Integration */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Email Integration
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Automatically fetch resumes from your HR email
                  </p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                    Sync from Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'screening_process':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                AI Screening Process
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center">
                {!isScreening ? (
                  <div className="space-y-4">
                    <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <PlayIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Ready to Screen Resumes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our AI will analyze resumes against job requirements and provide detailed scoring
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span>24 resumes uploaded</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span>Job requirements loaded</span>
                      </div>
                    </div>
                    <button
                      onClick={handleStartScreening}
                      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Start AI Screening
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <ArrowPathIcon className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-spin" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      Screening in Progress
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      AI is analyzing resumes and matching skills...
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Processing 18 of 24 resumes...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'result_analysis':
        return (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <UserIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Screened</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">24</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Recommended</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">6</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <EyeIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">For Review</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">8</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <XCircleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">10</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Screening Results
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Skills
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {screeningResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {result.candidate}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {result.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                              {result.score}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {result.skills.slice(0, 3).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                            {result.skills.length > 3 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{result.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 mr-3">
                            View Details
                          </button>
                          <button className="text-green-600 hover:text-green-700 dark:text-green-400">
                            Schedule Interview
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Resume Screening
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          AI-powered resume analysis and candidate ranking
        </p>
      </div>

      {/* Content based on active section */}
      {renderContent()}
    </div>
  );
};

export default ResumeScreening; 