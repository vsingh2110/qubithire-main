import React, { useState } from 'react';
import {
  DocumentTextIcon,
  SparklesIcon,
  PencilSquareIcon,
  EyeIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  LightBulbIcon,
  ClipboardDocumentIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserGroupIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XCircleIcon,
  BeakerIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  ShieldCheckIcon,
  CogIcon,
  DocumentCheckIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';

const JDEnhancement = () => {
  const [searchParams] = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [enhancementMode, setEnhancementMode] = useState('comprehensive');
  const [currentJD, setCurrentJD] = useState('');
  const [enhancedJD, setEnhancedJD] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Get the active section from URL query parameter, default to 'enhance'
  const activeSection = searchParams.toString() ? Object.keys(Object.fromEntries(searchParams))[0] : 'enhance';

  // Sample JD templates
  const jdTemplates = [
    {
      id: 1,
      title: 'Software Engineer',
      category: 'Technology',
      level: 'Mid-Level',
      industry: 'Tech',
      description: 'Comprehensive template for software engineering roles with modern tech stack requirements',
      template: `Job Title: Software Engineer

Job Summary:
We are seeking a talented Software Engineer to join our dynamic development team. You will be responsible for designing, developing, and maintaining high-quality software solutions that meet our clients' needs.

Key Responsibilities:
• Design and develop software applications using modern programming languages
• Collaborate with cross-functional teams to define and implement new features
• Write clean, maintainable, and efficient code
• Participate in code reviews and maintain coding standards
• Debug and resolve technical issues
• Contribute to architectural decisions and technical documentation

Required Qualifications:
• Bachelor's degree in Computer Science or related field
• 3+ years of experience in software development
• Proficiency in at least one modern programming language (Java, Python, JavaScript, etc.)
• Experience with version control systems (Git)
• Strong problem-solving and analytical skills
• Excellent communication and teamwork abilities

Preferred Qualifications:
• Experience with cloud platforms (AWS, Azure, GCP)
• Knowledge of database systems and SQL
• Familiarity with Agile development methodologies
• Experience with CI/CD pipelines

What We Offer:
• Competitive salary and benefits package
• Flexible work arrangements
• Professional development opportunities
• Collaborative and innovative work environment`
    },
    {
      id: 2,
      title: 'Product Manager',
      category: 'Product',
      level: 'Senior',
      industry: 'SaaS',
      description: 'Strategic product management role template for SaaS companies',
      template: `Job Title: Senior Product Manager

Job Summary:
We are looking for an experienced Product Manager to lead our product strategy and drive the development of innovative solutions that delight our customers and drive business growth.

Key Responsibilities:
• Define product vision, strategy, and roadmap
• Conduct market research and competitive analysis
• Collaborate with engineering, design, and sales teams
• Manage product lifecycle from conception to launch
• Analyze product performance and user feedback
• Prioritize features and enhancements based on business value

Required Qualifications:
• Bachelor's degree in Business, Engineering, or related field
• 5+ years of product management experience
• Experience with SaaS products and business models
• Strong analytical and data-driven decision making skills
• Excellent communication and leadership abilities
• Experience with product management tools (Jira, Confluence, etc.)

Preferred Qualifications:
• MBA or advanced degree
• Experience in B2B SaaS environment
• Technical background or ability to work closely with engineering teams
• Experience with user research and design thinking methodologies

What We Offer:
• Competitive compensation including equity
• Comprehensive health and wellness benefits
• Professional development budget
• Flexible PTO and remote work options`
    },
    {
      id: 3,
      title: 'Data Scientist',
      category: 'Analytics',
      level: 'Senior',
      industry: 'Finance',
      description: 'Advanced data science role for financial services',
      template: `Job Title: Senior Data Scientist

Job Summary:
Join our analytics team to drive data-driven insights that inform strategic business decisions. You will work on complex problems involving large datasets, predictive modeling, and machine learning.

Key Responsibilities:
• Develop and implement machine learning models and algorithms
• Analyze large, complex datasets to extract actionable insights
• Collaborate with business stakeholders to understand requirements
• Design and conduct experiments to test hypotheses
• Present findings and recommendations to leadership
• Mentor junior team members and contribute to best practices

Required Qualifications:
• PhD or Master's degree in Data Science, Statistics, or related field
• 4+ years of experience in data science or analytics
• Proficiency in Python, R, and SQL
• Experience with machine learning frameworks (TensorFlow, PyTorch, scikit-learn)
• Strong statistical analysis and modeling skills
• Experience with big data technologies (Spark, Hadoop)

Preferred Qualifications:
• Experience in financial services or fintech
• Knowledge of regulatory requirements and compliance
• Experience with cloud platforms and MLOps
• Strong business acumen and communication skills

What We Offer:
• Competitive salary with performance bonuses
• Comprehensive benefits package
• Access to cutting-edge technology and tools
• Opportunities for conference attendance and continuous learning`
    }
  ];

  // Enhancement modes
  const enhancementModes = [
    {
      id: 'comprehensive',
      name: 'Comprehensive Enhancement',
      description: 'Complete JD overhaul with structure, language, and content improvements',
      icon: SparklesIcon,
      features: ['Structure optimization', 'Language enhancement', 'Keyword optimization', 'Bias removal', 'Compliance check']
    },
    {
      id: 'targeted',
      name: 'Targeted Improvement',
      description: 'Focus on specific areas like language, requirements, or benefits',
      icon: BoltIcon,
      features: ['Specific focus areas', 'Quick turnaround', 'Minimal changes', 'Preserve original tone']
    },
    {
      id: 'diversity',
      name: 'Diversity & Inclusion',
      description: 'Optimize for inclusive language and diverse candidate attraction',
      icon: UserGroupIcon,
      features: ['Inclusive language', 'Bias detection', 'Accessibility improvements', 'Diverse appeal']
    },
    {
      id: 'seo',
      name: 'SEO Optimization',
      description: 'Enhance for better visibility on job boards and search engines',
      icon: GlobeAltIcon,
      features: ['Keyword optimization', 'Search visibility', 'Job board compatibility', 'Trending skills']
    }
  ];

  // Sample analysis results
  const sampleAnalysis = {
    overallScore: 78,
    strengths: [
      'Clear job title and summary',
      'Well-structured responsibilities',
      'Specific technical requirements',
      'Good balance of required vs preferred qualifications'
    ],
    improvements: [
      'Add more specific metrics and KPIs',
      'Include salary range information',
      'Enhance diversity and inclusion language',
      'Add more details about company culture'
    ],
    insights: {
      'Readability Score': '85%',
      'Keyword Density': 'Good',
      'Bias Detection': 'Low',
      'Structure Score': '90%',
      'Compliance': 'Pass'
    },
    recommendations: [
      {
        type: 'Content',
        priority: 'High',
        suggestion: 'Add specific performance metrics and success indicators',
        impact: 'High - Improves candidate understanding and expectations'
      },
      {
        type: 'Language',
        priority: 'Medium',
        suggestion: 'Replace "rockstar" and "ninja" with more inclusive terms',
        impact: 'Medium - Enhances diversity and inclusion'
      },
      {
        type: 'Structure',
        priority: 'Low',
        suggestion: 'Consider adding a "Day in the Life" section',
        impact: 'Low - Provides additional context for candidates'
      }
    ]
  };

  const handleEnhanceJD = async () => {
    setIsEnhancing(true);
    // Simulate API call
    setTimeout(() => {
      setEnhancedJD(`Enhanced Job Description for Software Engineer

Job Title: Senior Software Engineer

Job Summary:
We are seeking a talented and experienced Software Engineer to join our dynamic development team. You will be responsible for designing, developing, and maintaining high-quality software solutions that meet our clients' needs and drive business value.

Key Responsibilities:
• Design and develop scalable software applications using modern programming languages and frameworks
• Collaborate with cross-functional teams including product managers, designers, and QA engineers
• Write clean, maintainable, and efficient code following industry best practices
• Participate in code reviews and maintain coding standards across the team
• Debug and resolve technical issues in a timely manner
• Contribute to architectural decisions and technical documentation
• Mentor junior developers and share knowledge with the team
• Stay updated with emerging technologies and industry trends

Required Qualifications:
• Bachelor's degree in Computer Science, Engineering, or related field
• 3+ years of experience in software development with proven track record
• Proficiency in at least one modern programming language (Java, Python, JavaScript, Go, etc.)
• Experience with version control systems (Git) and collaborative development workflows
• Strong problem-solving and analytical skills with attention to detail
• Excellent communication and teamwork abilities
• Experience with Agile development methodologies

Preferred Qualifications:
• Experience with cloud platforms (AWS, Azure, GCP) and containerization (Docker, Kubernetes)
• Knowledge of database systems (SQL and NoSQL) and data modeling
• Familiarity with CI/CD pipelines and DevOps practices
• Experience with microservices architecture and distributed systems
• Understanding of security best practices and data protection

What We Offer:
• Competitive salary and comprehensive benefits package
• Flexible work arrangements including remote options
• Professional development opportunities and conference attendance
• Collaborative and innovative work environment
• Health, dental, and vision insurance
• 401(k) matching and equity participation
• Unlimited PTO and flexible scheduling`);

      setAnalysisResults(sampleAnalysis);
      setShowAnalysis(true);
      setIsEnhancing(false);
    }, 2000);
  };

  const handleUseTemplate = (template) => {
    setCurrentJD(template.template);
    setSelectedTemplate(template);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'enhance':
        return (
          <div className="space-y-6">
            {/* Enhancement Mode Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Choose Enhancement Mode
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enhancementModes.map(mode => (
                  <EnhancementModeCard key={mode.id} mode={mode} />
                ))}
              </div>
            </div>

            {/* JD Input and Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Current Job Description
                  </h3>
                  <button
                    onClick={() => setCurrentJD('')}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Clear
                  </button>
                </div>
                <textarea
                  value={currentJD}
                  onChange={(e) => setCurrentJD(e.target.value)}
                  placeholder="Paste your job description here..."
                  className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentJD.length} characters
                  </span>
                  <button
                    onClick={handleEnhanceJD}
                    disabled={!currentJD.trim() || isEnhancing}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {isEnhancing ? (
                      <>
                        <ArrowPathIcon className="h-4 w-4 animate-spin" />
                        <span>Enhancing...</span>
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

              {/* Output */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Enhanced Job Description
                  </h3>
                  {enhancedJD && (
                    <button
                      onClick={() => copyToClipboard(enhancedJD)}
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Copy
                    </button>
                  )}
                </div>
                <div className="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 overflow-y-auto">
                  {enhancedJD ? (
                    <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {enhancedJD}
                    </pre>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                      <div className="text-center">
                        <SparklesIcon className="h-12 w-12 mx-auto mb-2" />
                        <p>Enhanced JD will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            {showAnalysis && analysisResults && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Enhancement Analysis
                </h3>
                
                {/* Overall Score */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Overall JD Score
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {analysisResults.overallScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${analysisResults.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnalysisCard
                    title="Strengths"
                    items={analysisResults.strengths}
                  />
                  <AnalysisCard
                    title="Areas for Improvement"
                    items={analysisResults.improvements}
                  />
                </div>

                {/* Insights */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Key Insights</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(analysisResults.insights).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm text-blue-600 dark:text-blue-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Detailed Recommendations
                  </h4>
                  <div className="space-y-3">
                    {analysisResults.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {rec.type}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                rec.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              }`}>
                                {rec.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {rec.suggestion}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              Impact: {rec.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                Job Description Templates
              </h2>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option>All Categories</option>
                  <option>Technology</option>
                  <option>Product</option>
                  <option>Analytics</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <option>All Levels</option>
                  <option>Entry Level</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                  <option>Executive</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jdTemplates.map(template => (
                <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {template.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                          {template.category}
                        </span>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                          {template.level}
                        </span>
                      </div>
                    </div>
                    <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {template.industry}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analysis':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                JD Analysis Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive analytics and insights for your job descriptions will be available here.
              </p>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              JD Enhancement History
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">JD enhancement history will be available here.</p>
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

  const EnhancementModeCard = ({ mode }) => {
    const Icon = mode.icon;
    return (
      <div
        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
          enhancementMode === mode.id
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
        }`}
        onClick={() => setEnhancementMode(mode.id)}
      >
        <div className="flex items-start space-x-3">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
              {mode.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {mode.description}
            </p>
            <div className="space-y-1">
              {mode.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-3 w-3 text-green-600 dark:text-green-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AnalysisCard = ({ title, score, items, type = 'list' }) => (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">{title}</h4>
      {type === 'list' ? (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            JD Enhancement
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            AI-powered job description enhancement and optimization
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>New Enhancement</span>
        </button>
      </div>

      {/* Content based on active section */}
      {renderContent()}
    </div>
  );
};

export default JDEnhancement; 