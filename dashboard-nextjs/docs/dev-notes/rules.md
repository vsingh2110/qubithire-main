# General Development Rules & Best Practices

## 🎯 Core Principles

### 1. Quality First
- **ALWAYS** write clean, readable code
- **ALWAYS** add proper comments for complex logic
- **ALWAYS** follow established patterns
- **NEVER** sacrifice quality for speed

### 2. Testing & Validation
- **ALWAYS** test before deployment
- **ALWAYS** validate user inputs
- **ALWAYS** handle edge cases
- **NEVER** assume code works without testing

### 3. Documentation
- **ALWAYS** document complex functions
- **ALWAYS** update work log with changes
- **ALWAYS** explain why, not just what
- **NEVER** leave undocumented code

## 📝 Code Standards

### TypeScript Rules
```typescript
// ✅ GOOD - Proper typing
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = (id: number): User | null => {
  // Implementation
};

// ❌ BAD - Missing types
const getUser = (id) => {
  // Implementation
};
```

### Component Structure
```typescript
// ✅ GOOD - Proper component structure
'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

const ComponentContent: React.FC<ComponentProps> = ({ title, onAction }) => {
  const searchParams = useSearchParams();
  return <div>{title}</div>;
};

const Component: React.FC<ComponentProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentContent {...props} />
    </Suspense>
  );
};

export default Component;
```

## 🚨 Common Mistakes to Avoid

### 1. Next.js 15 Specific
- ❌ Using `useSearchParams()` without Suspense boundary
- ❌ Missing TypeScript types for function parameters
- ❌ Not testing build before deployment
- ❌ Using deprecated experimental features

### 2. React Patterns
- ❌ Not handling loading states
- ❌ Missing error boundaries
- ❌ Poor component organization
- ❌ Inconsistent naming conventions

### 3. TypeScript Issues
- ❌ Using `any` type
- ❌ Missing interface definitions
- ❌ Not typing function parameters
- ❌ Ignoring TypeScript errors

## ✅ Best Practices

### File Organization
```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── [feature]/         # Feature pages
│       └── page.tsx
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   └── features/         # Feature-specific components
└── types/                # TypeScript type definitions
```

### Naming Conventions
- **Files**: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- **Components**: `PascalCase` (e.g., `UserProfile`)
- **Functions**: `camelCase` (e.g., `getUserData`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_ENDPOINTS`)
- **Interfaces**: `PascalCase` with `I` prefix (e.g., `IUserData`)

### Import Organization
```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Next.js imports
import { useRouter } from 'next/navigation';

// 3. Third-party libraries
import { Heroicons } from '@heroicons/react';

// 4. Local imports
import { UserProfile } from '@/components/UserProfile';
import { IUser } from '@/types/user';
```

## 🔄 Development Workflow

### Before Coding
1. **Check existing patterns** in the codebase
2. **Review similar components** for consistency
3. **Plan the component structure** before writing
4. **Consider edge cases** and error states

### During Development
1. **Follow established patterns** strictly
2. **Add proper TypeScript types** immediately
3. **Handle loading and error states**
4. **Test frequently** during development

### Before Deployment
1. **Run `npm run build`** to check for errors
2. **Fix all TypeScript errors** before committing
3. **Test all functionality** thoroughly
4. **Update documentation** with changes

## 📚 Documentation Standards

### Code Comments
```typescript
/**
 * Fetches user data from the API
 * @param userId - The unique identifier for the user
 * @returns Promise<User> - The user data
 * @throws Error - If user is not found
 */
const fetchUserData = async (userId: number): Promise<User> => {
  // Implementation
};
```

### Component Documentation
```typescript
/**
 * UserProfile component displays user information
 * 
 * @param user - User data to display
 * @param onEdit - Callback when edit button is clicked
 * @param isEditable - Whether the profile can be edited
 */
interface UserProfileProps {
  user: User;
  onEdit?: () => void;
  isEditable?: boolean;
}
```

## 🎯 Quality Checklist

### Code Quality
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Proper error handling
- [ ] Loading states implemented
- [ ] Consistent naming conventions
- [ ] Proper component structure

### Performance
- [ ] No unnecessary re-renders
- [ ] Proper memoization where needed
- [ ] Optimized bundle size
- [ ] Fast loading times

### Accessibility
- [ ] Proper ARIA labels
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color contrast compliance

## 🔄 Continuous Improvement

### This document will be updated with:
- **New rules** as we encounter issues
- **Best practices** discovered during development
- **Common mistakes** to avoid
- **Team suggestions** and improvements
- **Lessons learned** from deployments

### Update Process
1. **Add new rules** at the top of relevant sections
2. **Include real examples** from the codebase
3. **Cross-reference** with work logs
4. **Date stamp** all new additions

---

**Last Updated**: 2025-07-16
**Next Review**: 2025-07-17
**Status**: Active Development 