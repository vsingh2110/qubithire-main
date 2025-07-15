import React, { useState, useEffect } from 'react';
import {
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CalendarIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  BeakerIcon,
  ChevronUpIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const CandidateManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedJD, setSelectedJD] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');

  // Sample Job Descriptions
  const jobDescriptions = [
    {
      id: 'jd1',
      title: 'Senior React Developer',
      department: 'Engineering',
      requiredSkills: ['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'],
      preferredSkills: ['Redux', 'Jest', 'Docker', 'MongoDB'],
      experience: '3-5 years',
      location: 'San Francisco, CA',
      description: 'We are looking for a Senior React Developer to join our engineering team...'
    },
    {
      id: 'jd2', 
      title: 'UX Designer',
      department: 'Design',
      requiredSkills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
      preferredSkills: ['Prototyping', 'Usability Testing', 'Design Systems'],
      experience: '2-4 years',
      location: 'New York, NY',
      description: 'Seeking a talented UX Designer to create intuitive user experiences...'
    },
    {
      id: 'jd3',
      title: 'Data Scientist',
      department: 'Analytics',
      requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
      preferredSkills: ['R', 'TensorFlow', 'Big Data', 'Visualization'],
      experience: '3-6 years',
      location: 'Austin, TX',
      description: 'Join our analytics team as a Data Scientist to drive insights...'
    }
  ];

  const candidates = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      position: 'Senior React Developer',
      department: 'Engineering',
      experience: '5 years',
      education: 'MS Computer Science',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL', 'Redux', 'Jest'],
      status: 'interview-scheduled',
      score: 94,
      appliedDate: '2024-01-15',
      stage: 'Technical Interview',
      notes: 'Strong candidate with excellent React skills. Team lead experience.',
      avatar: '/api/placeholder/40/40',
      resume: 'john_smith_resume.pdf',
      interviewDate: '2024-01-20T10:00:00Z',
      appliedJD: 'jd1',
      jdMatchScore: 92,
      skillsMatch: {
        required: ['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'],
        preferred: ['Redux', 'Jest'],
        missing: [],
        additional: []
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      position: 'UX Designer',
      department: 'Design',
      experience: '3 years',
      education: 'BFA Design',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      status: 'offer-sent',
      score: 89,
      appliedDate: '2024-01-12',
      stage: 'Offer Review',
      notes: 'Excellent portfolio. Great cultural fit.',
      avatar: '/api/placeholder/40/40',
      resume: 'sarah_johnson_resume.pdf',
      offerDate: '2024-01-18T14:00:00Z',
      appliedJD: 'jd2',
      jdMatchScore: 88,
      skillsMatch: {
        required: ['Figma', 'Sketch', 'Adobe XD', 'User Research'],
        preferred: ['Prototyping', 'Design Systems'],
        missing: [],
        additional: []
      }
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      position: 'Data Scientist',
      department: 'Analytics',
      experience: '4 years',
      education: 'PhD Data Science',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow', 'Statistics'],
      status: 'screening',
      score: 92,
      appliedDate: '2024-01-18',
      stage: 'Resume Review',
      notes: 'Strong technical background. PhD in relevant field.',
      avatar: '/api/placeholder/40/40',
      resume: 'mike_davis_resume.pdf',
      appliedJD: 'jd3',
      jdMatchScore: 90,
      skillsMatch: {
        required: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
        preferred: ['R', 'TensorFlow'],
        missing: [],
        additional: []
      }
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@email.com',
      phone: '+1 (555) 321-0987',
      location: 'Seattle, WA',
      position: 'Product Manager',
      department: 'Product',
      experience: '6 years',
      education: 'MBA',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'Roadmapping'],
      status: 'rejected',
      score: 67,
      appliedDate: '2024-01-10',
      stage: 'Application Review',
      notes: 'Good experience but not a fit for our specific needs.',
      avatar: '/api/placeholder/40/40',
      resume: 'emily_chen_resume.pdf',
      appliedJD: 'jd1',
      jdMatchScore: 45,
      skillsMatch: {
        required: ['User Research'],
        preferred: [],
        missing: ['React', 'Node.js', 'TypeScript', 'AWS', 'GraphQL'],
        additional: ['Product Strategy', 'Agile', 'Analytics', 'Roadmapping']
      }
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Candidates' },
    { value: 'screening', label: 'Screening' },
    { value: 'interview-scheduled', label: 'Interview Scheduled' },
    { value: 'offer-sent', label: 'Offer Sent' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const experienceOptions = [
    { value: 'all', label: 'All Experience' },
    { value: '0-2', label: '0-2 years' },
    { value: '2-5', label: '2-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const scoreOptions = [
    { value: 'all', label: 'All Scores' },
    { value: '90+', label: '90+ (Excellent)' },
    { value: '80-89', label: '80-89 (Good)' },
    { value: '70-79', label: '70-79 (Average)' },
    { value: '60-69', label: '60-69 (Below Average)' }
  ];

  const sortOptions = [
    { value: 'score', label: 'AI Score' },
    { value: 'jdMatchScore', label: 'JD Match Score' },
    { value: 'appliedDate', label: 'Applied Date' },
    { value: 'name', label: 'Name' },
    { value: 'experience', label: 'Experience' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'screening':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'interview-scheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'offer-sent':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'hired':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getMatchScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const parseExperience = (exp) => {
    const num = parseInt(exp.replace(/\D/g, ''));
    return num || 0;
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || candidate.status === selectedStatus;
    const matchesJD = selectedJD === 'all' || candidate.appliedJD === selectedJD;
    
    const matchesSkills = skillsFilter.length === 0 || 
                         skillsFilter.every(skill => 
                           candidate.skills.some(candidateSkill => 
                             candidateSkill.toLowerCase().includes(skill.toLowerCase())
                           )
                         );
    
    const candidateExpYears = parseExperience(candidate.experience);
    const matchesExperience = experienceFilter === 'all' || 
                             (experienceFilter === '0-2' && candidateExpYears <= 2) ||
                             (experienceFilter === '2-5' && candidateExpYears > 2 && candidateExpYears <= 5) ||
                             (experienceFilter === '5-10' && candidateExpYears > 5 && candidateExpYears <= 10) ||
                             (experienceFilter === '10+' && candidateExpYears > 10);
    
    const matchesScore = scoreFilter === 'all' ||
                        (scoreFilter === '90+' && candidate.score >= 90) ||
                        (scoreFilter === '80-89' && candidate.score >= 80 && candidate.score < 90) ||
                        (scoreFilter === '70-79' && candidate.score >= 70 && candidate.score < 80) ||
                        (scoreFilter === '60-69' && candidate.score >= 60 && candidate.score < 70);
    
    return matchesSearch && matchesStatus && matchesJD && matchesSkills && matchesExperience && matchesScore;
  }).sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'experience') {
      aValue = parseExperience(a.experience);
      bValue = parseExperience(b.experience);
    } else if (sortBy === 'appliedDate') {
      aValue = new Date(a.appliedDate);
      bValue = new Date(b.appliedDate);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const allSkills = [...new Set(candidates.flatMap(c => c.skills))];

  const CandidateCard = ({ candidate }) => {
    const jd = jobDescriptions.find(j => j.id === candidate.appliedJD);
    
    return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-medium text-lg">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {candidate.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {candidate.position} • {candidate.department}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <EnvelopeIcon className="h-4 w-4" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPinIcon className="h-4 w-4" />
                <span>{candidate.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className={`text-sm font-medium ${getScoreColor(candidate.score)}`}>
              {candidate.score}
            </span>
          </div>
            <div className="flex items-center space-x-2 mt-1">
              <TrophyIcon className="h-4 w-4 text-purple-400" />
              <span className={`text-sm font-medium ${getMatchScoreColor(candidate.jdMatchScore)}`}>
                {candidate.jdMatchScore}% JD Match
              </span>
            </div>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-2 ${getStatusColor(candidate.status)}`}>
            {candidate.stage}
          </span>
        </div>
      </div>
        
        {/* JD Match Information */}
        {jd && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Applied for: {jd.title}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  {candidate.skillsMatch.required.length} required skills matched
                </p>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${getMatchScoreColor(candidate.jdMatchScore)}`}>
                  {candidate.jdMatchScore}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Match Score
                </div>
              </div>
            </div>
          </div>
        )}
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-1">
            {candidate.skills.slice(0, 5).map((skill, index) => {
              const isRequired = jd?.requiredSkills?.includes(skill);
              const isPreferred = jd?.preferredSkills?.includes(skill);
              
              let skillClass = 'px-2 py-1 text-xs rounded';
              if (isRequired) {
                skillClass += ' bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300';
              } else if (isPreferred) {
                skillClass += ' bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-300';
              } else {
                skillClass += ' bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
              }
              
              return (
                <span key={index} className={skillClass}>
              {skill}
                  {isRequired && <span className="ml-1 text-green-600">✓</span>}
                  {isPreferred && <span className="ml-1 text-blue-600">+</span>}
            </span>
              );
            })}
          {candidate.skills.length > 5 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{candidate.skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedCandidate(candidate)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
            <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              Actions
            </button>
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
            Candidate Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage candidates with JD-based filtering and AI matching
          </p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4" />
            <span>Advanced Filters</span>
          </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Add Candidate
        </button>
        </div>
      </div>

      {/* Basic Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            value={selectedJD}
            onChange={(e) => setSelectedJD(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Job Descriptions</option>
            {jobDescriptions.map(jd => (
              <option key={jd.id} value={jd.id}>{jd.title}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredCandidates.length} candidate(s) found
            </span>
            </div>
            <div className="flex items-center space-x-2">
                              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Advanced Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience Level
              </label>
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {experienceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Score Range
              </label>
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {scoreOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills Filter
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Add skills to filter..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      setSkillsFilter([...skillsFilter, e.target.value]);
                      e.target.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              {skillsFilter.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {skillsFilter.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full flex items-center space-x-1"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => setSkillsFilter(skillsFilter.filter((_, i) => i !== index))}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {filteredCandidates.length}
              </p>
            </div>
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg JD Match</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {filteredCandidates.length > 0 
                  ? Math.round(filteredCandidates.reduce((acc, c) => acc + c.jdMatchScore, 0) / filteredCandidates.length)
                  : 0}%
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">High Match (85+%)</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {filteredCandidates.filter(c => c.jdMatchScore >= 85).length}
              </p>
            </div>
            <TrophyIcon className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Interview Ready</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {filteredCandidates.filter(c => c.status === 'interview-scheduled').length}
              </p>
            </div>
            <CalendarIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-medium text-xl">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedCandidate.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedCandidate.position}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className={`text-sm font-medium ${getScoreColor(selectedCandidate.score)}`}>
                          AI Score: {selectedCandidate.score}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrophyIcon className="h-4 w-4 text-purple-400" />
                        <span className={`text-sm font-medium ${getMatchScoreColor(selectedCandidate.jdMatchScore)}`}>
                          JD Match: {selectedCandidate.jdMatchScore}%
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* JD Match Analysis */}
              {(() => {
                const jd = jobDescriptions.find(j => j.id === selectedCandidate.appliedJD);
                if (!jd) return null;
                
                return (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Job Description Match Analysis
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="mb-4">
                        <h4 className="font-medium text-blue-800 dark:text-blue-200">
                          Applied for: {jd.title}
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-300">
                          {jd.department} • {jd.location}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                            Required Skills Match
                          </h5>
                          <div className="space-y-1">
                            {jd.requiredSkills.map((skill, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                {selectedCandidate.skills.includes(skill) ? (
                                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                                ) : (
                                  <XCircleIcon className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                            Preferred Skills Match
                          </h5>
                          <div className="space-y-1">
                            {jd.preferredSkills.map((skill, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                {selectedCandidate.skills.includes(skill) ? (
                                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                                ) : (
                                  <XCircleIcon className="h-4 w-4 text-gray-400" />
                                )}
                                <span className="text-sm">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCandidate.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCandidate.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCandidate.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCandidate.experience} experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, index) => {
                    const jd = jobDescriptions.find(j => j.id === selectedCandidate.appliedJD);
                    const isRequired = jd?.requiredSkills?.includes(skill);
                    const isPreferred = jd?.preferredSkills?.includes(skill);
                    
                    let skillClass = 'px-3 py-1 text-sm rounded-full';
                    if (isRequired) {
                      skillClass += ' bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300';
                    } else if (isPreferred) {
                      skillClass += ' bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-300';
                    } else {
                      skillClass += ' bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
                    }
                    
                    return (
                      <span key={index} className={skillClass}>
                      {skill}
                        {isRequired && <span className="ml-1 text-green-600">✓</span>}
                        {isPreferred && <span className="ml-1 text-blue-600">+</span>}
                    </span>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Notes
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedCandidate.notes}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Schedule Interview
                </button>
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Send Offer
                </button>
                <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateManagement; 