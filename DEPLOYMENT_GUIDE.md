# 🚀 Complete Deployment & Local Setup Guide

## Part 1: Push to GitHub

### Step 1: Initialize Git Repository

```bash
cd /app

# Initialize git if not already done
git init

# Create .gitignore file
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/

# Environment variables
.env
*.env.local

# Build outputs
frontend/build/
frontend/dist/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Database
*.db
*.sqlite

# Temp files
/tmp/
*.tmp
EOF

# Add all files
git add .

# Commit
git commit -m "Initial commit: Visionary IP Labs website"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository" (+ icon, top right)
3. Name: `visionary-ip-labs`
4. Description: "Patent & Research Internship Program Website"
5. Choose: **Private** (recommended) or Public
6. **DO NOT** initialize with README (we already have code)
7. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/visionary-ip-labs.git

# Push code
git branch -M main
git push -u origin main
```

**Enter your GitHub credentials when prompted**

✅ **Your code is now on GitHub!**

---

## Part 2: Run Locally on Your Computer

### Prerequisites

Install these on your local machine:

#### 1. **Node.js & npm**
- Download: https://nodejs.org/ (LTS version)
- Verify installation:
  ```bash
  node --version  # Should show v18+ or v20+
  npm --version
  ```

#### 2. **Python 3.11+**
- Download: https://www.python.org/downloads/
- Verify:
  ```bash
  python --version  # or python3 --version
  ```

#### 3. **MongoDB**
- **Option A - MongoDB Community (Local):**
  - Download: https://www.mongodb.com/try/download/community
  - Install and start MongoDB service
  
- **Option B - MongoDB Atlas (Cloud - Recommended):**
  1. Go to https://www.mongodb.com/cloud/atlas
  2. Sign up for free
  3. Create a free cluster
  4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

#### 4. **Git**
- Download: https://git-scm.com/downloads
- Verify:
  ```bash
  git --version
  ```

#### 5. **VS Code (Recommended)**
- Download: https://code.visualstudio.com/

---

### Setup Instructions

#### Step 1: Clone Repository

```bash
# Clone your repository (replace YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/visionary-ip-labs.git

# Navigate to project
cd visionary-ip-labs
```

#### Step 2: Open in VS Code

```bash
# Open in VS Code
code .
```

Or: Open VS Code → File → Open Folder → Select `visionary-ip-labs`

#### Step 3: Setup Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << 'EOF'
MONGO_URL="mongodb://localhost:27017"
# OR if using MongoDB Atlas:
# MONGO_URL="mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority"

DB_NAME="visionary_ip_labs"
CORS_ORIGINS="http://localhost:3000"

# Google Sheets (Optional - leave empty for now)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI=""
GOOGLE_SPREADSHEET_ID=""
EOF
```

#### Step 4: Setup Frontend

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies (using yarn)
npm install -g yarn  # Install yarn if not already installed
yarn install

# Create .env file
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=http://localhost:8001
EOF
```

#### Step 5: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
yarn start
```

**Terminal 3 - MongoDB (if local):**
```bash
mongod
# Or if installed as service, it should already be running
```

---

### VS Code Recommended Extensions

1. **Python** (Microsoft)
2. **Pylance** (Microsoft)
3. **ESLint** (Microsoft)
4. **Prettier** (Prettier)
5. **MongoDB for VS Code** (MongoDB)
6. **GitLens** (GitKraken)
7. **Tailwind CSS IntelliSense** (Tailwind Labs)

Install: Open VS Code → Extensions (Ctrl+Shift+X) → Search & Install

---

### Access Your Local App

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001/api
- **API Docs:** http://localhost:8001/docs

---

## Part 3: Buy a Domain

### Recommended Domain Registrars

#### 1. **Namecheap** (Recommended - Best Prices)
- Website: https://www.namecheap.com
- Price: ~$8-12/year for .com
- Pros: Cheap, free WhoisGuard, easy to use
- Steps:
  1. Search for domain (e.g., "visionaryiplabs.com")
  2. Add to cart
  3. Create account & checkout
  4. Domain is yours!

#### 2. **Google Domains** (Now Squarespace)
- Website: https://domains.google
- Price: ~$12/year
- Pros: Clean interface, Google integration
- Note: Now owned by Squarespace

#### 3. **GoDaddy**
- Website: https://www.godaddy.com
- Price: ~$10-15/year (watch for renewal prices)
- Pros: Popular, lots of features

#### 4. **Cloudflare Registrar**
- Website: https://www.cloudflare.com/products/registrar/
- Price: At-cost pricing (~$8-10/year)
- Pros: No markup, includes free DDoS protection
- Requires Cloudflare account

### Domain Name Suggestions:
- `visionaryiplabs.com` ⭐ (Primary)
- `visionaryip.com`
- `viplabs.in` (if in India)
- `patentinternship.com`
- `ipinternship.in`

### Tips:
- ✅ Choose `.com` if available (most trusted)
- ✅ Keep it short and memorable
- ✅ Avoid hyphens and numbers
- ✅ Check trademark availability
- ❌ Don't buy add-ons you don't need (hosting, email, etc.)

---

## Part 4: Hosting & Deployment Options

### Option 1: Vercel (Recommended for Beginners) ⭐

**Best for:** Quick deployment, free tier, automatic HTTPS

#### Frontend (Vercel) + Backend (Render/Railway)

**Deploy Frontend to Vercel:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```
   
3. Follow prompts:
   - Login to Vercel
   - Choose project name
   - Set environment variables:
     ```
     REACT_APP_BACKEND_URL=https://your-backend-url.com
     ```

4. **Connect Custom Domain:**
   - Vercel Dashboard → Your Project → Settings → Domains
   - Add your domain (e.g., `visionaryiplabs.com`)
   - Update DNS at your registrar (Vercel will show you exact records)

**Deploy Backend to Render:**

1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect your repository
5. Settings:
   - Name: `visionary-ip-labs-api`
   - Environment: `Python 3`
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Add Environment Variables:
     ```
     MONGO_URL=your-mongodb-atlas-url
     DB_NAME=visionary_ip_labs
     CORS_ORIGINS=https://visionaryiplabs.com
     ```

**Cost:** FREE tier available!

---

### Option 2: Netlify (Alternative to Vercel)

Similar to Vercel, great for static sites.

1. Go to https://www.netlify.com
2. Connect GitHub repository
3. Build settings:
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/build`
4. Add environment variables
5. Connect custom domain

**Cost:** FREE tier available!

---

### Option 3: DigitalOcean (Full Control)

**Best for:** More control, scalability

1. **Create Droplet:**
   - Go to https://www.digitalocean.com
   - Create → Droplets
   - Choose: Ubuntu 22.04 LTS
   - Plan: $6/month (Basic)
   - Add SSH key

2. **Setup Server:**
   ```bash
   # SSH into server
   ssh root@your-server-ip

   # Update system
   apt update && apt upgrade -y

   # Install dependencies
   apt install -y python3-pip python3-venv nginx mongodb nodejs npm git

   # Clone repository
   git clone https://github.com/YOUR_USERNAME/visionary-ip-labs.git
   cd visionary-ip-labs

   # Setup backend
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

   # Setup frontend
   cd ../frontend
   npm install -g yarn
   yarn install
   yarn build

   # Setup Nginx (reverse proxy)
   # Copy build to /var/www/html
   cp -r build/* /var/www/html/

   # Configure domain and SSL (Let's Encrypt)
   ```

3. **Setup SSL with Let's Encrypt:**
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d visionaryiplabs.com
   ```

**Cost:** $6/month

---

### Option 4: AWS (Enterprise Grade)

**Best for:** Large scale, enterprise needs

Services needed:
- **Frontend:** AWS S3 + CloudFront
- **Backend:** AWS EC2 or Elastic Beanstalk
- **Database:** MongoDB Atlas or AWS DocumentDB

**Cost:** Varies (~$10-50/month minimum)

---

### Option 5: Railway (Easiest Full-Stack)

**Best for:** Deploy everything in one place

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repository
5. Railway auto-detects frontend & backend
6. Add environment variables
7. Connect custom domain

**Cost:** $5/month (includes $5 free credit)

---

## Part 5: DNS Configuration

After buying domain and choosing hosting, connect them:

### Example: Namecheap Domain + Vercel Hosting

1. **Get DNS records from Vercel:**
   - Vercel Dashboard → Settings → Domains
   - Add `visionaryiplabs.com`
   - Vercel shows DNS records needed

2. **Update DNS at Namecheap:**
   - Namecheap Dashboard → Domain List → Manage
   - Advanced DNS
   - Add records:
     ```
     Type: A Record
     Host: @
     Value: 76.76.21.21 (Vercel IP)
     TTL: Automatic

     Type: CNAME
     Host: www
     Value: cname.vercel-dns.com
     TTL: Automatic
     ```

3. **Wait for DNS propagation** (5 mins - 48 hours, usually ~1 hour)

4. **SSL automatically provisioned** by Vercel

---

## Part 6: Complete Deployment Checklist

### Before Going Live:

- [ ] Test application locally thoroughly
- [ ] Update all placeholder content (mentor photo, logos, contact info)
- [ ] Setup MongoDB Atlas (production database)
- [ ] Setup environment variables in hosting platform
- [ ] Configure CORS properly
- [ ] Test form submission
- [ ] Setup Google Sheets integration (optional)
- [ ] Add Google Analytics (optional)
- [ ] Test on mobile devices
- [ ] Setup custom domain
- [ ] SSL certificate enabled (should be automatic)
- [ ] Test contact email
- [ ] Create backup strategy

### After Going Live:

- [ ] Monitor application logs
- [ ] Setup uptime monitoring (e.g., UptimeRobot - free)
- [ ] Regular database backups
- [ ] Monitor form submissions
- [ ] Update DNS records if needed

---

## Recommended Tech Stack for Production

**Frontend Hosting:** Vercel or Netlify  
**Backend Hosting:** Render or Railway  
**Database:** MongoDB Atlas (Free tier: 512MB)  
**Domain:** Namecheap  
**CDN/DDoS:** Cloudflare (Free)  
**Monitoring:** UptimeRobot (Free)  

**Total Cost:** ~$0-10/month to start!

---

## Quick Start - Recommended Path

### For Beginners:

1. **Buy domain:** Namecheap (~$10/year)
2. **Database:** MongoDB Atlas (Free)
3. **Deploy frontend:** Vercel (Free)
4. **Deploy backend:** Render (Free)
5. **Connect domain:** Update DNS to Vercel
6. **Total cost:** ~$10/year (just domain!)

### Step-by-step:

```bash
# 1. Push to GitHub (done above)

# 2. Create MongoDB Atlas account
# Get connection string

# 3. Deploy to Vercel
cd frontend
vercel --prod

# 4. Deploy backend to Render
# Use their web interface

# 5. Connect domain
# Add domain in Vercel dashboard

# Done! ✅
```

---

## Need Help?

**Common Issues:**

1. **Port already in use:**
   ```bash
   # Kill process on port 8001
   lsof -ti:8001 | xargs kill -9
   ```

2. **MongoDB connection error:**
   - Check if MongoDB is running
   - Verify connection string
   - Check firewall settings

3. **Module not found:**
   ```bash
   # Backend
   pip install -r requirements.txt
   
   # Frontend
   yarn install
   ```

4. **CORS errors:**
   - Update `CORS_ORIGINS` in backend .env
   - Restart backend server

---

## Video Tutorials (Recommended)

- **Deploying to Vercel:** https://www.youtube.com/watch?v=2HBIzEx6IZA
- **MongoDB Atlas Setup:** https://www.youtube.com/watch?v=rPqRyYJmx2g
- **Custom Domain Setup:** https://www.youtube.com/watch?v=b2bIdtSwDhc

---

Would you like me to help with any specific part of this setup?
