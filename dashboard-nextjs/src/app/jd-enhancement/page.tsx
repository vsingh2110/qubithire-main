'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PencilSquareIcon,
  DocumentTextIcon,
  ChartBarIcon,
  SparklesIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
  UsersIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  CopyIcon,
  DownloadIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface EnhancementMode {
  id: string;
  name: string;
  description: string;
  icon: any;
  features: string[];
}

interface JDTemplate {
  id: number;
  name: string;
  category: string;
  description: string;
  content: string;
  usage: number;
}

interface AnalysisResults {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  insights: string[];
  recommendations: string[];
}

const JDEnhancementPageContent = () => {
  const searchParams = useSearchParams();
  const [selectedMode, setSelectedMode] = useState<string>('comprehensive');
  const [jdContent, setJdContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<JDTemplate | null>(null);

  // Get the active section from URL query parameter, default to 'enhance'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'enhance';

  // Enhancement modes
  const enhancementModes: EnhancementMode[] = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Enhancement',
      description: 'Complete JD overhaul with AI-powered optimization',
      icon: SparklesIcon,
      features: ['Grammar & clarity improvement', 'SEO optimization', 'Inclusive language', 'Structure optimization']
    },
    {
      id: 'targeted',
      name: 'Targeted Enhancement',
      description: 'Focus on specific areas of improvement',
      icon: MagnifyingGlassIcon,
      features: ['Custom focus areas', 'Selective improvements', 'Quick optimization', 'Focused results']
    },
    {
      id: 'diversity',
      name: 'Diversity & Inclusion',
      description: 'Optimize for inclusive and diverse language',
      icon: UsersIcon,
      features: ['Inclusive language', 'Bias reduction', 'Diversity focus', 'Equitable wording']
    },
    {
      id: 'seo',
      name: 'SEO Optimization',
      description: 'Optimize for job board visibility and search',
      icon: GlobeAltIcon,
      features: ['Keyword optimization', 'Search visibility', 'Job board ranking', 'SEO best practices']
    }
  ];

  // JD Templates
  const jdTemplates: JDTemplate[] = [
    {
      id: 1,
      name: 'Senior Software Engineer',
      category: 'Technology',
      description: 'Comprehensive template for senior engineering roles',
      content: 'We are seeking a Senior Software Engineer to join our dynamic team...',
      usage: 45
    },
    {
      id: 2,
      name: 'Product Manager',
      category: 'Product',
      description: 'Template for product management positions',
      content: 'Join us as a Product Manager to drive product strategy...',
      usage: 32
    },
    {
      id: 3,
      name: 'Data Analyst',
      category: 'Analytics',
      description: 'Template for data analysis and business intelligence roles',
      content: 'We are looking for a Data Analyst to transform data into insights...',
      usage: 28
    },
    {
      id: 4,
      name: 'UX Designer',
      category: 'Design',
      description: 'Template for user experience design positions',
      content: 'Join our design team as a UX Designer to create amazing user experiences...',
      usage: 23
    },
    {
      id: 5,
      name: 'Marketing Specialist',
      category: 'Marketing',
      description: 'Template for marketing and communications roles',
      content: 'We are seeking a Marketing Specialist to develop and execute marketing strategies...',
      usage: 19
    },
    {
      id: 6,
      name: 'Sales Representative',
      category: 'Sales',
      description: 'Template for sales and business development roles',
      content: 'Join our sales team as a Sales Representative to drive revenue growth...',
      usage: 15
    }
  ];

  const handleEnhanceJD = async () => {
    if (!jdContent.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const results: AnalysisResults = {
        overallScore: 87,
        strengths: [
          'Clear job requirements and responsibilities',
          'Good use of action verbs',
          'Appropriate length and structure',
          'Includes key technical skills'
        ],
        improvements: [
          'Add more specific metrics and KPIs',
          'Include diversity and inclusion language',
          'Optimize for SEO keywords',
          'Add company culture section'
        ],
        insights: [
          'JD scores well on clarity and structure',
          'Could benefit from more specific success metrics',
          'SEO optimization would improve visibility',
          'Inclusive language would attract diverse candidates'
        ],
        recommendations: [
          'Add specific performance metrics',
          'Include remote work policies',
          'Add benefits and perks section',
          'Optimize for relevant keywords'
        ]
      };
      
      setAnalysisResults(results);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleUseTemplate = (template: JDTemplate) => {
    setJdContent(template.content);
    setSelectedTemplate(template);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'enhance':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                JD Enhancement
              </h2>
              
              {/* Enhancement Modes */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Enhancement Mode
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {enhancementModes.map(mode => (
                    <EnhancementModeCard key={mode.id} mode={mode} />
                  ))}
                </div>
              </div>

              {/* JD Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Description
                </label>
                <textarea
                  value={jdContent}
                  onChange={(e) => setJdContent(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Paste your job description here..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleEnhanceJD}
                  disabled={!jdContent.trim() || isAnalyzing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-4 w-4" />
                      <span>Enhance JD</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            {analysisResults && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Analysis Results
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnalysisCard 
                    title="Overall Score" 
                    score={analysisResults.overallScore} 
                    items={[]} 
                    type="score" 
                  />
                  <AnalysisCard 
                    title="Strengths" 
                    score={0} 
                    items={analysisResults.strengths} 
                    type="list" 
                  />
                  <AnalysisCard 
                    title="Improvements" 
                    score={0} 
                    items={analysisResults.improvements} 
                    type="list" 
                  />
                  <AnalysisCard 
                    title="Recommendations" 
                    score={0} 
                    items={analysisResults.recommendations} 
                    type="list" 
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                JD Templates
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <PlusIcon className="h-4 w-4" />
                <span>Create Template</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jdTemplates.map(template => (
                <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {template.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {template.category}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {template.usage} uses
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Use Template
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analysis':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              JD Analysis
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">JD analysis features will be available here.</p>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Enhancement History
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Senior React Developer JD</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced on Jan 20, 2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                      Score: 87
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">UX Designer JD</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced on Jan 18, 2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                      Score: 92
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </div>
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

  const EnhancementModeCard = ({ mode }: { mode: EnhancementMode }) => (
    <div 
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        selectedMode === mode.id
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
      }`}
      onClick={() => setSelectedMode(mode.id)}
    >
      <div className="flex items-center space-x-3 mb-3">
        <mode.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          {mode.name}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {mode.description}
      </p>
      <div className="space-y-1">
        {mode.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <CheckCircleIcon className="h-3 w-3 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const AnalysisCard = ({ title, score, items, type }: { title: string; score: number; items: string[]; type: string }) => (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
        {title}
      </h4>
      {type === 'score' ? (
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {score}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">out of 100</div>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          JD Enhancement
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          AI-powered job description optimization and enhancement
        </p>
      </div>

      {/* Current Tab Display */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current View:</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {activeSection === 'enhance' && 'Enhance JD'}
              {activeSection === 'templates' && 'JD Templates'}
              {activeSection === 'analysis' && 'JD Analysis'}
              {activeSection === 'history' && 'Enhancement History'}
            </span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeSection === 'templates' ? `${jdTemplates.length} templates available` : ''}
            {activeSection === 'history' ? 'Recent enhancements' : ''}
          </div>
        </div>
      </div>

      {/* Content based on active section */}
      {renderContent()}
    </div>
  );
};

const JDEnhancementPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading JD enhancement...</p>
        </div>
      </div>
    }>
      <JDEnhancementPageContent />
    </Suspense>
  );
};

export default JDEnhancementPage; 