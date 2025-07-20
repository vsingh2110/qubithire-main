# QubitHire Next.js Dashboard - Comprehensive Refactoring Plan

## 📊 Current State Analysis

### **Issues Identified:**
1. **Monolithic Pages** - Each page has 400-500+ lines of code
2. **No Component Separation** - All logic mixed in page files
3. **No State Management** - Using local useState everywhere
4. **No API Layer** - Mock data scattered in components
5. **No Business Logic Separation** - Everything in UI components
6. **No Type Safety** - Missing proper TypeScript interfaces
7. **No Reusable Components** - Duplicate code across pages
8. **No Error Handling** - Missing proper error boundaries
9. **No Loading States** - Inconsistent loading patterns
10. **No Caching Strategy** - No data persistence

### **Current Structure:**
```
src/
├── app/                    # Next.js pages (400-500 lines each)
│   ├── page.tsx (509 lines)
│   ├── candidates/page.tsx (~400 lines)
│   ├── interviews/page.tsx (~500 lines)
│   ├── offers/page.tsx (~400 lines)
│   ├── reports/page.tsx (~400 lines)
│   ├── admin/page.tsx (~400 lines)
│   └── ... (other pages)
└── components/             # Only 5 basic components
    ├── Header.tsx
    ├── NavigationBar.tsx
    ├── Sidebar.tsx
    ├── DashboardLayout.tsx
    └── TabDropdown.tsx
```

## 🏗️ Proposed New Structure

### **Complete Folder Structure:**
```
src/
├── app/                    # Next.js pages (minimal, just routing)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── candidates/
│   │   └── page.tsx       # Just imports and basic layout
│   ├── interviews/
│   │   └── page.tsx
│   ├── offers/
│   │   └── page.tsx
│   ├── reports/
│   │   └── page.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   ├── system-preferences/
│   │   └── page.tsx
│   ├── communication/
│   │   └── page.tsx
│   ├── documents/
│   │   └── page.tsx
│   ├── jd-enhancement/
│   │   └── page.tsx
│   ├── resume-screening/
│   │   └── page.tsx
│   └── analytics/
│       └── page.tsx
├── components/             # Reusable UI components
│   ├── ui/               # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Modal.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Tabs.tsx
│   │   ├── Pagination.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── index.ts
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── NavigationBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── forms/            # Form components
│   │   ├── FormField.tsx
│   │   ├── FormSection.tsx
│   │   ├── FormActions.tsx
│   │   ├── SearchForm.tsx
│   │   ├── FilterForm.tsx
│   │   └── index.ts
│   ├── tables/           # Table components
│   │   ├── DataTable.tsx
│   │   ├── TableHeader.tsx
│   │   ├── TableRow.tsx
│   │   ├── TableCell.tsx
│   │   ├── TablePagination.tsx
│   │   ├── TableFilters.tsx
│   │   └── index.ts
│   ├── modals/           # Modal components
│   │   ├── BaseModal.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── FormModal.tsx
│   │   ├── DetailModal.tsx
│   │   └── index.ts
│   ├── charts/           # Chart components
│   │   ├── PieChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── LineChart.tsx
│   │   ├── DonutChart.tsx
│   │   └── index.ts
│   └── features/         # Feature-specific components
│       ├── candidates/
│       │   ├── CandidateCard.tsx
│       │   ├── CandidateFilters.tsx
│       │   ├── CandidateModal.tsx
│       │   ├── CandidateStats.tsx
│       │   ├── JDMatcher.tsx
│       │   ├── CandidateList.tsx
│       │   ├── CandidateDetail.tsx
│       │   └── index.ts
│       ├── interviews/
│       │   ├── InterviewCard.tsx
│       │   ├── InterviewCalendar.tsx
│       │   ├── InterviewModal.tsx
│       │   ├── InterviewFilters.tsx
│       │   ├── InterviewStats.tsx
│       │   ├── PanelSelector.tsx
│       │   ├── ConflictDetector.tsx
│       │   └── index.ts
│       ├── offers/
│       │   ├── OfferCard.tsx
│       │   ├── OfferModal.tsx
│       │   ├── OfferFilters.tsx
│       │   ├── OfferStats.tsx
│       │   ├── ApprovalFlow.tsx
│       │   ├── ExpiryTracker.tsx
│       │   └── index.ts
│       ├── reports/
│       │   ├── ReportCard.tsx
│       │   ├── ReportGenerator.tsx
│       │   ├── ReportFilters.tsx
│       │   ├── SavedSearches.tsx
│       │   ├── ExportOptions.tsx
│       │   └── index.ts
│       ├── admin/
│       │   ├── UserCard.tsx
│       │   ├── RoleCard.tsx
│       │   ├── UserModal.tsx
│       │   ├── RoleModal.tsx
│       │   ├── PermissionManager.tsx
│       │   ├── AuditLog.tsx
│       │   └── index.ts
│       ├── settings/
│       │   ├── AutomationToggle.tsx
│       │   ├── JobAutomationCard.tsx
│       │   ├── DepartmentAutomationCard.tsx
│       │   ├── SecuritySettings.tsx
│       │   ├── IntegrationSettings.tsx
│       │   └── index.ts
│       ├── communication/
│       │   ├── EmailCard.tsx
│       │   ├── TemplateCard.tsx
│       │   ├── ComposeModal.tsx
│       │   ├── EmailFilters.tsx
│       │   ├── TemplateEditor.tsx
│       │   └── index.ts
│       ├── documents/
│       │   ├── DocumentCard.tsx
│       │   ├── DocumentUpload.tsx
│       │   ├── BGVVendorCard.tsx
│       │   ├── DocumentFilters.tsx
│       │   ├── ShareModal.tsx
│       │   └── index.ts
│       ├── jd-enhancement/
│       │   ├── EnhancementModeCard.tsx
│       │   ├── AnalysisCard.tsx
│       │   ├── TemplateSelector.tsx
│       │   ├── AIEnhancer.tsx
│       │   └── index.ts
│       └── resume-screening/
│           ├── CandidateCard.tsx
│           ├── ScreeningProcess.tsx
│           ├── UploadSection.tsx
│           ├── ResultsSection.tsx
│           ├── AIScreening.tsx
│           └── index.ts
├── lib/                   # Utilities and helpers
│   ├── utils.ts          # General utilities
│   ├── constants.ts      # App constants
│   ├── validators.ts     # Form validation
│   ├── formatters.ts     # Data formatting
│   ├── dateUtils.ts      # Date handling
│   ├── fileUtils.ts      # File handling
│   └── index.ts
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   ├── useForm.ts
│   ├── usePagination.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useWindowSize.ts
│   └── index.ts
├── services/              # API services
│   ├── api/
│   │   ├── base.ts       # Base API configuration
│   │   ├── candidates.ts
│   │   ├── interviews.ts
│   │   ├── offers.ts
│   │   ├── reports.ts
│   │   ├── admin.ts
│   │   ├── settings.ts
│   │   ├── communication.ts
│   │   ├── documents.ts
│   │   ├── jd-enhancement.ts
│   │   ├── resume-screening.ts
│   │   └── index.ts
│   ├── http.ts           # Axios instance
│   ├── types.ts          # API response types
│   ├── mockData.ts       # Mock data for development
│   └── index.ts
├── stores/                # State management (Zustand)
│   ├── authStore.ts
│   ├── candidateStore.ts
│   ├── interviewStore.ts
│   ├── offerStore.ts
│   ├── reportStore.ts
│   ├── adminStore.ts
│   ├── settingsStore.ts
│   ├── uiStore.ts        # UI state (sidebar, modals, etc.)
│   └── index.ts
├── types/                 # TypeScript interfaces
│   ├── candidate.ts
│   ├── interview.ts
│   ├── offer.ts
│   ├── report.ts
│   ├── admin.ts
│   ├── settings.ts
│   ├── communication.ts
│   ├── document.ts
│   ├── jd.ts
│   ├── resume.ts
│   ├── api.ts
│   ├── ui.ts
│   └── index.ts
├── constants/             # App constants
│   ├── routes.ts
│   ├── status.ts
│   ├── permissions.ts
│   ├── departments.ts
│   ├── jobTypes.ts
│   ├── interviewTypes.ts
│   └── index.ts
└── utils/                 # Utility functions
    ├── api.ts
    ├── formatting.ts
    ├── helpers.ts
    ├── validation.ts
    └── index.ts
```

## 🎯 State Management Strategy

### **Zustand Store Structure:**

#### **1. Auth Store (`stores/authStore.ts`)**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}
```

#### **2. Candidate Store (`stores/candidateStore.ts`)**
```typescript
interface CandidateState {
  candidates: Candidate[];
  filteredCandidates: Candidate[];
  selectedCandidate: Candidate | null;
  filters: CandidateFilters;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCandidates: () => Promise<void>;
  addCandidate: (candidate: Candidate) => Promise<void>;
  updateCandidate: (id: string, data: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
  setFilters: (filters: CandidateFilters) => void;
  clearFilters: () => void;
}
```

#### **3. Interview Store (`stores/interviewStore.ts`)**
```typescript
interface InterviewState {
  interviews: Interview[];
  interviewers: Interviewer[];
  panels: InterviewPanel[];
  conflicts: InterviewConflict[];
  isLoading: boolean;
  
  // Actions
  fetchInterviews: () => Promise<void>;
  scheduleInterview: (interview: Interview) => Promise<void>;
  detectConflicts: (interview: Interview) => InterviewConflict[];
  findOptimalSlots: (date: string, interviewerIds: number[]) => TimeSlot[];
}
```

#### **4. UI Store (`stores/uiStore.ts`)**
```typescript
interface UIState {
  sidebarOpen: boolean;
  darkMode: boolean;
  activeModal: string | null;
  notifications: Notification[];
  
  // Actions
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}
```

## 🔧 Component Breakdown Strategy

### **Example: Candidates Page Breakdown**

#### **Current (Monolithic):**
```typescript
// src/app/candidates/page.tsx (400+ lines)
const Candidates = () => {
  // All state, logic, and UI in one file
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({});
  // ... 400+ lines of mixed logic and UI
};
```

#### **After Refactoring:**
```typescript
// src/app/candidates/page.tsx (20 lines)
import { CandidateList } from '@/components/features/candidates';
import { useCandidateStore } from '@/stores/candidateStore';

const CandidatesPage = () => {
  const { candidates, isLoading, error } = useCandidateStore();
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;
  
  return <CandidateList candidates={candidates} />;
};
```

```typescript
// src/components/features/candidates/CandidateList.tsx
import { CandidateCard, CandidateFilters, CandidateStats } from './';

const CandidateList = ({ candidates }) => {
  return (
    <div>
      <CandidateStats />
      <CandidateFilters />
      <div className="grid gap-4">
        {candidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};
```

## 🚀 Implementation Phases

### **Phase 1: Foundation (Week 1)**
1. **Set up folder structure**
   - Create all directories
   - Move existing files to new structure
   - Update imports

2. **Install dependencies**
   ```bash
   npm install zustand @tanstack/react-query axios
   npm install -D @types/node
   ```

3. **Create basic UI components**
   - Button, Input, Select, Modal, Card
   - Form components
   - Table components

4. **Set up Zustand stores**
   - Auth store
   - UI store
   - Basic feature stores

### **Phase 2: Component Extraction (Week 2-3)**
1. **Break down Candidates page**
   - Extract CandidateCard component
   - Extract CandidateFilters component
   - Extract CandidateModal component
   - Create CandidateStats component

2. **Break down Interviews page**
   - Extract InterviewCard component
   - Extract InterviewCalendar component
   - Extract InterviewModal component
   - Extract ConflictDetector component

3. **Break down Offers page**
   - Extract OfferCard component
   - Extract ApprovalFlow component
   - Extract ExpiryTracker component

4. **Break down Reports page**
   - Extract ReportCard component
   - Extract ReportGenerator component
   - Extract SavedSearches component

### **Phase 3: State Management (Week 4)**
1. **Connect components to stores**
   - Replace useState with Zustand stores
   - Add proper loading states
   - Add error handling

2. **Implement API layer**
   - Create API services
   - Add proper error handling
   - Add request/response interceptors

3. **Add caching strategy**
   - Implement React Query for server state
   - Add optimistic updates
   - Add offline support

### **Phase 4: Optimization (Week 5)**
1. **Performance optimization**
   - Add React.memo for components
   - Implement virtual scrolling for large lists
   - Add lazy loading

2. **Error handling**
   - Add error boundaries
   - Implement retry mechanisms
   - Add proper error messages

3. **Testing**
   - Add unit tests for components
   - Add integration tests for stores
   - Add E2E tests for critical flows

## 📋 Detailed Component Breakdown

### **Candidates Feature Components:**

#### **1. CandidateCard.tsx**
```typescript
interface CandidateCardProps {
  candidate: Candidate;
  onEdit?: (candidate: Candidate) => void;
  onDelete?: (id: string) => void;
  onView?: (candidate: Candidate) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onEdit,
  onDelete,
  onView
}) => {
  // Component logic
};
```

#### **2. CandidateFilters.tsx**
```typescript
interface CandidateFiltersProps {
  filters: CandidateFilters;
  onFiltersChange: (filters: CandidateFilters) => void;
  departments: Department[];
  jobTypes: JobType[];
}

const CandidateFilters: React.FC<CandidateFiltersProps> = ({
  filters,
  onFiltersChange,
  departments,
  jobTypes
}) => {
  // Filter logic
};
```

#### **3. CandidateModal.tsx**
```typescript
interface CandidateModalProps {
  candidate?: Candidate;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CandidateFormData) => Promise<void>;
}

const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onSubmit
}) => {
  // Modal logic
};
```

### **Interviews Feature Components:**

#### **1. InterviewCard.tsx**
```typescript
interface InterviewCardProps {
  interview: Interview;
  onEdit?: (interview: Interview) => void;
  onCancel?: (id: string) => void;
  onReschedule?: (interview: Interview) => void;
}

const InterviewCard: React.FC<InterviewCardProps> = ({
  interview,
  onEdit,
  onCancel,
  onReschedule
}) => {
  // Component logic
};
```

#### **2. InterviewCalendar.tsx**
```typescript
interface InterviewCalendarProps {
  interviews: Interview[];
  onDateSelect: (date: Date) => void;
  onInterviewSelect: (interview: Interview) => void;
  conflicts: InterviewConflict[];
}

const InterviewCalendar: React.FC<InterviewCalendarProps> = ({
  interviews,
  onDateSelect,
  onInterviewSelect,
  conflicts
}) => {
  // Calendar logic
};
```

## 🔄 Migration Strategy

### **Step 1: Create New Structure**
1. Create all new folders
2. Move existing components to new locations
3. Update import paths

### **Step 2: Extract Components**
1. Start with one page (e.g., Candidates)
2. Extract components one by one
3. Test each component in isolation

### **Step 3: Implement State Management**
1. Create Zustand stores
2. Replace useState with store state
3. Connect components to stores

### **Step 4: Add API Layer**
1. Create API services
2. Replace mock data with API calls
3. Add proper error handling

### **Step 5: Optimize**
1. Add performance optimizations
2. Add proper loading states
3. Add error boundaries

## 📊 Benefits After Refactoring

### **1. Maintainability**
- ✅ Smaller, focused components
- ✅ Clear separation of concerns
- ✅ Reusable components
- ✅ Easy to test individual components

### **2. Performance**
- ✅ Better code splitting
- ✅ Optimized re-renders
- ✅ Lazy loading capabilities
- ✅ Efficient state management

### **3. Developer Experience**
- ✅ Better TypeScript support
- ✅ Clear folder structure
- ✅ Easy to find and modify code
- ✅ Consistent patterns

### **4. Scalability**
- ✅ Easy to add new features
- ✅ Modular architecture
- ✅ Clear API contracts
- ✅ Extensible state management

## 🎯 Success Metrics

### **Code Quality**
- [ ] Reduce average file size from 400+ lines to <100 lines
- [ ] Achieve 80%+ component reusability
- [ ] Maintain 90%+ TypeScript coverage
- [ ] Zero prop drilling issues

### **Performance**
- [ ] Reduce bundle size by 30%
- [ ] Improve initial load time by 40%
- [ ] Achieve 90+ Lighthouse score
- [ ] Zero memory leaks

### **Developer Experience**
- [ ] Reduce time to add new features by 50%
- [ ] Achieve 95%+ test coverage
- [ ] Zero build errors
- [ ] Consistent code patterns

---

**Last Updated**: 2025-01-19
**Status**: Planning Phase
**Next Review**: 2025-01-20
**Priority**: High 