# QubitHire Dashboard Wireframe - Design Notes

## 📋 Wireframe Overview

This wireframe represents the structural layout for the **QubitHire AI-powered recruitment dashboard**. It's designed as a low-fidelity mockup for design team review before development.

## 🎯 Product Context

**Product Name:** QubitHire  
**Target Users:** HR teams, recruiters, and hiring managers  
**Core Purpose:** AI-powered recruitment automation and candidate management  

## 🏗️ Layout Structure

### Header (Top Bar)
- **Left:** Page title/breadcrumb navigation
- **Center:** Global search functionality  
- **Right:** Notifications, dark mode toggle, user profile
- **Status Bar:** System status and key metrics summary

### Sidebar Navigation (Left)
- **Logo Area:** QubitHire branding
- **Main Navigation:** 10 core feature modules
- **Quick Stats Widget:** Today's progress summary
- **Help Section:** Support access

### Main Content Area (Center/Right)
- **Metrics Row:** 4 key performance indicators
- **Two-Column Layout:**
  - **Left (2/3):** Primary workflow sections
  - **Right (1/3):** Secondary widgets and quick actions

## 📊 Feature Mapping

### Core Features Represented:

#### 1. **Resume Screening & AI Analysis**
- Upload area for resume batch processing
- Job position selection interface
- AI processing status indicators
- Results table with candidate scoring

#### 2. **Interview Scheduling & Management**
- Calendar view for interview slots
- Interview list with details
- Scheduling interface

#### 3. **Candidate Management**
- Top candidates showcase
- Candidate pipeline tracking
- Detailed candidate profiles

#### 4. **Offer Management**  
- Pending offers tracker
- Offer status monitoring
- Quick action buttons

#### 5. **Email Communication**
- Inbox management
- Template library
- Scheduled email queue

#### 6. **Document & BGV Management**
- Document storage counters
- Background verification status
- Verification progress tracking

#### 7. **Analytics & Reporting**
- Hiring funnel visualization
- Department performance metrics
- Candidate source analysis

#### 8. **Activity Feed**
- Real-time recruitment activities
- Score-based candidate updates
- System notifications

## 📱 Responsive Design Notes

### Desktop (1024px+)
- Full sidebar visible
- Three-column layout in main area
- All widgets displayed simultaneously

### Tablet (768px - 1023px)
- Sidebar collapses to icons
- Two-column main layout
- Some widgets stack vertically

### Mobile (< 768px)
- Hamburger menu navigation
- Single-column stacked layout
- Simplified widget views
- Bottom navigation consideration

## 🎨 Visual Design Principles

### Wireframe Characteristics:
- **Gray box placeholders** for clear structural focus
- **Dashed borders** to indicate interactive areas
- **Minimal color** (only for status and organization)
- **Clear labeling** for all functional areas
- **Consistent spacing** using Tailwind grid system

### Information Hierarchy:
1. **Primary:** Key metrics and active workflows
2. **Secondary:** Supporting widgets and quick actions  
3. **Tertiary:** System status and help information

## 🔄 User Flow Considerations

### Primary Workflows:
1. **Resume Upload → AI Analysis → Candidate Review**
2. **Interview Scheduling → Calendar Management → Confirmations**
3. **Offer Generation → Approval → Communication**
4. **Email Template → Candidate Communication → Follow-up**

### Quick Actions:
- One-click access to common tasks
- Dashboard-level status monitoring
- Direct navigation to detailed views

## 📏 Technical Specifications

### Grid System:
- **12-column CSS Grid** for main layout
- **4-column metrics** on desktop
- **3-column content** distribution
- **Flexible responsive** breakpoints

### Component Structure:
```
Dashboard
├── Sidebar (Navigation + Stats)
├── Header (Search + User Actions)
├── Main Content
│   ├── Metrics Row (4 cards)
│   ├── Primary Content (2/3 width)
│   │   ├── Resume Screening
│   │   ├── Interview Management  
│   │   └── Activity Feed
│   └── Secondary Widgets (1/3 width)
│       ├── Top Candidates
│       ├── Offer Management
│       ├── Email Communication
│       └── Document Management
└── Analytics Preview (Full width)
```

## ✅ Next Steps

### For Design Team:
1. **Review layout structure** and component placement
2. **Validate user workflows** and information hierarchy  
3. **Plan visual design system** (colors, typography, spacing)
4. **Create high-fidelity mockups** based on this wireframe

### For Development Team:
1. **Confirm technical feasibility** of layout structure
2. **Plan component architecture** and data flow
3. **Estimate development effort** for each section
4. **Identify API requirements** for real-time data

### For Product Team:
1. **Validate feature prioritization** in the layout
2. **Confirm user workflow assumptions**
3. **Plan feature rollout phases** based on complexity
4. **Gather stakeholder feedback** on structure

---

**File Location:** `screening_agent/dashboard/wireframe.html`  
**Preview:** Open the HTML file in any browser to see the interactive wireframe  
**Framework:** HTML + TailwindCSS (responsive, production-ready structure) 