# Visionary IP Labs - Complete Setup Guide

## 📸 How to Add Photos and Logos

### 1. Adding Mentor Photo

**Location:** `/app/frontend/src/components/CredibilitySection.jsx`

**Steps:**
1. Place your mentor's photo in `/app/frontend/public/images/` folder
   ```bash
   # Create images folder if it doesn't exist
   mkdir -p /app/frontend/public/images
   
   # Copy your photo (replace with your actual file)
   cp /path/to/mentor-photo.jpg /app/frontend/public/images/mentor.jpg
   ```

2. Update the CredibilitySection component (around line 50-60):

**Find this code:**
```jsx
<div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
  <div className="text-center">
    <div className="w-32 h-32 bg-amber-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
      <GraduationCap className="w-16 h-16 text-amber-400" />
    </div>
    <p className="text-slate-400 text-sm">[Mentor Image Placeholder]</p>
    <p className="text-slate-500 text-xs mt-2">Upload your mentor's photo</p>
  </div>
</div>
```

**Replace with:**
```jsx
<div className="aspect-square rounded-xl overflow-hidden mb-6 border-2 border-amber-500/30">
  <img 
    src="/images/mentor.jpg" 
    alt="Program Mentor"
    className="w-full h-full object-cover"
  />
</div>
```

3. Add mentor's name and title below the photo:
```jsx
<div className="text-center">
  <h3 className="text-2xl font-bold text-white mb-2">Dr. [Mentor Name]</h3>
  <p className="text-amber-400 font-semibold">Associate Professor, KIIT University</p>
  <p className="text-slate-400 text-sm mt-1">Associate Editor, Journal of Field Robotics</p>
</div>
```

---

### 2. Adding Sponsor/Partner Logos

**Location:** `/app/frontend/src/components/SponsorsSection.jsx`

**Steps:**
1. Place all sponsor logos in `/app/frontend/public/images/sponsors/` folder
   ```bash
   mkdir -p /app/frontend/public/images/sponsors
   
   # Copy all your logo files (PNG or SVG recommended)
   # Example:
   cp /path/to/google-logo.png /app/frontend/public/images/sponsors/google.png
   cp /path/to/springer-logo.png /app/frontend/public/images/sponsors/springer.png
   # ... and so on
   ```

2. Update the SponsorsSection component (around line 8-17):

**Replace the sponsors array:**
```jsx
const sponsors = [
  { name: 'Google Gemini', logo: '/images/sponsors/google.png' },
  { name: 'Springer', logo: '/images/sponsors/springer.png' },
  { name: 'ScienceDirect', logo: '/images/sponsors/sciencedirect.png' },
  { name: 'Apple Index', logo: '/images/sponsors/apple.png' },
  { name: 'MLH', logo: '/images/sponsors/mlh.png' },
  { name: 'H & P Projects', logo: '/images/sponsors/hp-projects.png' },
  { name: 'NextGen Care Foundation', logo: '/images/sponsors/nextgen.png' },
  { name: 'ResearchGate', logo: '/images/sponsors/researchgate.png' }
];
```

**Update the grid rendering (around line 50-60):**
```jsx
{sponsors.map((sponsor, index) => (
  <div 
    key={index}
    className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 flex items-center justify-center"
  >
    <div className="text-center">
      {/* Actual logo */}
      <img 
        src={sponsor.logo} 
        alt={sponsor.name}
        className="w-24 h-24 object-contain mx-auto mb-3 filter grayscale hover:grayscale-0 transition-all duration-300"
      />
      <p className="text-slate-400 text-sm font-medium group-hover:text-amber-400 transition-colors duration-300">
        {sponsor.name}
      </p>
    </div>
  </div>
))}
```

**Image Requirements:**
- Format: PNG with transparent background (recommended) or JPG
- Size: 200x200px to 400x400px (will be scaled to fit)
- Quality: High resolution for clarity
- File size: Keep under 100KB each for faster loading

---

## 📊 How to View Form Submissions

### Method 1: Using API Endpoints (Recommended for Developers)

#### A. View All Applications

```bash
# Get list of all applications
curl https://ip-labs-portal.preview.emergentagent.com/api/applications/list

# With pagination (skip first 10, get next 20)
curl "https://ip-labs-portal.preview.emergentagent.com/api/applications/list?skip=10&limit=20"
```

**Response Example:**
```json
{
  "success": true,
  "total": 15,
  "applications": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "collegeName": "ABC University",
      "course": "B.Tech Computer Science",
      "year": "3rd Year",
      "areaOfInterest": "AI & Machine Learning",
      "motivation": "I am passionate about...",
      "createdAt": "2025-12-13T10:30:00",
      "status": "pending"
    }
  ]
}
```

#### B. View Statistics

```bash
# Get application statistics
curl https://ip-labs-portal.preview.emergentagent.com/api/applications/stats
```

**Response Example:**
```json
{
  "success": true,
  "totalApplications": 15,
  "byInterest": [
    { "_id": "AI & Machine Learning", "count": 6 },
    { "_id": "Patent Research", "count": 4 },
    { "_id": "Startup & Entrepreneurship", "count": 3 },
    { "_id": "Academic Research", "count": 2 }
  ]
}
```

---

### Method 2: Access MongoDB Database Directly

```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/test_database

# View all applications
db.applications.find().pretty()

# Count total applications
db.applications.countDocuments()

# Find applications by area of interest
db.applications.find({ areaOfInterest: "AI & Machine Learning" }).pretty()

# Find recent applications (last 7 days)
db.applications.find({
  createdAt: {
    $gte: new Date(Date.now() - 7*24*60*60*1000)
  }
}).pretty()

# Export to JSON file
mongoexport --db=test_database --collection=applications --out=/tmp/applications.json --jsonArray

# Export to CSV file
mongoexport --db=test_database --collection=applications --type=csv --fields=fullName,email,phone,collegeName,course,year,areaOfInterest,createdAt --out=/tmp/applications.csv
```

---

### Method 3: Create an Admin Dashboard (Optional)

I can create a simple admin dashboard for you with a web interface to:
- View all applications in a table
- Filter by area of interest, college, etc.
- Export to CSV/Excel
- Search functionality
- View statistics and charts

**Would you like me to create this admin dashboard?**

---

## 🔗 Google Sheets Integration Setup

To automatically sync form submissions to Google Sheets:

### Step 1: Create Google Cloud Project

1. Go to https://console.cloud.google.com
2. Create a new project (name it "Visionary IP Labs")
3. Enable Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search "Google Sheets API"
   - Click "Enable"

### Step 2: Configure OAuth

1. Go to "APIs & Services" → "OAuth consent screen"
2. Choose "External" → Create
3. Fill in:
   - App name: "Visionary IP Labs Application System"
   - User support email: your email
   - Developer contact: your email
4. Click "Save and Continue"
5. Add scope: `https://www.googleapis.com/auth/spreadsheets`
6. Add your email as test user

### Step 3: Create Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Choose "Web application"
4. Add these URLs:
   - **Authorized JavaScript origins:**
     ```
     https://ip-labs-portal.preview.emergentagent.com
     ```
   - **Authorized redirect URIs:**
     ```
     https://ip-labs-portal.preview.emergentagent.com/api/applications/oauth/sheets/callback
     ```
5. Click "Create"
6. **SAVE** the Client ID and Client Secret

### Step 4: Create Google Sheet

1. Go to https://sheets.google.com
2. Create a new spreadsheet
3. Name it "Visionary IP Labs Applications"
4. Copy the Spreadsheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

### Step 5: Configure Backend

Add these to `/app/backend/.env`:

```bash
GOOGLE_CLIENT_ID="your-client-id-here.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret-here"
GOOGLE_REDIRECT_URI="https://ip-labs-portal.preview.emergentagent.com/api/applications/oauth/sheets/callback"
GOOGLE_SPREADSHEET_ID="your-spreadsheet-id-here"
```

Then restart backend:
```bash
sudo supervisorctl restart backend
```

### Step 6: Authenticate

1. Visit: https://ip-labs-portal.preview.emergentagent.com/api/applications/oauth/sheets/login
2. Sign in with your Google account
3. Grant permissions
4. You'll see "Google Sheets connected successfully!"

**Done!** All new applications will automatically sync to your Google Sheet.

---

## 📧 Update Contact Information

**File:** `/app/frontend/src/components/ContactSection.jsx`

Update your actual contact details (around line 40-60):

```jsx
<a 
  href="mailto:your-actual-email@visionaryiplabs.com" 
  className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
>
  your-actual-email@visionaryiplabs.com
</a>

{/* Update website URL */}
<a 
  href="https://www.actualwebsite.com" 
  target="_blank"
  rel="noopener noreferrer"
  className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
>
  www.actualwebsite.com
</a>

{/* Update social media links */}
<a href="https://facebook.com/yourpage" ...>
<a href="https://twitter.com/yourhandle" ...>
<a href="https://linkedin.com/company/yourcompany" ...>
<a href="https://instagram.com/yourhandle" ...>
```

---

## 🎨 Quick Customization Tips

### Change Colors
Main theme colors are defined using Tailwind classes:
- **Gold/Amber:** `amber-400`, `amber-500`, `amber-600`
- **Dark Blue:** `slate-950`, `slate-900`, `slate-800`

To change to different colors, find and replace throughout components.

### Update Text Content
All section content is in respective component files:
- Hero: `/app/frontend/src/components/HeroSection.jsx`
- About: `/app/frontend/src/components/AboutSection.jsx`
- Benefits: `/app/frontend/src/components/BenefitsSection.jsx`
- etc.

---

## 🔧 Common Tasks

### Check if backend is running:
```bash
sudo supervisorctl status backend
```

### View backend logs:
```bash
tail -f /var/log/supervisor/backend.*.log
```

### View frontend logs:
```bash
tail -f /var/log/supervisor/frontend.*.log
```

### Restart services:
```bash
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
sudo supervisorctl restart all
```

---

## 📞 Need Help?

If you need assistance with:
- Creating an admin dashboard
- Setting up email notifications
- Custom features
- Deployment to production
- Any other customizations

Just let me know what you need!
