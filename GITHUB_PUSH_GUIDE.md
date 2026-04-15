# 🚀 Push to GitHub - Step by Step

## You Have 2 Options:

---

## ⭐ Option 1: I'll Create a ZIP - You Upload to GitHub (EASIEST)

### Step 1: Download Your Code

I'll create a clean ZIP file with all your code (excluding node_modules, cache, etc.)

Run this command to create the ZIP:
```bash
cd /app
tar --exclude='node_modules' \
    --exclude='__pycache__' \
    --exclude='venv' \
    --exclude='.git' \
    --exclude='frontend/build' \
    --exclude='.cache' \
    -czf visionary-ip-labs-$(date +%Y%m%d).tar.gz \
    frontend/ backend/ *.md .gitignore
```

### Step 2: Upload to GitHub

1. Go to: https://github.com/Sparsh-3011/visionary-ip-labs
2. Click "uploading an existing file"
3. Drag and drop all your project folders (frontend, backend, docs)
4. Commit changes

---

## ⭐ Option 2: GitHub Personal Access Token (More Technical)

### Step 1: Create Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Note: "Visionary IP Labs Deployment"
4. Expiration: 90 days
5. Select scopes: ✅ **repo** (all)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Push with Token

Run this command (replace YOUR_TOKEN):
```bash
cd /app
git remote set-url origin https://YOUR_TOKEN@github.com/Sparsh-3011/visionary-ip-labs.git
git push -u origin main
```

---

## 🎯 Recommended: Use Option 1

It's simpler and doesn't require tokens or command line.

---

## After Code is on GitHub:

Then you can deploy:

### Deploy Frontend to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Import `visionary-ip-labs`
4. Settings:
   - Root: `frontend`
   - Build: `yarn build`
   - Output: `build`
5. Deploy!

### Deploy Backend to Render
1. Go to https://render.com
2. Sign in with GitHub
3. New Web Service
4. Select `visionary-ip-labs`
5. Settings:
   - Root: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Add env vars (MongoDB URL, etc.)
7. Deploy!

---

**Which option do you want to use?**
