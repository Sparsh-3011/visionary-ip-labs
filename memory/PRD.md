# Visionary IP Labs - Patent & Research Internship Program Website

## Project Overview
A modern, professional, and high-converting website for Visionary IP Labs, promoting their Patent & Research Internship Program and collecting student applications.

**Initiatives By:** H & P Projects and NextGen Care Foundation

---

## Technical Architecture

### Frontend Stack
- React 19.0.0
- TailwindCSS for styling
- Shadcn/UI components
- React Router DOM for navigation
- Axios for API calls
- Sonner for toast notifications

### Backend Stack
- FastAPI (Python)
- MongoDB (Motor async driver)
- Google Sheets API integration
- OAuth 2.0 for Google authentication

---

## Features Implemented (December 2025)

### ✅ Frontend Components
1. **Header** - Sticky navigation with smooth scrolling
2. **Hero Section** - Eye-catching banner with CTA
3. **About Section** - Program introduction with feature cards
4. **Credibility Section** - Mentor credentials and expertise
5. **Achievements Section** - Animated counters (50+ patents, 100+ students)
6. **Benefits Section** - 6-card grid showing internship advantages
7. **Services Section** - IP services offered
8. **Prizes Section** - Rewards and recognition details
9. **Sponsors Section** - Partner logos (placeholders)
10. **Application Form** - Complete form with validation
11. **FAQ Section** - Accordion-style FAQs
12. **Contact Section** - Contact information and social links
13. **Footer** - Branding and quick links

### ✅ Backend API Endpoints

#### Application Endpoints (`/api/applications`)
- `POST /submit` - Submit new internship application
  - Validates all form fields
  - Stores in MongoDB
  - Syncs to Google Sheets (if configured)
  
- `GET /list` - Get all applications (admin)
  - Pagination support (skip, limit)
  - Sorted by creation date
  
- `GET /stats` - Application statistics
  - Total applications count
  - Breakdown by area of interest

#### Google Sheets OAuth (`/api/applications/oauth/sheets`)
- `GET /login` - Initiate OAuth flow
- `GET /callback` - Handle OAuth callback
- `GET /status` - Check connection status

---

## Database Schema

### Applications Collection
```javascript
{
  id: String (UUID),
  fullName: String,
  email: String (validated),
  phone: String (10 digits),
  collegeName: String,
  course: String,
  year: String (dropdown selection),
  areaOfInterest: String (dropdown: AI/ML, Patent Research, Startup, etc.),
  motivation: String,
  createdAt: DateTime,
  status: String (default: "pending")
}
```

### Google Tokens Collection (for OAuth)
```javascript
{
  user_id: String,
  access_token: String,
  refresh_token: String,
  token_uri: String,
  client_id: String,
  client_secret: String,
  expires_at: Timestamp,
  created_at: DateTime,
  updated_at: DateTime
}
```

---

## Google Sheets Integration

### Configuration Required (.env)
```
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
GOOGLE_REDIRECT_URI=https://ip-labs-portal.preview.emergentagent.com/api/applications/oauth/sheets/callback
GOOGLE_SPREADSHEET_ID=<your-spreadsheet-id>
```

### Setup Steps
1. Create Google Cloud Project
2. Enable Google Sheets API
3. Configure OAuth Consent Screen
4. Create OAuth 2.0 credentials
5. Add credentials to backend/.env
6. Access `/api/applications/oauth/sheets/login` to authenticate
7. Applications will automatically sync to Google Sheets

### Sheet Structure
| Full Name | Email | Phone | College Name | Course | Year | Area of Interest | Motivation | Submitted At |
|-----------|-------|-------|--------------|--------|------|------------------|------------|--------------|

---

## Design System

### Color Palette
- **Primary:** Dark Blue (#0f172a slate-950) + Gold (#f59e0b amber-500/600)
- **Background:** Slate gradients (950, 900, 800)
- **Accents:** Amber/Gold for CTAs and highlights
- **Text:** White, Slate-300, Slate-400

### Typography
- Headlines: Bold, large sizes (4xl-7xl)
- Body: Slate-300/400, readable line-height
- CTAs: Bold, contrasting colors

### Animations
- Smooth scrolling
- Hover effects on cards and buttons
- Animated achievement counters
- Backdrop blur effects
- Transform transitions

---

## Environment Variables

### Frontend (`/app/frontend/.env`)
```
REACT_APP_BACKEND_URL=https://ip-labs-portal.preview.emergentagent.com
```

### Backend (`/app/backend/.env`)
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"

# Google Sheets OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI=""
GOOGLE_SPREADSHEET_ID=""
```

---

## API Integration Flow

### Form Submission Flow
1. User fills application form
2. Frontend validates input fields
3. POST request to `/api/applications/submit`
4. Backend validates and saves to MongoDB
5. Backend attempts to sync with Google Sheets (non-blocking)
6. Success response returned to frontend
7. Success toast notification shown
8. Form resets after 3 seconds

---

## User Personas

### Primary Target
- **Students** (Undergraduate/Postgraduate)
- Interest areas: Patents, AI/ML, Research, Startups
- Age: 18-25 years
- Tech-savvy, mobile-first users

### Secondary Target
- **Educators/Mentors** interested in innovation programs
- **Industry professionals** seeking IP services

---

## Core Requirements

### Functional
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Form validation (client + server side)
- ✅ Database persistence
- ✅ Google Sheets sync (optional)
- ✅ Professional UI/UX matching $20k+ agency quality

### Non-Functional
- Fast load times
- Smooth animations
- Accessible navigation
- SEO-friendly structure
- Error handling and user feedback

---

## Deployment Configuration

### Services Running
- Frontend: Port 3000 (React dev server)
- Backend: Port 8001 (FastAPI with Uvicorn)
- MongoDB: Port 27017 (local)
- Nginx: Reverse proxy

### URLs
- Frontend: https://ip-labs-portal.preview.emergentagent.com
- Backend API: https://ip-labs-portal.preview.emergentagent.com/api

---

## Next Steps & Backlog

### P0 (Critical)
- ✅ Complete full-stack MVP
- ✅ Form submission with DB storage
- ✅ Google Sheets integration

### P1 (High Priority)
- Replace placeholder mentor image with actual photo
- Replace placeholder sponsor logos with actual logos
- Set up Google OAuth and test Sheets sync
- Create admin dashboard to view applications

### P2 (Medium Priority)
- Add email notifications for new applications
- Implement application status tracking
- Add analytics/tracking (Google Analytics)
- Export applications as CSV/PDF
- Add testimonials section with real reviews

### P3 (Nice to Have)
- Multi-language support
- Dark/Light theme toggle
- Advanced search/filter for applications
- Automated email responses to applicants
- Integration with CRM systems

---

## Notes

### Assets Needed from Client
- [ ] Actual mentor photograph and bio details
- [ ] Partner/sponsor logos (PNG/SVG format)
- [ ] Google Cloud Project credentials for Sheets integration
- [ ] Actual contact email and social media links
- [ ] Student testimonials (optional)

### Google Sheets Setup
- Currently configured but requires OAuth credentials
- Non-blocking implementation - app works without Sheets
- Easy to enable once credentials are provided

---

**Last Updated:** December 2025
**Status:** MVP Complete - Ready for Testing & Deployment
