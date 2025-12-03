import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (email, password) => api.post('/login', { email, password }),
  register: (data) => api.post('/register', data),
  logout: () => api.post('/logout'),
  me: () => api.get('/me'),
}

export const dashboardApi = {
  getMetrics: () => api.get('/dashboard/metrics'),
  getAnalytics: () => api.get('/dashboard/analytics'),
}

export const studentApi = {
  getStudents: (params) => api.get('/students', { params }),
  getStudent: (id) => api.get(`/students/${id}`),
  createStudent: (data) => api.post('/students', data),
  updateStudent: (id, data) => api.patch(`/students/${id}`, data),
  deleteStudent: (id) => api.delete(`/students/${id}`),
  approveStudent: (id) => api.post(`/students/${id}/approve`),
  rejectStudent: (id) => api.post(`/students/${id}/reject`),
  blockStudent: (id) => api.post(`/students/${id}/block`),
  unblockStudent: (id) => api.post(`/students/${id}/unblock`),
  suspendStudent: (id) => api.post(`/students/${id}/suspend`),
  resetPassword: (id, password) => api.post(`/students/${id}/reset-password`, { password }),
}

export const bookApi = {
  getBooks: (params) => api.get('/books', { params }),
  getBook: (id) => api.get(`/books/${id}`),
  createBook: (data) => api.post('/books', data),
  updateBook: (id, data) => api.patch(`/books/${id}`, data),
  deleteBook: (id) => api.delete(`/books/${id}`),
  restoreBook: (id) => api.post(`/books/${id}/restore`),
}

export const bookCopyApi = {
  createCopies: (data) => api.post('/book-copies', data),
  getCopies: (params) => api.get('/book-copies', { params }),
  getCopy: (id) => api.get(`/book-copies/${id}`),
  updateStatus: (id, status) => api.patch(`/book-copies/${id}/status`, { status }),
  printBarcodes: (bookId) => api.post('/book-copies/print-barcodes', { book_id: bookId }),
}

export const libraryCardApi = {
  generateCard: (studentId) => api.post('/library-cards/generate', { student_id: studentId }),
  getCard: (studentId) => api.get(`/students/${studentId}/library-card`),
  reissueCard: (studentId) => api.post(`/students/${studentId}/library-card/reissue`),
  printCard: (studentId) => api.get(`/students/${studentId}/library-card/print`),
}

export const loanApi = {
  issueBook: (data) => api.post('/loans/issue', data),
  returnBook: (data) => api.post('/loans/return', data),
  getLoans: (params) => api.get('/loans', { params }),
  getLoan: (id) => api.get(`/loans/${id}`),
}

export const loanTrackingApi = {
  getDueSoon: (params) => api.get('/loans/due-soon', { params }),
  getOverdue: (params) => api.get('/loans/overdue', { params }),
  getHistory: (params) => api.get('/loans-history', { params }),
  sendReminders: (data) => api.post('/loans/send-reminders', data),
}

export const academicCalendarApi = {
  getEvents: (params) => api.get('/academic-calendar', { params }),
  getEvent: (id) => api.get(`/academic-calendar/${id}`),
  createEvent: (data) => api.post('/academic-calendar', data),
  updateEvent: (id, data) => api.patch(`/academic-calendar/${id}`, data),
  deleteEvent: (id) => api.delete(`/academic-calendar/${id}`),
  uploadCalendar: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/academic-calendar/upload', formData)
  },
}

export const notificationApi = {
  sendNotification: (data) => api.post('/notifications/send', data),
  getHistory: (params) => api.get('/notifications/history', { params }),
  getStudentNotifications: (studentId, params) =>
    api.get(`/students/${studentId}/notifications`, { params }),
  markAsRead: (id) => api.post(`/notifications/${id}/read`),
  markAllAsRead: (studentId) => api.post('/notifications/mark-all-read', { student_id: studentId }),
}

export const reportApi = {
  getIssuedBooks: (params) => api.get('/reports/issued-books', { params }),
  getReturnedBooks: (params) => api.get('/reports/returned-books', { params }),
  getOverdueList: (params) => api.get('/reports/overdue-list', { params }),
  getStudentWiseReport: (params) => api.get('/reports/student-wise', { params }),
  getBookWiseReport: (params) => api.get('/reports/book-wise', { params }),
  getFineCollection: (params) => api.get('/reports/fine-collection', { params }),
}

export const adminApi = {
  listAdmins: (params) => api.get('/admins', { params }),
  createAdmin: (data) => api.post('/admins', data),
  updateAdminRole: (id, roleId) => api.patch(`/admins/${id}/role`, { role_id: roleId }),
  toggleAdminStatus: (id) => api.patch(`/admins/${id}/toggle-status`),
  listRoles: () => api.get('/roles'),
  createRole: (data) => api.post('/roles', data),
  updateRole: (id, data) => api.patch(`/roles/${id}`, data),
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.post('/settings', data),
}

export default api
