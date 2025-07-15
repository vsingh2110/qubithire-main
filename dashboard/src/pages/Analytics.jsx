import React, { useState } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const metrics = [
    {
      title: 'Applications Received',
      value: '1,247',
      change: '+23.5%',
      trend: 'up',
      icon: DocumentTextIcon,
      color: 'blue'
    },
    {
      title: 'Interviews Conducted',
      value: '156',
      change: '+12.3%',
      trend: 'up',
      icon: CalendarIcon,
      color: 'green'
    },
    {
      title: 'Offers Made',
      value: '42',
      change: '+8.7%',
      trend: 'up',
      icon: CheckCircleIcon,
      color: 'purple'
    },
    {
      title: 'Average Time to Hire',
      value: '18 days',
      change: '-2.1 days',
      trend: 'up',
      icon: ClockIcon,
      color: 'orange'
    }
  ];

  const departmentData = [
    { department: 'Engineering', applications: 450, interviews: 67, offers: 18, hires: 12 },
    { department: 'Design', applications: 234, interviews: 34, offers: 8, hires: 6 },
    { department: 'Product', applications: 189, interviews: 28, offers: 7, hires: 5 },
    { department: 'Sales', applications: 167, interviews: 22, offers: 6, hires: 4 },
    { department: 'Marketing', applications: 143, interviews: 18, offers: 4, hires: 3 }
  ];

  const topSources = [
    { source: 'LinkedIn', candidates: 398, percentage: 32 },
    { source: 'Indeed', candidates: 312, percentage: 25 },
    { source: 'Company Website', candidates: 249, percentage: 20 },
    { source: 'Referrals', candidates: 187, percentage: 15 },
    { source: 'Other Job Boards', candidates: 101, percentage: 8 }
  ];

  const recentHires = [
    {
      name: 'John Smith',
      position: 'Senior React Developer',
      department: 'Engineering',
      hireDate: '2024-01-15',
      timeToHire: '14 days',
      source: 'LinkedIn'
    },
    {
      name: 'Sarah Johnson',
      position: 'UX Designer',
      department: 'Design',
      hireDate: '2024-01-12',
      timeToHire: '21 days',
      source: 'Portfolio Site'
    },
    {
      name: 'Mike Davis',
      position: 'Data Scientist',
      department: 'Engineering',
      hireDate: '2024-01-10',
      timeToHire: '16 days',
      source: 'Referral'
    }
  ];

  const getConversionRate = (interviews, applications) => {
    return ((interviews / applications) * 100).toFixed(1);
  };

  const getOfferAcceptanceRate = (hires, offers) => {
    return ((hires / offers) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Analytics & Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your recruitment performance and metrics
          </p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
                    {metric.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${metric.color}-100 dark:bg-${metric.color}-900`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.trend === 'up' ? (
                   <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                   <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  from last period
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Department Performance
            </h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Department</th>
                    <th className="text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Applications</th>
                    <th className="text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Conversion</th>
                    <th className="text-sm font-medium text-gray-500 dark:text-gray-400 pb-3">Hires</th>
                  </tr>
                </thead>
                <tbody className="space-y-3">
                  {departmentData.map((dept, index) => (
                    <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="py-3">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {dept.department}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">{dept.applications}</td>
                      <td className="py-3">
                        <span className="text-sm text-green-600 dark:text-green-400">
                          {getConversionRate(dept.interviews, dept.applications)}%
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {dept.hires}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Top Candidate Sources
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {source.source}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {source.candidates} candidates ({source.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Hires */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Hires
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentHires.map((hire, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {hire.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {hire.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {hire.position} • {hire.department}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {new Date(hire.hireDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {hire.timeToHire} • {hire.source}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Application Trends
            </h2>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Integration with chart library needed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Hiring Funnel
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Applications</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">1,247</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Screenings</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">312</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Interviews</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">156</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '12.5%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Offers</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">42</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '3.4%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Hires</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">30</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '2.4%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 