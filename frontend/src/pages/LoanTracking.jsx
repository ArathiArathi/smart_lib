import { useEffect, useState } from 'react'
import { loanTrackingApi } from '../api'
import { Bell } from 'lucide-react'

export default function LoanTracking() {
  const [activeTab, setActiveTab] = useState('dueSoon')
  const [dueSoon, setDueSoon] = useState([])
  const [overdue, setOverdue] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'dueSoon') {
        const response = await loanTrackingApi.getDueSoon({ days: 7 })
        setDueSoon(response.data.loans || response.data)
      } else {
        const response = await loanTrackingApi.getOverdue({})
        setOverdue(response.data.data || response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendReminders = async (type) => {
    try {
      await loanTrackingApi.sendReminders({
        type,
        days: 7,
      })
      alert('Reminders sent successfully')
    } catch (error) {
      alert('Error sending reminders')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Loan Tracking</h1>
        <button
          onClick={() =>
            handleSendReminders(activeTab === 'dueSoon' ? 'due_soon' : 'overdue')
          }
          className="btn-primary flex items-center gap-2"
        >
          <Bell size={18} /> Send Reminders
        </button>
      </div>

      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('dueSoon')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'dueSoon'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          Due Soon (7 days)
        </button>
        <button
          onClick={() => setActiveTab('overdue')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'overdue'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          Overdue
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Book</th>
                  <th>Issued Date</th>
                  <th>Due Date</th>
                  <th>Days Remaining</th>
                </tr>
              </thead>
              <tbody>
                {activeTab === 'dueSoon'
                  ? dueSoon.map((loan) => (
                      <tr key={loan.id}>
                        <td>
                          {loan.student?.first_name} {loan.student?.last_name}
                        </td>
                        <td>{loan.bookCopy?.book?.title}</td>
                        <td>{new Date(loan.issued_at).toLocaleDateString()}</td>
                        <td>{new Date(loan.due_date).toLocaleDateString()}</td>
                        <td>
                          {Math.ceil(
                            (new Date(loan.due_date) - new Date()) / (1000 * 60 * 60 * 24)
                          )}
                        </td>
                      </tr>
                    ))
                  : overdue.map((loan) => (
                      <tr key={loan.id}>
                        <td>
                          {loan.student?.first_name} {loan.student?.last_name}
                        </td>
                        <td>{loan.bookCopy?.book?.title}</td>
                        <td>{new Date(loan.issued_at).toLocaleDateString()}</td>
                        <td>{new Date(loan.due_date).toLocaleDateString()}</td>
                        <td className="text-red-600 font-semibold">
                          {Math.ceil(
                            (new Date() - new Date(loan.due_date)) / (1000 * 60 * 60 * 24)
                          )} days overdue
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
