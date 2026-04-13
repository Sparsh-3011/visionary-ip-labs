# 🔐 Admin Dashboard Guide

## Quick Access

**Admin Dashboard URL:**
```
https://ip-labs-portal.preview.emergentagent.com/admin
```

**Default Password:** `admin123`

⚠️ **IMPORTANT:** Change this password immediately after first login!

---

## How to Change Admin Password

Edit `/app/frontend/src/pages/AdminDashboard.jsx`:

Find line ~28:
```javascript
const ADMIN_PASSWORD = 'admin123'; // Change this!
```

Change to:
```javascript
const ADMIN_PASSWORD = 'YourSecurePassword123!';
```

---

## Dashboard Features

### 📊 Statistics Cards
- **Total Applications** - Total number of submissions
- **Interest Areas** - Number of unique interest categories
- **Filtered Results** - Current search/filter results

### 🔍 Search & Filter
- **Search:** Type name, email, or college name
- **Filter by Interest:** Select specific interest area
- **Refresh:** Reload latest data
- **Export CSV:** Download all filtered results

### 📋 Applications Table
Shows all applications with:
- Name
- Contact (email & phone)
- Education (college, course, year)
- Area of Interest (badge)
- Submission date
- Action button (view full details)

### 👁️ View Details
Click the eye icon to see complete application including motivation letter.

### 📥 Export to CSV
1. Apply any filters you want
2. Click "Export CSV" button
3. File downloads automatically
4. Open in Excel/Google Sheets

---

## Mobile Form Fix - What Was Fixed

### Issue
- White screen on mobile
- Form not submitting
- Phone validation too strict

### Solution
✅ Relaxed phone validation (now accepts 10+ digits)
✅ Auto-cleans phone numbers (removes spaces/dashes)
✅ Better error handling
✅ Mobile-responsive design confirmed

---

## Common Admin Tasks

### 1. View All Applications
Just login to `/admin` - shows all applications by default

### 2. Search for Specific Student
Type name, email, or college in search box

### 3. Filter by Interest Area
Use dropdown to select specific area like "AI & Machine Learning"

### 4. Export Monthly Report
1. No filters = all data
2. Click "Export CSV"
3. Share with team

### 5. View Full Application Details
Click eye icon on any row

---

## API Endpoints (Alternative Access)

If dashboard is unavailable, use these:

**View all applications:**
```
GET /api/applications/list
```

**View statistics:**
```
GET /api/applications/stats
```

**With pagination:**
```
GET /api/applications/list?skip=0&limit=50
```

---

## Security Best Practices

### 1. Change Default Password
```javascript
// In AdminDashboard.jsx
const ADMIN_PASSWORD = 'YourStrongPassword123!';
```

### 2. Use HTTPS Only
✅ Already configured in production

### 3. Clear Browser Data After Use
Logout button clears authentication

### 4. Don't Share Password
Keep admin password confidential

### 5. Regular Exports
Backup data weekly via CSV export

---

## Troubleshooting

### Can't Login
- Check password (case-sensitive)
- Clear browser cache
- Try incognito mode

### No Applications Showing
- Click "Refresh" button
- Check backend is running
- View browser console for errors

### Export Not Working
- Check if you have applications
- Try different browser
- Check popup blockers

### Mobile Form White Screen
✅ **FIXED!** Form now works on mobile
- Clear mobile browser cache
- Try again

---

## Advanced: Make Password More Secure

### Option 1: Environment Variable (Recommended)

1. Add to `/app/frontend/.env`:
```
REACT_APP_ADMIN_PASSWORD=YourSecurePassword
```

2. Update AdminDashboard.jsx:
```javascript
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';
```

3. Restart frontend

### Option 2: Backend Authentication (Most Secure)

Create a proper login API endpoint with JWT tokens. Contact for implementation.

---

## Mobile Form Testing Results

✅ **Tested on:**
- iPhone SE (375x667)
- Mobile browsers
- Form fields working
- Dropdowns working
- Submit button accessible

✅ **Fixed Issues:**
- Phone validation relaxed
- Better error messages
- Auto-clean phone numbers
- Mobile-responsive layout

---

## Quick Reference

| Action | How To |
|--------|--------|
| **Access Dashboard** | Visit `/admin` |
| **Login** | Enter password: `admin123` |
| **Search** | Type in search box |
| **Filter** | Use dropdown |
| **Export** | Click "Export CSV" |
| **View Details** | Click eye icon |
| **Logout** | Click logout button |
| **Refresh Data** | Click refresh button |

---

## Next Steps

1. ✅ Change default password
2. ✅ Test on your device
3. ✅ Export sample data
4. ✅ Share dashboard URL with team
5. ✅ Regular data backups

---

**Dashboard is ready to use! 🎉**

Access: https://ip-labs-portal.preview.emergentagent.com/admin
