"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  AdjustmentsHorizontalIcon,
  BeakerIcon,
  DocumentTextIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const InterviewScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("calendar");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [conflictDetection, setConflictDetection] = useState(true);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Sample interviewer data with availability
  const interviewers = [
    {
      id: 1,
      name: "Sarah Wilson",
      role: "Senior Developer",
      department: "Engineering",
      email: "sarah.wilson@company.com",
      phone: "+1 (555) 123-4567",
      expertise: ["React", "Node.js", "System Design"],
      availability: {
        "2024-01-20": ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
        "2024-01-21": ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "4:00 PM"],
        "2024-01-22": ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"]
      },
      busySlots: {
        "2024-01-20": ["10:00 AM"],
        "2024-01-21": ["11:30 AM"],
        "2024-01-22": []
      }
    },
    {
      id: 2,
      name: "Mike Johnson",
      role: "Tech Lead",
      department: "Engineering",
      email: "mike.johnson@company.com",
      phone: "+1 (555) 234-5678",
      expertise: ["JavaScript", "AWS", "Team Leadership"],
      availability: {
        "2024-01-20": ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"],
        "2024-01-21": ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
        "2024-01-22": ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"]
      },
      busySlots: {
        "2024-01-20": ["2:30 PM"],
        "2024-01-21": [],
        "2024-01-22": ["3:30 PM"]
      }
    },
    {
      id: 3,
      name: "Lisa Park",
      role: "Design Lead",
      department: "Design",
      email: "lisa.park@company.com",
      phone: "+1 (555) 345-6789",
      expertise: ["UI/UX", "Design Systems", "User Research"],
      availability: {
        "2024-01-20": ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"],
        "2024-01-21": ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"],
        "2024-01-22": ["9:00 AM", "10:30 AM", "2:00 PM", "4:30 PM"]
      },
      busySlots: {
        "2024-01-20": ["2:00 PM"],
        "2024-01-21": ["2:30 PM"],
        "2024-01-22": []
      }
    },
    {
      id: 4,
      name: "David Kim",
      role: "VP Engineering",
      department: "Leadership",
      email: "david.kim@company.com",
      phone: "+1 (555) 456-7890",
      expertise: ["Leadership", "Strategy", "Architecture"],
      availability: {
        "2024-01-20": ["10:30 AM", "2:00 PM", "4:00 PM"],
        "2024-01-21": ["9:00 AM", "11:30 AM", "3:00 PM"],
        "2024-01-22": ["10:00 AM", "2:30 PM", "4:00 PM"]
      },
      busySlots: {
        "2024-01-20": [],
        "2024-01-21": ["11:30 AM"],
        "2024-01-22": ["2:30 PM"]
      }
    }
  ];

  // Sample panel configurations
  const interviewPanels = [
    {
      id: 1,
      name: "Technical Panel",
      type: "Technical Interview",
      members: [1, 2], // Sarah Wilson, Mike Johnson
      duration: "1 hour",
      description: "Technical assessment with coding and system design"
    },
    {
      id: 2,
      name: "Design Panel",
      type: "Design Review",
      members: [3], // Lisa Park
      duration: "45 minutes",
      description: "Portfolio review and design thinking assessment"
    },
    {
      id: 3,
      name: "Leadership Panel",
      type: "Final Interview",
      members: [4, 1], // David Kim, Sarah Wilson
      duration: "1.5 hours",
      description: "Final round with leadership team"
    },
    {
      id: 4,
      name: "Full Panel",
      type: "Comprehensive Review",
      members: [1, 2, 3, 4], // All interviewers
      duration: "2 hours",
      description: "Comprehensive assessment with all stakeholders"
    }
  ];

  // Sample candidate availability
  const candidateAvailability = {
    "John Smith": {
      "2024-01-20": ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM"],
      "2024-01-21": ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM"],
      "2024-01-22": ["10:00 AM", "2:00 PM", "3:00 PM"]
    },
    "Emily Chen": {
      "2024-01-20": ["10:30 AM", "2:00 PM", "3:30 PM"],
      "2024-01-21": ["9:00 AM", "10:30 AM", "2:00 PM"],
      "2024-01-22": ["9:30 AM", "11:00 AM", "3:30 PM"]
    },
    "Alex Rodriguez": {
      "2024-01-20": ["11:00 AM", "2:30 PM", "4:00 PM"],
      "2024-01-21": ["9:00 AM", "11:30 AM", "3:00 PM"],
      "2024-01-22": ["10:30 AM", "2:00 PM", "4:30 PM"]
    }
  };

  const interviews = [
    {
      id: 1,
      candidate: "John Smith",
      position: "Senior React Developer",
      type: "Technical Interview",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "1 hour",
      interviewers: [1, 2], // Sarah Wilson, Mike Johnson
      panelId: 1,
      location: "Conference Room A",
      isVirtual: false,
      status: "scheduled",
      notes: "Focus on React and system design",
      conflicts: [],
      candidateConfirmed: true,
      interviewersConfirmed: [1, 2]
    },
    {
      id: 2,
      candidate: "Emily Chen",
      position: "UX Designer",
      type: "Portfolio Review",
      date: "2024-01-20",
      time: "2:00 PM",
      duration: "45 minutes",
      interviewers: [3], // Lisa Park
      panelId: 2,
      location: "Zoom Meeting",
      isVirtual: true,
      status: "conflict",
      notes: "Review portfolio and design process",
      conflicts: ["interviewer_busy"],
      candidateConfirmed: true,
      interviewersConfirmed: []
    },
    {
      id: 3,
      candidate: "Alex Rodriguez",
      position: "Product Manager",
      type: "Final Interview",
      date: "2024-01-21",
      time: "11:30 AM",
      duration: "1.5 hours",
      interviewers: [4, 1], // David Kim, Sarah Wilson
      panelId: 3,
      location: "Conference Room B",
      isVirtual: false,
      status: "conflict",
      notes: "Final round with leadership team",
      conflicts: ["interviewer_busy", "candidate_unavailable"],
      candidateConfirmed: false,
      interviewersConfirmed: [4]
    },
    {
      id: 4,
      candidate: "Maria Garcia",
      position: "Data Scientist",
      type: "Phone Screening",
      date: "2024-01-19",
      time: "3:00 PM",
      duration: "30 minutes",
      interviewers: [1], // Sarah Wilson
      panelId: null,
      location: "Phone Call",
      isVirtual: true,
      status: "completed",
      notes: "Initial screening completed successfully",
      conflicts: [],
      candidateConfirmed: true,
      interviewersConfirmed: [1]
    }
  ];

  // Time slots for today
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  // Conflict detection function
  const detectConflicts = (interview) => {
    const conflicts = [];
    const date = interview.date;
    const time = interview.time;
    
    // Check interviewer availability
    interview.interviewers.forEach(interviewerId => {
      const interviewer = interviewers.find(i => i.id === interviewerId);
      if (interviewer) {
        const availability = interviewer.availability[date] || [];
        const busySlots = interviewer.busySlots[date] || [];
        
        if (!availability.includes(time)) {
          conflicts.push({
            type: "interviewer_unavailable",
            message: `${interviewer.name} is not available at ${time}`,
            severity: "high"
          });
        }
        
        if (busySlots.includes(time)) {
          conflicts.push({
            type: "interviewer_busy",
            message: `${interviewer.name} has another meeting at ${time}`,
            severity: "medium"
          });
        }
      }
    });
    
    // Check candidate availability
    const candidate = candidateAvailability[interview.candidate];
    if (candidate) {
      const candidateAvail = candidate[date] || [];
      if (!candidateAvail.includes(time)) {
        conflicts.push({
          type: "candidate_unavailable",
          message: `Candidate is not available at ${time}`,
          severity: "high"
        });
      }
    }
    
    return conflicts;
  };

  // Find optimal time slots
  const findOptimalSlots = (date, interviewerIds, candidateName, duration = 60) => {
    const slots = [];
    const candidate = candidateAvailability[candidateName];
    const candidateAvail = candidate ? candidate[date] || [] : timeSlots;
    
    timeSlots.forEach(time => {
      const conflicts = [];
      
      // Check interviewer availability
      interviewerIds.forEach(interviewerId => {
        const interviewer = interviewers.find(i => i.id === interviewerId);
        if (interviewer) {
          const availability = interviewer.availability[date] || [];
          const busySlots = interviewer.busySlots[date] || [];
          
          if (!availability.includes(time)) {
            conflicts.push(`${interviewer.name} unavailable`);
          }
          if (busySlots.includes(time)) {
            conflicts.push(`${interviewer.name} busy`);
          }
        }
      });
      
      // Check candidate availability
      if (!candidateAvail.includes(time)) {
        conflicts.push("Candidate unavailable");
      }
      
      slots.push({
        time,
        available: conflicts.length === 0,
        conflicts
      });
    });
    
    return slots;
  };

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "conflict":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getInterviewTypeColor = (type) => {
    switch (type) {
      case "Technical Interview":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Design Review":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      case "Final Interview":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const getConflictSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const InterviewCard = ({ interview }) => {
    const panel = interviewPanels.find(p => p.id === interview.panelId);
    const interviewerNames = interview.interviewers.map(id => 
      interviewers.find(i => i.id === id)?.name || "Unknown"
    );
    const conflicts = conflictDetection ? detectConflicts(interview) : [];
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {interview.candidate}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(interview.status)}`}>
                {interview.status}
              </span>
              {conflicts.length > 0 && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  {conflicts.length} conflict(s)
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {interview.position}
            </p>
            <div className="flex items-center space-x-1 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded ${getInterviewTypeColor(interview.type)}`}>
                {interview.type}
              </span>
              {panel && (
                <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {panel.name}
                </span>
              )}
            </div>
            <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4" />
                <span>{interview.time} ({interview.duration})</span>
              </div>
              <div className="flex items-center space-x-2">
                {interview.isVirtual ? (
                  <VideoCameraIcon className="h-4 w-4" />
                ) : (
                  <MapPinIcon className="h-4 w-4" />
                )}
                <span>{interview.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserGroupIcon className="h-4 w-4" />
                <span>{interviewerNames.join(", ")}</span>
              </div>
            </div>
            
            {/* Conflict Details */}
            {conflicts.length > 0 && (
              <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                  Conflicts Detected:
                </h4>
                <ul className="text-xs space-y-1">
                  {conflicts.map((conflict, index) => (
                    <li key={index} className={`${getConflictSeverityColor(conflict.severity)}`}>
                      • {conflict.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Confirmation Status */}
            <div className="mt-3 flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <UserIcon className="h-3 w-3" />
                <span className={interview.candidateConfirmed ? "text-green-600" : "text-red-600"}>
                  Candidate: {interview.candidateConfirmed ? "Confirmed" : "Pending"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <UserGroupIcon className="h-3 w-3" />
                <span className={interview.interviewersConfirmed.length === interview.interviewers.length ? "text-green-600" : "text-yellow-600"}>
                  Interviewers: {interview.interviewersConfirmed.length}/{interview.interviewers.length}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedInterview(interview)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded">
              <CheckCircleIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ScheduleModal = ({ interview, onClose }) => {
    const [selectedPanel, setSelectedPanel] = useState(interview?.panelId || null);
    const [selectedDate, setSelectedDate] = useState(interview?.date || "2024-01-20");
    const [selectedTime, setSelectedTime] = useState(interview?.time || "");
    const [selectedInterviewers, setSelectedInterviewers] = useState(interview?.interviewers || []);
    const [candidateName, setCandidateName] = useState(interview?.candidate || "");
    
    const optimalSlots = findOptimalSlots(selectedDate, selectedInterviewers, candidateName);
    const selectedPanelData = interviewPanels.find(p => p.id === selectedPanel);
    
    useEffect(() => {
      if (selectedPanelData) {
        setSelectedInterviewers(selectedPanelData.members);
      }
    }, [selectedPanelData]);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {interview ? "Edit Interview" : "Schedule Interview"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Panel Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Interview Panel
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interviewPanels.map(panel => (
                  <div
                    key={panel.id}
                    onClick={() => setSelectedPanel(panel.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedPanel === panel.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {panel.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {panel.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {panel.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs">
                      <UserGroupIcon className="h-3 w-3" />
                      <span>
                        {panel.members.map(id => 
                          interviewers.find(i => i.id === id)?.name || "Unknown"
                        ).join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            {/* Candidate Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Candidate
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter candidate name"
              />
            </div>
            
            {/* Time Selection with Conflict Detection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {optimalSlots.map(slot => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 rounded-md text-sm font-medium transition-colors relative ${
                      selectedTime === slot.time
                        ? "bg-blue-600 text-white"
                        : slot.available
                        ? slot.conflicts.length === 0
                          ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                    }`}
                  >
                    {slot.time}
                    {slot.conflicts.length > 0 && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">!</span>
                      </div>
                    )}
                    {slot.conflicts.length > 0 && (
                      <div className="text-xs mt-1 text-red-600 dark:text-red-400">
                        {slot.conflicts.length} conflict(s)
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Interviewer Details */}
            {selectedInterviewers.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Interviewers
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedInterviewers.map(id => {
                    const interviewer = interviewers.find(i => i.id === id);
                    if (!interviewer) return null;
                    
                    const availability = interviewer.availability[selectedDate] || [];
                    const busySlots = interviewer.busySlots[selectedDate] || [];
                    const isAvailable = availability.includes(selectedTime);
                    const hasConflict = busySlots.includes(selectedTime);
                    
                    return (
                      <div key={id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {interviewer.name}
                          </h4>
                          <div className="flex items-center space-x-1">
                            {isAvailable ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-red-600" />
                            )}
                            {hasConflict && (
                              <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {interviewer.role} • {interviewer.department}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <EnvelopeIcon className="h-3 w-3" />
                          <span>{interviewer.email}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {interviewer.expertise.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                disabled={!candidateName || !selectedTime || selectedInterviewers.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {interview ? "Update Interview" : "Schedule Interview"}
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
            Interview Scheduling
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Advanced scheduling with conflict detection and panel management
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setConflictDetection(!conflictDetection)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              conflictDetection
                ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            <ShieldCheckIcon className="h-4 w-4" />
            <span>Conflict Detection</span>
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Schedule Interview</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CalendarIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Interviews</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {interviews.filter(i => i.date === "2024-01-20").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {interviews.filter(i => i.date >= "2024-01-20" && i.date <= "2024-01-26").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Conflicts</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {interviews.filter(i => i.status === "conflict").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Panels</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {interviewPanels.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {interviews.filter(i => i.status === "completed").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === "calendar"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            List View
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex items-center space-x-2">
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="all">All Interviews</option>
            <option value="conflicts">Conflicts Only</option>
            <option value="confirmed">Confirmed Only</option>
            <option value="pending">Pending Confirmation</option>
          </select>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  January 2024
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = i - 6 + 1;
                    const isToday = date === 20;
                    const hasInterview = [19, 20, 21, 22].includes(date);
                    const hasConflict = interviews.some(interview => 
                      interview.date === `2024-01-${date.toString().padStart(2, "0")}` && 
                      interview.status === "conflict"
                    );
                    
                    return (
                      <div
                        key={i}
                        className={`p-2 text-center text-sm cursor-pointer rounded relative ${
                          date < 1 || date > 31
                            ? "text-gray-300 dark:text-gray-600"
                            : isToday
                            ? "bg-blue-600 text-white"
                            : hasInterview
                            ? hasConflict
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {date > 0 && date <= 31 ? date : ""}
                        {hasConflict && (
                          <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-bold">!</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Today's Schedule
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {interviews
                    .filter(i => i.date === "2024-01-20")
                    .map(interview => {
                      const conflicts = conflictDetection ? detectConflicts(interview) : [];
                      
                      return (
                        <div key={interview.id} className={`border-l-4 pl-4 ${conflicts.length > 0 ? "border-red-500" : "border-blue-500"}`}>
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              {interview.candidate}
                            </h3>
                            {conflicts.length > 0 && (
                              <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded">
                                {conflicts.length} conflict(s)
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {interview.time} - {interview.type}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {interview.location}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews
            .filter(interview => {
              if (availabilityFilter === "all") return true;
              if (availabilityFilter === "conflicts") return interview.status === "conflict";
              if (availabilityFilter === "confirmed") return interview.status === "confirmed";
              if (availabilityFilter === "pending") return interview.status === "scheduled";
              return true;
            })
            .map(interview => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
        </div>
      )}

      {/* Interview Panels Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Interview Panels
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {interviewPanels.map(panel => (
              <div key={panel.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {panel.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {panel.duration}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {panel.description}
                </p>
                <div className="space-y-2">
                  {panel.members.map(id => {
                    const interviewer = interviewers.find(i => i.id === id);
                    return interviewer ? (
                      <div key={id} className="flex items-center space-x-2 text-sm">
                        <div className="h-6 w-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <span className="text-xs text-blue-600 dark:text-blue-300">
                            {interviewer.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {interviewer.name}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Available Time Slots */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Available Time Slots (Today)
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {timeSlots.map(time => {
              const isBooked = interviews.some(i => i.time === time && i.date === "2024-01-20");
              const hasConflict = interviews.some(i => 
                i.time === time && i.date === "2024-01-20" && i.status === "conflict"
              );
              
              return (
                <button
                  key={time}
                  disabled={isBooked}
                  className={`p-3 rounded-md text-sm font-medium transition-colors relative ${
                    isBooked
                      ? hasConflict
                        ? "bg-red-100 text-red-800 cursor-not-allowed dark:bg-red-900 dark:text-red-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                      : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800"
                  }`}
                >
                  {time}
                  {isBooked && (
                    <div className="text-xs mt-1">
                      {hasConflict ? "Conflict" : "Booked"}
                    </div>
                  )}
                  {hasConflict && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">!</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showScheduleModal && (
        <ScheduleModal 
          interview={null} 
          onClose={() => setShowScheduleModal(false)}
        />
      )}
      
      {selectedInterview && (
        <ScheduleModal 
          interview={selectedInterview} 
          onClose={() => setSelectedInterview(null)}
        />
      )}
    </div>
  );
};

export default InterviewScheduling; 