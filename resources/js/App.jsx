import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import StudentManagement from './pages/StudentManagement'
import BookManagement from './pages/BookManagement'
import BookCopyManagement from './pages/BookCopyManagement'
import LibraryCardManagement from './pages/LibraryCardManagement'
import IssueReturn from './pages/IssueReturn'
import LoanTracking from './pages/LoanTracking'
import AcademicCalendar from './pages/AcademicCalendar'
import Notifications from './pages/Notifications'
import Reports from './pages/Reports'
import Administration from './pages/Administration'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="books" element={<BookManagement />} />
        <Route path="book-copies" element={<BookCopyManagement />} />
        <Route path="library-cards" element={<LibraryCardManagement />} />
        <Route path="issue-return" element={<IssueReturn />} />
        <Route path="loans" element={<LoanTracking />} />
        <Route path="calendar" element={<AcademicCalendar />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="reports" element={<Reports />} />
        <Route path="admin" element={<Administration />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}
