# Development Notes & Rules

## 🚨 CRITICAL RULES - ALWAYS FOLLOW

### 1. Next.js 15 Deployment Rules
- **ALWAYS wrap `useSearchParams()` in Suspense boundary**
- **NEVER use `useSearchParams()` directly in component**
- **ALWAYS add proper TypeScript types for function parameters**
- **ALWAYS test build before deployment**

### 2. Component Structure Rules
- **ALWAYS use 'use client' directive for client components**
- **ALWAYS import React and necessary hooks**
- **ALWAYS add proper TypeScript interfaces**
- **ALWAYS handle loading states**

### 3. File Organization Rules
- **ALWAYS follow Next.js 13+ app directory structure**
- **ALWAYS use proper file naming conventions**
- **ALWAYS organize imports properly**
- **ALWAYS add proper exports**

## 📁 Project Structure

```
dashboard-nextjs/
├── docs/
│   └── dev-notes/
│       ├── dev-notes.md (this file)
│       ├── rules.md (general development rules)
│       └── work-log/
│           ├── YYYY-MM-DD-topic.md (daily work logs)
│           └── work-log.md (master work log)
├── src/
│   ├── app/ (Next.js 13+ app directory)
│   └── components/
└── public/
```

## 🔄 Continuous Development Process

### **IMPORTANT: This document will be continuously updated**
- **New rules will be added as we encounter issues**
- **Mistakes and warnings will be documented here**
- **Suggestions and improvements will be recorded**
- **All team inputs will be incorporated**

### Development Workflow
1. **Before coding**: Check this document for relevant rules
2. **During development**: Follow established patterns
3. **After completion**: Update this document with lessons learned
4. **Before deployment**: Run through checklist

## 🚨 Common Mistakes to Avoid

### Next.js 15 Specific
- ❌ Using `useSearchParams()` without Suspense
- ❌ Missing TypeScript types
- ❌ Not testing build before deployment
- ❌ Using deprecated experimental features

### General Development
- ❌ Not following established patterns
- ❌ Missing error handling
- ❌ Poor component organization
- ❌ Inconsistent naming conventions

## ✅ Best Practices

### Code Quality
- ✅ Write clean, readable code
- ✅ Add proper comments
- ✅ Use TypeScript consistently
- ✅ Follow established patterns

### Testing & Validation
- ✅ Test before deployment
- ✅ Validate user inputs
- ✅ Handle edge cases
- ✅ Check for build errors

### Documentation
- ✅ Update work logs daily
- ✅ Document complex functions
- ✅ Explain why, not just what
- ✅ Keep this document current

## 📝 Daily Work Log Format

### File Naming Convention
```
YYYY-MM-DD-topic.md
```
Examples:
- `2025-07-16-suspense-fix.md`
- `2025-07-16-deployment-issue.md`
- `2025-07-16-new-feature.md`

### Work Log Content Structure
```markdown
# Work Log - YYYY-MM-DD

## 🚨 Issues Encountered
- Problem description
- Solution applied
- Lessons learned

## ✅ Completed Tasks
- Task 1
- Task 2

## 🔧 Technical Changes
- File: path/to/file
- Changes made
- Impact

## 📚 New Rules Added
- Rule 1
- Rule 2

## 🎯 Next Steps
- Action items
- Priority tasks
```

## 🔄 Update Process

### When to Update This Document
1. **New deployment issues** → Add to deployment rules
2. **New TypeScript errors** → Add to TypeScript rules
3. **New component patterns** → Add to component rules
4. **New file organization** → Update structure
5. **New best practices** → Add to best practices
6. **New mistakes** → Add to common mistakes

### How to Update
1. Add new rules at the top of relevant sections
2. Update examples with real code
3. Add date stamps for new rules
4. Cross-reference with work logs

## 🎯 Success Metrics

### Code Quality
- ✅ Zero build errors
- ✅ Zero TypeScript errors
- ✅ Consistent code style
- ✅ Proper error handling

### Development Speed
- ✅ Faster debugging
- ✅ Fewer deployment issues
- ✅ Consistent patterns
- ✅ Better documentation

### Team Collaboration
- ✅ Shared knowledge base
- ✅ Consistent practices
- ✅ Clear guidelines
- ✅ Updated documentation

---

**Last Updated**: 2025-07-16
**Next Review**: 2025-07-17
**Status**: Active Development 