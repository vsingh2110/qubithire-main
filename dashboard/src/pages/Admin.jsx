import React, { useState } from 'react';
import {
  UserGroupIcon,
  ShieldCheckIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  KeyIcon,
  BuildingOfficeIcon,
  UserIcon,
  BellIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  FolderIcon,
  GlobeAltIcon,
  LockClosedIcon,
  LockOpenIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';

const Admin = () => {
  const [searchParams] = useSearchParams();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  // Get the active section from URL query parameter, default to 'users'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'users';

  // Sample users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'HR Manager',
      department: 'Human Resources',
      status: 'active',
      lastLogin: '2024-01-20T10:30:00Z',
      permissions: ['view_candidates', 'edit_candidates', 'manage_interviews', 'view_reports'],
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Recruiter',
      department: 'Human Resources',
      status: 'active',
      lastLogin: '2024-01-19T14:45:00Z',
      permissions: ['view_candidates', 'edit_candidates', 'schedule_interviews'],
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'Hiring Manager',
      department: 'Engineering',
      status: 'active',
      lastLogin: '2024-01-18T09:15:00Z',
      permissions: ['view_candidates', 'conduct_interviews', 'make_offers'],
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      role: 'Admin',
      department: 'IT',
      status: 'inactive',
      lastLogin: '2024-01-15T16:20:00Z',
      permissions: ['admin_access', 'manage_users', 'manage_roles'],
      avatar: '/api/placeholder/40/40'
    }
  ]);

  // Sample roles with permissions
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'System Administrator',
      description: 'Full system access with user and role management capabilities',
      permissions: [
        'admin_access',
        'manage_users',
        'manage_roles',
        'view_all_data',
        'system_configuration'
      ],
      userCount: 2,
      isDefault: false
    },
    {
      id: 2,
      name: 'HR Manager',
      description: 'Complete HR workflow management with reporting access',
      permissions: [
        'view_candidates',
        'edit_candidates',
        'manage_interviews',
        'manage_offers',
        'view_reports',
        'manage_bgv'
      ],
      userCount: 3,
      isDefault: false
    },
    {
      id: 3,
      name: 'Recruiter',
      description: 'Standard recruiter with candidate management capabilities',
      permissions: [
        'view_candidates',
        'edit_candidates',
        'schedule_interviews',
        'view_reports'
      ],
      userCount: 5,
      isDefault: true
    },
    {
      id: 4,
      name: 'Hiring Manager',
      description: 'Department-specific hiring with interview and offer capabilities',
      permissions: [
        'view_candidates',
        'conduct_interviews',
        'make_offers',
        'view_department_reports'
      ],
      userCount: 8,
      isDefault: false
    },
    {
      id: 5,
      name: 'Interviewer',
      description: 'Basic access for conducting interviews and providing feedback',
      permissions: [
        'view_assigned_candidates',
        'conduct_interviews',
        'provide_feedback'
      ],
      userCount: 12,
      isDefault: false
    }
  ]);

  // Available permissions
  const availablePermissions = [
    { id: 'admin_access', name: 'Admin Access', description: 'Full system administration' },
    { id: 'manage_users', name: 'Manage Users', description: 'Create, edit, and delete users' },
    { id: 'manage_roles', name: 'Manage Roles', description: 'Create and manage user roles' },
    { id: 'view_candidates', name: 'View Candidates', description: 'View candidate information' },
    { id: 'edit_candidates', name: 'Edit Candidates', description: 'Modify candidate data' },
    { id: 'manage_interviews', name: 'Manage Interviews', description: 'Schedule and manage interviews' },
    { id: 'conduct_interviews', name: 'Conduct Interviews', description: 'Participate in interviews' },
    { id: 'schedule_interviews', name: 'Schedule Interviews', description: 'Schedule interview sessions' },
    { id: 'make_offers', name: 'Make Offers', description: 'Create and send offer letters' },
    { id: 'manage_offers', name: 'Manage Offers', description: 'Full offer management' },
    { id: 'view_reports', name: 'View Reports', description: 'Access to all reports' },
    { id: 'view_department_reports', name: 'Department Reports', description: 'View department-specific reports' },
    { id: 'manage_bgv', name: 'Manage BGV', description: 'Background verification management' },
    { id: 'system_configuration', name: 'System Configuration', description: 'Configure system settings' },
    { id: 'view_all_data', name: 'View All Data', description: 'Access to all system data' },
    { id: 'provide_feedback', name: 'Provide Feedback', description: 'Submit interview feedback' },
    { id: 'view_assigned_candidates', name: 'View Assigned Candidates', description: 'View candidates assigned to user' }
  ];

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getRoleColor = (role) => {
    const colors = {
      'System Administrator': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'HR Manager': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Recruiter': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Hiring Manager': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Interviewer': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                User Management
              </h2>
              <button
                onClick={() => setShowUserModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add User</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        );

      case 'roles':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Role Management
              </h2>
              <button
                onClick={() => setShowRoleModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Create Role</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map(role => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>
        );

      case 'permissions':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                System Permissions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availablePermissions.map(permission => (
                  <div key={permission.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {permission.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {permission.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'audit':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Audit Logs
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Audit logs will be available here.</p>
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

  const UserCard = ({ user }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.email}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                {user.status}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                {user.role}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setEditingUser(user);
              setShowUserModal(true);
            }}
            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Edit User"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete User"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Department:</span>
          <span className="text-gray-900 dark:text-gray-100">{user.department}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Last Login:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {new Date(user.lastLogin).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Permissions:</span>
          <span className="text-gray-900 dark:text-gray-100">
            {user.permissions.length} permissions
          </span>
        </div>
      </div>
    </div>
  );

  const RoleCard = ({ role }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {role.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {role.description}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            {role.isDefault && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Default
              </span>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {role.userCount} users
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setEditingRole(role);
              setShowRoleModal(true);
            }}
            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            title="Edit Role"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete Role"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Permissions ({role.permissions.length})
          </h4>
          <div className="flex flex-wrap gap-1">
            {role.permissions.slice(0, 3).map(permission => (
              <span
                key={permission}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
              >
                {permission.replace('_', ' ')}
              </span>
            ))}
            {role.permissions.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{role.permissions.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const UserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <button
              onClick={() => {
                setShowUserModal(false);
                setEditingUser(null);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={editingUser?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={editingUser?.email || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                defaultValue={editingUser?.role || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <input
                type="text"
                defaultValue={editingUser?.department || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter department"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                defaultValue={editingUser?.status || 'active'}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Permissions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md p-4">
              {availablePermissions.map(permission => (
                <label key={permission.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={editingUser?.permissions?.includes(permission.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {permission.name}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {permission.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            {editingUser ? 'Update User' : 'Create User'}
          </button>
          <button 
            onClick={() => {
              setShowUserModal(false);
              setEditingUser(null);
            }}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const RoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {editingRole ? 'Edit Role' : 'Create New Role'}
            </h2>
            <button
              onClick={() => {
                setShowRoleModal(false);
                setEditingRole(null);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role Name
              </label>
              <input
                type="text"
                defaultValue={editingRole?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter role name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                defaultValue={editingRole?.description || ''}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter role description"
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Permissions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-md p-4">
              {availablePermissions.map(permission => (
                <label key={permission.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={editingRole?.permissions?.includes(permission.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {permission.name}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {permission.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            {editingRole ? 'Update Role' : 'Create Role'}
          </button>
          <button 
            onClick={() => {
              setShowRoleModal(false);
              setEditingRole(null);
            }}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
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
          Administration
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage users, roles, and system permissions
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <KeyIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Roles</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{roles.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CogIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Permissions</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{availablePermissions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active section */}
      {renderContent()}

      {/* Modals */}
      {showUserModal && <UserModal />}
      {showRoleModal && <RoleModal />}
    </div>
  );
};

export default Admin; 