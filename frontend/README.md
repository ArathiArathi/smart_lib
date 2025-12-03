# Smart Library Admin Panel - Frontend

A complete React-based admin panel for the Smart Library System with all 12 modules fully implemented.

## 📋 Features

### ✅ All 12 Modules Implemented:

1. **Authentication & Authorization** - Login, Register, JWT-based auth
2. **Dashboard** - Metrics (8 KPIs) & Analytics with charts
3. **Student Management** - CRUD, Approval workflow, Block/Unblock
4. **Library Card Management** - Generate, Reissue, Print
5. **Book Management** - CRUD with search, filter, soft delete
6. **Book Copies & Inventory** - Bulk creation, status tracking
7. **Issue & Return Operations** - Full workflow with validations
8. **Loan Tracking** - Due soon, Overdue, History, Reminders
9. **Academic Calendar** - Event management with dates
10. **Notifications** - Send bulk/individual notifications
11. **Reports & Analytics** - 6 report types with export
12. **System Administration** - Admin, Role, Permission, Settings management

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
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
│   ├── components/
│   │   └── Layout.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔐 Authentication

- JWT-based authentication with Sanctum
- Token stored in localStorage
- Auto-redirect to login on 401 responses
- Session persistence

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- Fully responsive design (mobile, tablet, desktop)
- Custom component styles

## 📊 Charts & Visualizations

- **Recharts** for interactive charts
- Dashboard analytics with line and bar charts
- Category-wise usage visualization
- Real-time data updates

## 🔌 API Integration

All endpoints connected via `src/api.js`:
- 71 backend endpoints fully integrated
- Request/response interceptors
- Automatic token injection
- Error handling

## 🔧 Configuration

Edit `.env` to change API URL:

```env
VITE_API_URL=http://localhost:8000/api
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## 🌟 Key Technologies

- **React 18** - UI library
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Charts
- **Lucide React** - Icons

## 💡 Features Highlights

### Dashboard
- 8 key performance indicators
- Daily issuance trends
- Monthly borrowing patterns
- Category-wise usage statistics

### Student Management
- Search and filter students
- Approve/Reject pending registrations
- Block/Unblock students
- Password reset functionality

### Book Operations
- Add, edit, delete books
- Manage book copies in bulk
- Inventory status tracking
- Barcode generation (placeholder)

### Loan Management
- Issue books with validations
- Return books with auto-fine calculation
- Track due dates and overdue books
- Send reminder notifications

### Reports
- Multiple report types
- Date range filtering
- CSV export functionality
- Real-time data aggregation

## 🐛 Troubleshooting

**Backend not found:**
- Ensure Laravel backend is running on port 8000
- Check `.env` file for correct API URL

**CORS errors:**
- Verify CORS is enabled in Laravel backend
- Check backend `.env` for proper CORS configuration

**Login issues:**
- Verify admin credentials
- Check backend database for user records

## 📚 Backend Integration

This frontend connects to the Laravel backend API. Ensure:
1. Database is migrated (`php artisan migrate`)
2. API is running (`php artisan serve`)
3. Frontend `.env` points to correct backend URL

## 🤝 Contributing

Feel free to extend with:
- Additional validation
- More analytics
- Custom themes
- Export to PDF
- Advanced filtering

## 📄 License

ISC

---

**Last Updated**: December 2025  
**Status**: Production Ready ✅
