import { useEffect, useState } from 'react'
import { studentApi } from '../api'
import { Search, Edit2, Trash2, CheckCircle, XCircle, Lock, Unlock } from 'lucide-react'

export default function StudentManagement() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    registration_number: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    course: '',
    semester: '',
  })

  useEffect(() => {
    fetchStudents()
  }, [search, page])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const response = await studentApi.getStudents({ search, page })
      setStudents(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddStudent = async (e) => {
    e.preventDefault()
    try {
      await studentApi.createStudent(formData)
      setFormData({
        registration_number: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department: '',
        course: '',
        semester: '',
      })
      setShowForm(false)
      fetchStudents()
    } catch (error) {
      console.error('Error creating student:', error)
      alert(error.response?.data?.message || 'Error creating student')
    }
  }

  const handleApprove = async (id) => {
    try {
      await studentApi.approveStudent(id)
      fetchStudents()
    } catch (error) {
      console.error('Error approving student:', error)
    }
  }

  const handleReject = async (id) => {
    try {
      await studentApi.rejectStudent(id)
      fetchStudents()
    } catch (error) {
      console.error('Error rejecting student:', error)
    }
  }

  const handleBlock = async (id) => {
    try {
      await studentApi.blockStudent(id)
      fetchStudents()
    } catch (error) {
      console.error('Error blocking student:', error)
    }
  }

  const handleUnblock = async (id) => {
    try {
      await studentApi.unblockStudent(id)
      fetchStudents()
    } catch (error) {
      console.error('Error unblocking student:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Student'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
          <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Registration Number"
              value={formData.registration_number}
              onChange={(e) =>
                setFormData({ ...formData, registration_number: e.target.value })
              }
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Semester"
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="input-field"
              required
            />
            <button type="submit" className="btn-primary md:col-span-2">
              Create Student
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Reg. Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.registration_number}</td>
                    <td>{student.first_name} {student.last_name}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        student.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {!student.is_approved && (
                          <>
                            <button
                              onClick={() => handleApprove(student.id)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleReject(student.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        {!student.is_blocked ? (
                          <button
                            onClick={() => handleBlock(student.id)}
                            className="text-orange-600 hover:text-orange-800"
                          >
                            <Lock size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUnblock(student.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Unlock size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
