import React, { useState } from 'react';
import { 
  CogIcon, 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon,
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon,
  SparklesIcon,
  CalendarIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  StarIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';

const Settings = () => {
  const [searchParams] = useSearchParams();
  const [automationSettings, setAutomationSettings] = useState({
    bgvAutomation: false,
    interviewScheduling: false,
    offerRollout: false,
    emailCommunications: false,
    resumeScreening: false,
    candidateNotifications: false
  });

  const [jobSpecificAutomation, setJobSpecificAutomation] = useState([
    {
      id: 1,
      jobTitle: 'Senior React Developer',
      department: 'Engineering',
      automations: {
        bgvAutomation: true,
        interviewScheduling: true,
        offerRollout: false,
        emailCommunications: true,
        resumeScreening: true,
        candidateNotifications: true
      },
      priority: 'high',
      isActive: true
    },
    {
      id: 2,
      jobTitle: 'UX Designer',
      department: 'Design',
      automations: {
        bgvAutomation: false,
        interviewScheduling: true,
        offerRollout: true,
        emailCommunications: true,
        resumeScreening: false,
        candidateNotifications: true
      },
      priority: 'medium',
      isActive: true
    },
    {
      id: 3,
      jobTitle: 'Data Scientist',
      department: 'Analytics',
      automations: {
        bgvAutomation: true,
        interviewScheduling: false,
        offerRollout: false,
        emailCommunications: false,
        resumeScreening: true,
        candidateNotifications: false
      },
      priority: 'low',
      isActive: false
    }
  ]);

  const [departmentAutomation, setDepartmentAutomation] = useState([
    {
      id: 1,
      department: 'Engineering',
      automations: {
        bgvAutomation: true,
        interviewScheduling: true,
        offerRollout: false,
        emailCommunications: true,
        resumeScreening: true,
        candidateNotifications: true
      },
      isActive: true
    },
    {
      id: 2,
      department: 'Design',
      automations: {
        bgvAutomation: false,
        interviewScheduling: true,
        offerRollout: true,
        emailCommunications: true,
        resumeScreening: false,
        candidateNotifications: true
      },
      isActive: true
    },
    {
      id: 3,
      department: 'Marketing',
      automations: {
        bgvAutomation: false,
        interviewScheduling: false,
        offerRollout: false,
        emailCommunications: true,
        resumeScreening: false,
        candidateNotifications: true
      },
      isActive: false
    }
  ]);

  // Get the active section from URL query parameter, default to 'general'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'general';

  const [showJobModal, setShowJobModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);

  const handleAutomationToggle = (setting) => {
    setAutomationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleJobAutomationToggle = (jobId, automation) => {
    setJobSpecificAutomation(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, automations: { ...job.automations, [automation]: !job.automations[automation] } }
        : job
    ));
  };

  const handleDepartmentAutomationToggle = (deptId, automation) => {
    setDepartmentAutomation(prev => prev.map(dept => 
      dept.id === deptId 
        ? { ...dept, automations: { ...dept.automations, [automation]: !dept.automations[automation] } }
        : dept
    ));
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'general':
  return (
    <div className="space-y-6">
            {/* General Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <UserIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Profile</h2>
          </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your account information and preferences</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Edit Profile
                </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <BellIcon className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
          </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Configure email and system notifications</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Configure
                </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <CogIcon className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Configuration</h2>
          </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">AI model settings and workflow configuration</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                  Configure
                </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-4">
            <ShieldCheckIcon className="h-6 w-6 text-orange-600 dark:text-orange-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Security</h2>
          </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Password, authentication, and security settings</p>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                  Manage
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Notification Settings
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Notification settings will be available here.</p>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Integrations
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Integration settings will be available here.</p>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Security Settings
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Security settings will be available here.</p>
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

  const AutomationToggle = ({ 
    id, 
    title, 
    description, 
    enabled, 
    onToggle, 
    icon: Icon,
    warning = null 
  }) => (
    <div className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
            {warning && (
              <div className="flex items-center mt-2 text-xs text-amber-600 dark:text-amber-400">
                <InformationCircleIcon className="h-4 w-4 mr-1" />
                <span>{warning}</span>
              </div>
            )}
          </div>
          <button
            onClick={() => onToggle(id)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const JobAutomationCard = ({ job }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {job.jobTitle}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {job.department}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              job.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              job.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {job.priority} priority
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              job.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
            }`}>
              {job.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowJobModal(true)}
            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Edit Job Automation"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete Job Automation"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Automation Settings
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(job.automations).map(([key, enabled]) => (
            <div key={key} className="flex items-center space-x-2">
              {enabled ? (
                <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <XMarkIcon className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DepartmentAutomationCard = ({ department }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {department.department}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            department.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
          }`}>
            {department.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowDepartmentModal(true)}
            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Edit Department Automation"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete Department Automation"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Automation Settings
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(department.automations).map(([key, enabled]) => (
            <div key={key} className="flex items-center space-x-2">
              {enabled ? (
                <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <XMarkIcon className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure your QubitHire system preferences and automation settings
        </p>
      </div>

      {/* Content based on active section */}
      {renderContent()}

      {/* Automation Status Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Automation Status Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(automationSettings).map(([key, enabled]) => (
            <div key={key} className="flex items-center space-x-2">
              {enabled ? (
                <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <XMarkIcon className="h-4 w-4 text-gray-400" />
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings; 