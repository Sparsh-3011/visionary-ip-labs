# 🚀 Deploy Backend to Render (RELIABLE SOLUTION)

This guide will help you deploy the Python FastAPI backend to Render, which provides **stable MongoDB Atlas connections** without the SSL issues we encountered on Vercel serverless functions.

---

## ✅ Why Render Instead of Vercel Serverless?

- **No SSL/TLS handshake issues** with MongoDB Atlas
- **Persistent connections** (not ephemeral like serverless)
- **Free tier available** (750 hours/month)
- **Automatic deploys** from GitHub
- **Better logging and debugging**

---

## 📋 Prerequisites

1. Your GitHub repository: `Sparsh-3011/visionary-ip-labs` ✅
2. MongoDB Atlas connection string ✅
3. A Render account (free): https://render.com

---

## 🎯 Step-by-Step Deployment

### Step 1: Create Render Account
1. Go to https://render.com
2. Click **"Get Started"**
3. Sign up with GitHub (recommended for auto-deploy)

### Step 2: Create New Web Service
1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub account if not already connected
3. Select repository: **`Sparsh-3011/visionary-ip-labs`**
4. Click **"Connect"**

### Step 3: Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name**: `visionary-ip-labs-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., `Singapore` or `Oregon`)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`

**Build & Deploy Settings:**
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

**Instance Type:**
- Select **"Free"** (sufficient for this project)

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these **3 variables**:

```
MONGO_URL = mongodb+srv://sparshbajoria123_db_user:qGmXsbhG2EMQ0FNZ@visionary-cluster.rc9lcfd.mongodb.net/?retryWrites=true&w=majority&appName=visionary-cluster

DB_NAME = visionary_ip_labs

CORS_ORIGINS = *
```

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render will start building and deploying (takes 2-3 minutes)
3. Wait for the status to show **"Live"** with a green checkmark

### Step 6: Copy Your Backend URL
Once deployed, you'll see a URL like:
```
https://visionary-ip-labs-backend.onrender.com
```
**Copy this URL** - you'll need it for the next step.

---

## 🔗 Step 7: Update Frontend to Use Render Backend

### Option A: Update via Vercel Dashboard (Easiest)
1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Find `REACT_APP_BACKEND_URL`
3. Change its value to: `https://visionary-ip-labs-backend.onrender.com` (use YOUR actual Render URL)
4. Click **Save**
5. Go to **Deployments** tab → Click **"Redeploy"** on the latest deployment

### Option B: Update via GitHub (Recommended for version control)
1. Edit `/app/frontend/.env.production` (create if it doesn't exist):
   ```
   REACT_APP_BACKEND_URL=https://visionary-ip-labs-backend.onrender.com
   ```
2. Commit and push to GitHub
3. Vercel will auto-redeploy

---

## ✅ Step 8: Test Your Application

1. **Test the backend directly:**
   ```bash
   curl https://YOUR-RENDER-URL.onrender.com/api/applications/stats
   ```
   You should see: `{"success":true,"totalApplications":0,"byInterest":[]}`

2. **Test the form submission:**
   - Go to your live Vercel site
   - Fill out the application form
   - Submit
   - Check the Admin Dashboard (`/admin`, password: `admin123`)

3. **Verify in MongoDB:**
   - Go to MongoDB Atlas → Collections
   - You should see the new application in `visionary_ip_labs.applications`

---

## 🔧 Important Notes

### Render Free Tier Limitations:
- **Spins down after 15 minutes of inactivity**
- First request after idle takes ~30-60 seconds (cold start)
- **750 free hours per month** (sufficient for testing/demo)

### To Avoid Cold Starts (Optional):
Use a service like **UptimeRobot** (free) to ping your backend every 14 minutes:
- Sign up at https://uptimerobot.com
- Add monitor: `https://YOUR-RENDER-URL.onrender.com/api/`
- Interval: 14 minutes

### Upgrade to Paid Plan:
If you need instant responses 24/7, upgrade to Render's **Starter plan** ($7/month) for:
- No cold starts
- Always-on instance
- Better performance

---

## 🐛 Troubleshooting

### Backend shows "Deploy failed"
- Check Render logs: Dashboard → Your Service → **Logs** tab
- Common issues:
  - Missing dependencies in `requirements.txt`
  - Incorrect start command
  - Environment variables not set

### Form submission still fails
- Verify `REACT_APP_BACKEND_URL` in Vercel points to your Render URL
- Check Render logs for error messages
- Ensure MongoDB Network Access allows all IPs (0.0.0.0/0)

### Cold start is too slow
- This is normal for Render free tier
- Consider using UptimeRobot to keep it warm
- Or upgrade to paid plan ($7/month)

---

## 📊 Monitoring

### Render Dashboard:
- **Logs**: Real-time backend logs
- **Metrics**: CPU, memory, response times
- **Events**: Deploy history

### MongoDB Atlas:
- **Database Access**: Verify user permissions
- **Network Access**: Ensure 0.0.0.0/0 is whitelisted
- **Metrics**: Monitor connections and operations

---

## 🎉 Success Checklist

- ✅ Render backend is deployed and shows "Live"
- ✅ Backend health check works: `curl YOUR-RENDER-URL/api/`
- ✅ Frontend `REACT_APP_BACKEND_URL` points to Render
- ✅ Form submissions work without errors
- ✅ Admin dashboard displays submitted applications
- ✅ MongoDB Atlas shows new documents

---

## 🆘 Need Help?

If you encounter any issues:
1. Check Render logs (Dashboard → Logs)
2. Check MongoDB Atlas connection
3. Verify environment variables in both Render and Vercel
4. Share the error message for further assistance

---

**Estimated Setup Time**: 10-15 minutes
**Cost**: $0 (Free tier)
**Reliability**: ⭐⭐⭐⭐⭐ (Much better than Vercel serverless for MongoDB)
