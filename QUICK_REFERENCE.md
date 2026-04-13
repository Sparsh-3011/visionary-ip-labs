# 📖 Quick Reference Guide

## ⚡ Super Quick Start

### From This Environment (Push to GitHub):
```bash
cd /app
git init
git add .
git commit -m "Initial commit: Visionary IP Labs"
git remote add origin https://github.com/YOUR_USERNAME/visionary-ip-labs.git
git push -u origin main
```

### On Your Local Machine (Run Locally):
```bash
# Clone
git clone https://github.com/YOUR_USERNAME/visionary-ip-labs.git
cd visionary-ip-labs

# Quick setup (Mac/Linux)
chmod +x quick-start.sh
./quick-start.sh

# Start backend (Terminal 1)
cd backend
source venv/bin/activate
uvicorn server:app --reload --port 8001

# Start frontend (Terminal 2)
cd frontend
yarn start

# Open: http://localhost:3000
```

---

## 📸 Add Photos/Logos (5 min)

```bash
# 1. Create folders
mkdir -p /app/frontend/public/images/sponsors

# 2. Add your files
cp /path/to/mentor.jpg /app/frontend/public/images/mentor.jpg
cp /path/to/logo1.png /app/frontend/public/images/sponsors/google.png

# 3. Edit components
# - CredibilitySection.jsx (line 50) - for mentor photo
# - SponsorsSection.jsx (line 8) - for logos

# See SETUP_GUIDE.md for exact code
```

---

## 📊 View Form Submissions (1 min)

**Quick View (Browser):**
```
http://localhost:8001/api/applications/list
```

**Export to Excel:**
```bash
mongoexport --db=visionary_ip_labs --collection=applications \
  --type=csv --fields=fullName,email,phone,collegeName,course,year,areaOfInterest,motivation,createdAt \
  --out=applications.csv
```

---

## 🌍 Deploy to Production (15 min)

### Recommended: Vercel + Render (FREE!)

**Step 1: Database (MongoDB Atlas)**
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Save for later

**Step 2: Deploy Frontend (Vercel)**
```bash
npm install -g vercel
cd frontend
vercel --prod
# Follow prompts
# Set env: REACT_APP_BACKEND_URL=<your-backend-url>
```

**Step 3: Deploy Backend (Render)**
1. Go to render.com
2. New → Web Service
3. Connect GitHub
4. Settings:
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Env vars: MONGO_URL, DB_NAME, CORS_ORIGINS

**Step 4: Connect Domain**
- Buy domain at namecheap.com (~$10/year)
- Add to Vercel dashboard
- Update DNS records

**Total Time:** 15-20 minutes  
**Total Cost:** ~$10/year (just domain!)

---

## 🎯 Common Tasks

| Task | Command |
|------|---------|
| **View backend logs** | `tail -f /var/log/supervisor/backend.*.log` |
| **View frontend logs** | `tail -f /var/log/supervisor/frontend.*.log` |
| **Restart backend** | `sudo supervisorctl restart backend` |
| **Check MongoDB** | `mongosh mongodb://localhost:27017/visionary_ip_labs` |
| **Export data** | `mongoexport --db=visionary_ip_labs --collection=applications --out=data.json` |
| **Kill port 8001** | `lsof -ti:8001 \| xargs kill -9` |

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| **README.md** | Project overview & quick start |
| **SETUP_GUIDE.md** | Add photos, logos, view submissions |
| **DEPLOYMENT_GUIDE.md** | Complete deployment guide |
| **quick-start.sh** | Automated setup script |
| **backend/.env.example** | Backend environment template |
| **frontend/.env.example** | Frontend environment template |

---

## 🔗 Useful Links

- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Vercel:** https://vercel.com
- **Render:** https://render.com
- **Namecheap:** https://www.namecheap.com
- **Let's Encrypt (SSL):** https://letsencrypt.org

---

## 🆘 Troubleshooting

### "Module not found"
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend
yarn install
```

### "Port already in use"
```bash
lsof -ti:8001 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

### "MongoDB connection failed"
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: whitelist your IP

### "CORS error"
- Update `CORS_ORIGINS` in backend/.env
- Restart backend

---

## 💡 Pro Tips

1. **Use MongoDB Atlas** for production (free 512MB)
2. **Deploy to Vercel** for frontend (free, fast, auto-SSL)
3. **Use Render** for backend (free tier available)
4. **Buy domain from Namecheap** (cheapest, reliable)
5. **Export data weekly** to CSV as backup
6. **Monitor uptime** with UptimeRobot (free)

---

## 📞 Need Help?

Read the guides in this order:
1. **README.md** - Overview & installation
2. **SETUP_GUIDE.md** - Add content & view data
3. **DEPLOYMENT_GUIDE.md** - Deploy to production

---

**That's it! You're all set! 🎉**

Questions? Check the guides or the code comments.
