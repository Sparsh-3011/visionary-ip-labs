# Vercel SSL Fix - Deployment Instructions

## What Was Fixed
Updated all three serverless functions (`submit.js`, `list.js`, `stats.js`) with:
- ✅ Explicit TLS/SSL configuration (`tls: true`)
- ✅ Increased timeouts (10 seconds instead of 3) for Vercel network latency
- ✅ Connection retry options (`retryWrites`, `retryReads`)
- ✅ Proper connection pooling for serverless environment

## Deploy These Changes to Vercel

### Option 1: Automatic Deployment (Recommended)
1. Push the updated code to your GitHub repository:
   ```bash
   git add .
   git commit -m "fix: Add explicit TLS configuration for MongoDB Atlas connection"
   git push origin main
   ```

2. Vercel will automatically detect the push and redeploy your site

3. Wait 2-3 minutes for deployment to complete

### Option 2: Manual Deployment
If auto-deploy is not enabled:
1. Go to https://vercel.com/dashboard
2. Find your project: `visionary-ip-labs`
3. Click "Deployments" tab
4. Click "Redeploy" on the latest deployment

## Verify Environment Variables in Vercel

**CRITICAL**: Ensure these are set in Vercel Dashboard → Project Settings → Environment Variables:

```
MONGODB_URI = mongodb+srv://sparshbajoria123_db_user:qGmXsbhG2EMQ0FNZ@visionary-cluster.rc9lcfd.mongodb.net/?retryWrites=true&w=majority&appName=visionary-cluster

DB_NAME = visionary_ip_labs
```

## Testing After Deployment

1. Visit your live site form: https://your-vercel-url.vercel.app/
2. Fill out and submit the application form
3. Check Vercel Function Logs:
   - Go to Vercel Dashboard → Your Project → Deployments → Latest → Functions
   - Click on `/api/submit` to see real-time logs
4. Verify the submission appears in your Admin Dashboard: https://your-vercel-url.vercel.app/admin

## If This Fix Still Doesn't Work

If you still see SSL errors after deploying these changes, we'll immediately switch to **Plan B**:
- Deploy the existing Python FastAPI backend to Render (free tier)
- Update frontend to point to Render backend URL
- This approach completely avoids the Vercel serverless + MongoDB Atlas SSL issue

## Expected Behavior After Fix

✅ Form submissions should complete in ~1-2 seconds
✅ No more "SSL alert number 80" errors
✅ Applications saved to MongoDB Atlas
✅ Admin dashboard displays submitted applications

## Troubleshooting

**Still seeing 500 errors?**
- Check Vercel Function Logs for the exact error message
- Verify MongoDB Atlas Network Access allows connections from anywhere (0.0.0.0/0)
- Confirm your MongoDB user has read/write permissions

**Timeout errors?**
- MongoDB Atlas free tier can be slow during cold starts
- First request after idle period may take 5-8 seconds

---

**Last Updated**: December 2025
**Changes Committed**: Ready to push to GitHub
