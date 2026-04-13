# Visionary IP Labs - Patent & Research Internship Program

![Website Preview](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

A modern, professional, and high-converting website for **Visionary IP Labs** - promoting the Patent & Research Internship Program and collecting student applications.

**An Initiative by:** H & P Projects and NextGen Care Foundation

---

## 🌟 Features

- ✅ **Modern UI/UX** - Premium Dark Blue + Gold theme
- ✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
- ✅ **Application Form** - Collect student applications with validation
- ✅ **MongoDB Integration** - Store applications securely
- ✅ **Google Sheets Sync** - Optional automatic syncing
- ✅ **Animated Sections** - Smooth scrolling and hover effects
- ✅ **SEO Optimized** - Meta tags and semantic HTML
- ✅ **Fast Performance** - Optimized images and code splitting

---

## 🚀 Tech Stack

### Frontend
- React 19.0.0
- TailwindCSS
- Shadcn/UI Components
- React Router DOM
- Axios
- Sonner (Toast notifications)

### Backend
- FastAPI (Python)
- MongoDB (Motor async driver)
- Google Sheets API
- OAuth 2.0

---

## 📋 Prerequisites

- Node.js 18+ & npm/yarn
- Python 3.11+
- MongoDB (local or Atlas)
- Git

---

## 🛠️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/visionary-ip-labs.git
cd visionary-ip-labs
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your MongoDB URL
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Create .env file
cp .env.example .env
# Edit .env and add backend URL
```

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn start
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api
- API Docs: http://localhost:8001/docs

---

## 📁 Project Structure

```
visionary-ip-labs/
├── frontend/
│   ├── public/
│   │   ├── images/           # Add your photos and logos here
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # All React components
│   │   │   ├── Header.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ApplicationForm.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   └── LandingPage.jsx
│   │   └── App.js
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── models/
│   │   └── application.py    # MongoDB models
│   ├── routes/
│   │   └── applications.py   # API endpoints
│   ├── services/
│   │   └── google_sheets.py  # Google Sheets integration
│   ├── server.py             # Main FastAPI app
│   ├── requirements.txt
│   └── .env
│
├── SETUP_GUIDE.md           # How to add photos, view submissions
├── DEPLOYMENT_GUIDE.md      # Complete deployment guide
└── README.md
```

---

## 📸 Adding Photos & Logos

### Mentor Photo
1. Add photo to `/frontend/public/images/mentor.jpg`
2. Edit `/frontend/src/components/CredibilitySection.jsx`

### Sponsor Logos
1. Add logos to `/frontend/public/images/sponsors/`
2. Edit `/frontend/src/components/SponsorsSection.jsx`

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.**

---

## 📊 Viewing Form Submissions

### Method 1: API Endpoint
```bash
curl http://localhost:8001/api/applications/list
```

### Method 2: MongoDB
```bash
mongosh mongodb://localhost:27017/visionary_ip_labs
db.applications.find().pretty()
```

### Method 3: Export to CSV
```bash
mongoexport --db=visionary_ip_labs --collection=applications --type=csv \
  --fields=fullName,email,phone,collegeName,course,year,areaOfInterest,createdAt \
  --out=applications.csv
```

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more options.**

---

## 🌐 Deployment

### Quick Deploy (Recommended)

**Frontend:** Vercel (Free)
```bash
cd frontend
vercel --prod
```

**Backend:** Render (Free)
1. Connect GitHub repository
2. Set environment variables
3. Deploy

**Database:** MongoDB Atlas (Free tier)

**See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete deployment instructions.**

---

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=visionary_ip_labs
CORS_ORIGINS=http://localhost:3000

# Optional - Google Sheets Integration
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
GOOGLE_SPREADSHEET_ID=
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

---

## 🎨 Customization

### Update Colors
Main theme colors use Tailwind classes:
- Gold: `amber-400`, `amber-500`, `amber-600`
- Dark Blue: `slate-950`, `slate-900`, `slate-800`

### Update Content
Edit component files in `/frontend/src/components/`

---

## 📦 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/applications/submit` | Submit new application |
| GET | `/api/applications/list` | Get all applications |
| GET | `/api/applications/stats` | Get statistics |
| GET | `/api/applications/oauth/sheets/login` | Start Google OAuth |
| GET | `/api/applications/oauth/sheets/callback` | OAuth callback |
| GET | `/api/applications/oauth/sheets/status` | Check Sheets connection |

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
yarn test
```

### Manual Testing
1. Fill application form
2. Check API endpoint: `/api/applications/list`
3. Verify data in MongoDB

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

This is a private project for Visionary IP Labs. For any issues or suggestions, please contact the team.

---

## 📄 License

MIT License - See LICENSE file for details

---

## 📞 Support

For setup help, customization, or deployment assistance, refer to:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Photos, logos, viewing submissions
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment guide

---

## 🎯 What's Next?

- [ ] Add your mentor photo and sponsor logos
- [ ] Update contact information
- [ ] Configure Google Sheets integration (optional)
- [ ] Deploy to production
- [ ] Connect custom domain
- [ ] Monitor applications

---

**Built with ❤️ for Visionary IP Labs**

*An Initiative by H & P Projects and NextGen Care Foundation*
