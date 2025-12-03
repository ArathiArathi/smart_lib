import { useEffect, useState } from 'react'
import { loanApi, studentApi, bookCopyApi } from '../api'
import { Send, RotateCcw } from 'lucide-react'

export default function IssueReturn() {
  const [students, setStudents] = useState([])
  const [copies, setCopies] = useState([])
  const [loans, setLoans] = useState([])
  const [activeTab, setActiveTab] = useState('issue')
  const [formData, setFormData] = useState({
    student_id: '',
    book_copy_id: '',
  })

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      const studentsRes = await studentApi.getStudents({})
      setStudents(studentsRes.data.data || studentsRes.data)

      const copiesRes = await bookCopyApi.getCopies({ status: 'available' })
      setCopies(copiesRes.data.data || copiesRes.data)

      const loansRes = await loanApi.getLoans({ page: 1 })
      setLoans(loansRes.data.data || loansRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleIssueBook = async (e) => {
    e.preventDefault()
    try {
      await loanApi.issueBook(formData)
      alert('Book issued successfully')
      setFormData({ student_id: '', book_copy_id: '' })
      fetchData()
    } catch (error) {
      alert(error.response?.data?.message || 'Error issuing book')
    }
  }

  const handleReturnBook = async (loanId, copyCopyId) => {
    try {
      await loanApi.returnBook({ book_copy_id: copyCopyId })
      alert('Book returned successfully')
      fetchData()
    } catch (error) {
      alert('Error returning book')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Issue & Return Books</h1>

      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('issue')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'issue'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          Issue Book
        </button>
        <button
          onClick={() => setActiveTab('return')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'return'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          Return Book
        </button>
      </div>

      {activeTab === 'issue' && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Issue Book to Student</h2>
          <form onSubmit={handleIssueBook} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={formData.student_id}
              onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </select>
            <select
              value={formData.book_copy_id}
              onChange={(e) => setFormData({ ...formData, book_copy_id: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select Book Copy</option>
              {copies.map((copy) => (
                <option key={copy.id} value={copy.id}>
                  {copy.book?.title} ({copy.barcode})
                </option>
              ))}
            </select>
            <button type="submit" className="btn-primary flex items-center gap-2 justify-center">
              <Send size={18} /> Issue
            </button>
          </form>
        </div>
      )}

      {activeTab === 'return' && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Active Loans</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Book</th>
                  <th>Issued Date</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loans
                  .filter((loan) => loan.status === 'active')
                  .map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.student?.first_name} {loan.student?.last_name}</td>
                      <td>{loan.bookCopy?.book?.title}</td>
                      <td>{new Date(loan.issued_at).toLocaleDateString()}</td>
                      <td>{new Date(loan.due_date).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => handleReturnBook(loan.id, loan.book_copy_id)}
                          className="text-green-600 hover:text-green-800 flex items-center gap-1"
                        >
                          <RotateCcw size={18} /> Return
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
