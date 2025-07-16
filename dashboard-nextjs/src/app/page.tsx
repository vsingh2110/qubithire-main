'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  UserIcon,
  DocumentTextIcon,
  CalendarIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  StarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface ChartOption {
  type: 'pie' | 'bar';
  label: string;
  dataKey: string;
}

interface Chart {
  id: number;
  type: 'pie' | 'bar';
  label: string;
  dataKey: string;
}

interface DraggableChartProps {
  chart: Chart;
  index: number;
  moveChart: (dragIndex: number, hoverIndex: number) => void;
  removeChart: (id: number) => void;
}

const chartOptions: ChartOption[] = [
  { type: 'pie', label: 'Jobs Pie', dataKey: 'jobs' },
  { type: 'bar', label: 'Jobs Bar', dataKey: 'jobs' },
  { type: 'pie', label: 'Candidates Pie', dataKey: 'candidates' },
  { type: 'bar', label: 'Candidates Bar', dataKey: 'candidates' },
  { type: 'pie', label: 'Offers Pie', dataKey: 'offers' },
  { type: 'bar', label: 'Offers Bar', dataKey: 'offers' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Sample data
const sampleData: Record<string, Array<{ name: string; value: number }>> = {
  jobs: [
    { name: 'Open', value: 24 },
    { name: 'Closed', value: 12 },
    { name: 'On Hold', value: 6 },
  ],
  candidates: [
    { name: 'Screened', value: 40 },
    { name: 'Interviewed', value: 18 },
    { name: 'Hired', value: 5 },
  ],
  offers: [
    { name: 'Accepted', value: 8 },
    { name: 'Rejected', value: 3 },
    { name: 'Pending', value: 4 },
  ],
};

// Draggable Chart Component
const DraggableChart: React.FC<DraggableChartProps> = ({ chart, index, moveChart, removeChart }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'chart',
    item: { id: chart.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'chart',
    hover: (item: { id: number; index: number }, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (item.index === index) return;
      moveChart(item.index, index);
      item.index = index;
    },
  });

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 relative cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg font-bold z-10"
        onClick={() => removeChart(chart.id)}
        aria-label="Remove chart"
      >
        ×
      </button>
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{chart.label}</h2>
      <div className="h-64">
        {chart.type === 'pie' ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sampleData[chart.dataKey]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {sampleData[chart.dataKey].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData[chart.dataKey]}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Candidates',
      value: '1,247',
      change: '+12%',
      trend: 'up' as const,
      icon: UserIcon,
      color: 'blue'
    },
    {
      title: 'Active Jobs',
      value: '23',
      change: '+3%',
      trend: 'up' as const,
      icon: BriefcaseIcon,
      color: 'green'
    },
    {
      title: 'Interviews Scheduled',
      value: '18',
      change: '+8%',
      trend: 'up' as const,
      icon: CalendarIcon,
      color: 'purple'
    },
    {
      title: 'Offers Pending',
      value: '5',
      change: '-2%',
      trend: 'down' as const,
      icon: DocumentTextIcon,
      color: 'orange'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'screening' as const,
      title: 'New resume screened',
      candidate: 'John Smith',
      score: 85,
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'interview' as const,
      title: 'Interview scheduled',
      candidate: 'Sarah Johnson',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'offer' as const,
      title: 'Offer letter sent',
      candidate: 'Mike Davis',
      time: '1 hour ago'
    },
    {
      id: 4,
      type: 'screening' as const,
      title: 'Resume rejected',
      candidate: 'Jane Doe',
      score: 42,
      time: '2 hours ago'
    }
  ];

  const topCandidates = [
    {
      id: 1,
      name: 'Alice Chen',
      position: 'Senior Developer',
      score: 94,
      avatar: '/api/placeholder/40/40',
      skills: ['React', 'Node.js', 'Python']
    },
    {
      id: 2,
      name: 'Robert Kim',
      position: 'Data Scientist',
      score: 91,
      avatar: '/api/placeholder/40/40',
      skills: ['Python', 'ML', 'SQL']
    },
    {
      id: 3,
      name: 'Emma Wilson',
      position: 'UX Designer',
      score: 89,
      avatar: '/api/placeholder/40/40',
      skills: ['Figma', 'Sketch', 'Design']
    }
  ];

  const [charts, setCharts] = useState<Chart[]>([
    { id: 1, type: 'pie', label: 'Jobs Pie', dataKey: 'jobs' },
    { id: 2, type: 'bar', label: 'Candidates Bar', dataKey: 'candidates' },
  ]);
  const [nextId, setNextId] = useState(3);
  const [addMenuOpen, setAddMenuOpen] = useState(false);

  const handleAddChart = (option: ChartOption) => {
    setCharts([...charts, { ...option, id: nextId }]);
    setNextId(nextId + 1);
    setAddMenuOpen(false);
  };

  const handleRemoveChart = (id: number) => {
    setCharts(charts.filter(chart => chart.id !== id));
  };

  const moveChart = (dragIndex: number, hoverIndex: number) => {
    const dragChart = charts[dragIndex];
    const newCharts = [...charts];
    newCharts.splice(dragIndex, 1);
    newCharts.splice(hoverIndex, 0, dragChart);
    setCharts(newCharts);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'screening':
        return DocumentTextIcon;
      case 'interview':
        return CalendarIcon;
      case 'offer':
        return BriefcaseIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DashboardLayout>
        <div className="space-y-6">
        {/* Header with Add Chart button */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Home
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Welcome back! Here&apos;s what&apos;s happening with your recruitment process today.
              </p>
            </div>
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none transition-colors"
                onClick={() => setAddMenuOpen(!addMenuOpen)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Chart
              </button>
              {addMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                  {chartOptions.map((option) => (
                    <button
                      key={option.label}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleAddChart(option)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  {stat.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    from last week
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Recent Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Icon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.candidate}
                            {activity.score && (
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getScoreColor(activity.score)}`}>
                                Score: {activity.score}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Top Candidates */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Top Candidates
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {candidate.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {candidate.position}
                        </p>
                        <div className="flex space-x-1 mt-1">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {candidate.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Quick Actions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Screen Resumes</p>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <CalendarIcon className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Schedule Interview</p>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <BriefcaseIcon className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Send Offer</p>
              </button>
              <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <ChartBarIcon className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">View Analytics</p>
              </button>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Charts
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charts.map((chart, index) => (
              <DraggableChart
                key={chart.id}
                chart={chart}
                index={index}
                moveChart={moveChart}
                removeChart={handleRemoveChart}
              />
            ))}
          </div>
        </div>
      </div>
      </DashboardLayout>
    </DndProvider>
  );
};

export default Home;
