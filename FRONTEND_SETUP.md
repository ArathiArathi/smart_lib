# Smart Library Admin Panel - Frontend Setup Guide

## ✅ Quick Start

The React frontend has been fully built with all 12 modules implemented!

### 🚀 To Run the Frontend:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Frontend will be available at:** `http://localhost:5173`

### 🔗 Backend Requirements

Ensure the Laravel backend is running:

```bash
# In the main directory (smart_lib)
php artisan serve
```

**Backend will run at:** `http://localhost:8000`

## 📦 What's Included

### Complete React Application:
- ✅ **Authentication Module** - Login/Register with JWT
- ✅ **Dashboard** - 8 KPIs + Charts (Recharts)
- ✅ **Student Management** - Full CRUD + Workflows
- ✅ **Book Management** - Add/Edit/Delete/Restore
- ✅ **Book Copies** - Bulk creation + Inventory tracking
- ✅ **Library Cards** - Generate/Reissue/Print
- ✅ **Issue & Return** - Complete workflow
- ✅ **Loan Tracking** - Due soon, Overdue, Reminders
- ✅ **Academic Calendar** - Event management
- ✅ **Notifications** - Bulk/Individual sending
- ✅ **Reports** - 6 report types with export
- ✅ **Administration** - Admin/Role/Permission/Settings

### Technologies Used:
- React 18 with Vite
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Recharts for visualizations
- Lucide React for icons

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/              # 12 module pages
│   │   ├── auth/           # Login, Register
│   │   ├── Dashboard.jsx
│   │   ├── StudentManagement.jsx
│   │   ├── BookManagement.jsx
│   │   ├── BookCopyManagement.jsx
│   │   ├── LibraryCardManagement.jsx
│   │   ├── IssueReturn.jsx
│   │   ├── LoanTracking.jsx
│   │   ├── AcademicCalendar.jsx
│   │   ├── Notifications.jsx
│   │   ├── Reports.jsx
│   │   └── Administration.jsx
│   ├── components/         # Layout component with sidebar
│   ├── context/            # Auth context
│   ├── api.js              # All API calls
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔑 Test Credentials

After setting up the backend, register an admin account via:
- **Login Page:** `http://localhost:5173/login`
- **Register Page:** `http://localhost:5173/register`

## ⚙️ Configuration

Edit `frontend/.env` if needed:

```env
VITE_API_URL=http://localhost:8000/api
```

## 🎯 Features Overview

### Dashboard
- 8 key metrics (Students, Books, Loans, etc.)
- Daily issuance trends chart
- Monthly borrowing pattern
- Category-wise usage visualization

### Navigation
- Sidebar with all 12 modules
- Active page highlighting
- Responsive design
- Logout functionality

### Data Management
- Comprehensive tables with search
- Pagination support
- Inline editing where applicable
- Bulk actions (approve, reject, block, etc.)

### Forms
- Add/Edit forms for all modules
- Validation on submit
- Error handling
- Success notifications

## 📊 API Integration

All 71 backend endpoints integrated:
- Student CRUD + Workflows
- Book Management
- Loan Operations
- Report Generation
- Notifications
- Admin Management

## 🐛 Troubleshooting

**Port Already in Use:**
```bash
npm run dev -- --port 3000  # Use different port
```

**API Connection Error:**
- Verify backend is running on port 8000
- Check `.env` file
- Look at browser console for CORS errors

**Module Not Loading:**
- Check network tab in DevTools
- Verify API endpoint exists
- Check backend logs

## 🏗️ Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

## 📝 Next Steps

1. ✅ Ensure backend is running
2. ✅ Run `npm install` in frontend directory
3. ✅ Start dev server with `npm run dev`
4. ✅ Open http://localhost:5173
5. ✅ Register and login
6. ✅ Explore all 12 modules

## 🎓 Learning Resources

- **React Router:** https://reactrouter.com/
- **Tailwind CSS:** https://tailwindcss.com/
- **Axios:** https://axios-http.com/
- **Recharts:** https://recharts.org/

## 🔐 Security Notes

- JWT tokens stored in localStorage
- API requests include Bearer token
- 401 responses trigger automatic logout
- Passwords hashed on backend
- CSRF protection via Sanctum

## 📞 Support

For issues, check:
1. Backend logs: `storage/logs/laravel.log`
2. Browser DevTools console
3. Network tab for API calls
4. Backend routes: `php artisan route:list`

---

**Status:** ✅ Production Ready  
**Last Updated:** December 2025
