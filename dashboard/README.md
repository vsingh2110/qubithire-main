# QubitHire Dashboard

A modern, responsive React + TailwindCSS dashboard for the QubitHire AI-powered recruitment system.

## 🚀 Features

### Core Modules
- **📊 Dashboard Overview** - Real-time metrics and activity feed
- **📝 Resume Screening** - AI-powered resume analysis and ranking
- **👥 Candidate Management** - Complete candidate lifecycle tracking
- **📅 Interview Scheduling** - Calendar integration and scheduling
- **💼 Offer Management** - Automated offer letter generation
- **📧 Email Communication** - Template-based email automation
- **📁 Document Management** - Resume and document organization
- **📈 Analytics & Insights** - Recruitment performance metrics
- **⚙️ Settings** - System configuration and preferences

### Technical Features
- **🎨 Modern UI/UX** - Clean, professional interface design
- **🌙 Dark Mode** - Built-in dark/light theme toggle
- **📱 Responsive Design** - Mobile-first responsive layout
- **🔍 Advanced Search** - Smart filtering and search capabilities
- **📊 Data Visualization** - Charts and metrics dashboard
- **🚀 Performance Optimized** - Fast loading and smooth interactions

## 🛠️ Technologies Used

- **Frontend Framework:** React 18.x
- **Styling:** TailwindCSS 3.x
- **Routing:** React Router 6.x
- **Icons:** Heroicons
- **Build Tool:** Create React App
- **State Management:** React Hooks (useState, useEffect)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd screening_agent/dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   └── Header.jsx      # Top navigation header
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── ResumeScreening.jsx
│   │   ├── CandidateManagement.jsx
│   │   ├── InterviewScheduling.jsx
│   │   ├── OfferManagement.jsx
│   │   ├── EmailCommunication.jsx
│   │   ├── DocumentManagement.jsx
│   │   ├── Analytics.jsx
│   │   └── Settings.jsx
│   ├── App.jsx             # Main app component
│   └── App.css            # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # TailwindCSS configuration
└── README.md             # This file
```

## 🎯 Key Components

### Dashboard Overview
- **Real-time Metrics:** Live candidate and job statistics
- **Activity Feed:** Recent screening, interview, and offer activities
- **Quick Actions:** Fast access to common tasks
- **Top Candidates:** Highest-scoring candidate showcase

### Resume Screening
- **AI Analysis:** Automated resume parsing and scoring
- **Job Matching:** Skills and requirements alignment
- **Bulk Processing:** Handle multiple resumes simultaneously
- **Filtering System:** Advanced search and filter options

### Candidate Management
- **360° View:** Complete candidate profiles and history
- **Pipeline Tracking:** Visual status progression
- **Communication Log:** All interactions and notes
- **Document Storage:** Centralized file management

### Interview Scheduling
- **Calendar Integration:** Visual scheduling interface
- **Multi-interviewer Support:** Panel interview coordination
- **Automated Reminders:** Email notifications
- **Virtual Meeting Links:** Video conference integration

## 🎨 UI/UX Features

### Design System
- **Consistent Colors:** Professional blue/purple gradient theme
- **Typography:** Clean, readable font hierarchy
- **Spacing:** Consistent padding and margins
- **Shadows:** Subtle depth and elevation

### Interactive Elements
- **Hover Effects:** Smooth transitions and feedback
- **Loading States:** Progress indicators and animations
- **Modal Dialogs:** Contextual information overlays
- **Toast Notifications:** User feedback system

### Responsive Design
- **Mobile First:** Optimized for all screen sizes
- **Touch Friendly:** Large tap targets and gestures
- **Adaptive Layout:** Flexible grid systems
- **Performance:** Optimized for mobile networks

## 📊 Data Integration

### Mock Data Structure
The dashboard uses realistic mock data for demonstration:

```javascript
// Example candidate data
{
  id: 1,
  name: 'John Smith',
  email: 'john.smith@email.com',
  position: 'Senior React Developer',
  score: 94,
  status: 'interview-scheduled',
  skills: ['React', 'Node.js', 'TypeScript'],
  // ... additional fields
}
```

### API Integration Points
Ready for backend integration:
- REST API endpoints
- Real-time WebSocket connections
- File upload handling
- Authentication integration

## 🔧 Customization

### Theme Customization
Edit `tailwind.config.js` to modify:
- Color palette
- Font families
- Spacing scale
- Animation timing

### Component Customization
All components are modular and easily customizable:
- Props-based configuration
- CSS class composition
- Conditional rendering
- State management

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify:** Static hosting with CI/CD
- **Vercel:** Optimized React deployment
- **AWS S3:** Scalable static hosting
- **Docker:** Containerized deployment

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time notifications
- [ ] Advanced chart integration (Chart.js/D3)
- [ ] Drag-and-drop kanban boards
- [ ] Video interview integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Role-based access control
- [ ] API documentation

### Technical Improvements
- [ ] TypeScript migration
- [ ] Unit test coverage
- [ ] Performance monitoring
- [ ] Progressive Web App features
- [ ] Accessibility improvements
- [ ] State management optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TailwindCSS** for the utility-first CSS framework
- **Heroicons** for the beautiful icon set
- **React Team** for the amazing frontend framework
- **QubitHire Team** for the comprehensive feature requirements

---

**Built with ❤️ for modern HR teams** 