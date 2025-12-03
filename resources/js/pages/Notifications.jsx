import { useEffect, useState } from 'react'
import { notificationApi, studentApi } from '../api'
import { Send, Mail } from 'lucide-react'

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('send')
  const [students, setStudents] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    student_ids: [],
    title: '',
    message: '',
    type: 'announcement',
  })

  useEffect(() => {
    fetchStudents()
    if (activeTab === 'history') {
      fetchHistory()
    }
  }, [activeTab])

  const fetchStudents = async () => {
    try {
      const response = await studentApi.getStudents({})
      setStudents(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const fetchHistory = async () => {
    setLoading(true)
    try {
      const response = await notificationApi.getHistory({})
      setHistory(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching history:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendNotification = async (e) => {
    e.preventDefault()
    try {
      await notificationApi.sendNotification(formData)
      alert('Notification sent successfully')
      setFormData({
        student_ids: [],
        title: '',
        message: '',
        type: 'announcement',
      })
      fetchHistory()
    } catch (error) {
      alert(error.response?.data?.message || 'Error sending notification')
    }
  }

  const handleSelectAll = () => {
    if (formData.student_ids.length === students.length) {
      setFormData({ ...formData, student_ids: [] })
    } else {
      setFormData({ ...formData, student_ids: students.map((s) => s.id) })
    }
  }

  const handleSelectStudent = (id) => {
    const newIds = formData.student_ids.includes(id)
      ? formData.student_ids.filter((sid) => sid !== id)
      : [...formData.student_ids, id]
    setFormData({ ...formData, student_ids: newIds })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>

      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('send')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'send'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          Send Notification
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          History
        </button>
      </div>

      {activeTab === 'send' && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
          <form onSubmit={handleSendNotification} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Recipients</label>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-sm text-blue-600 hover:underline mb-2"
              >
                {formData.student_ids.length === students.length ? 'Deselect' : 'Select'} All
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto border border-gray-300 p-3 rounded">
                {students.map((student) => (
                  <label key={student.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.student_ids.includes(student.id)}
                      onChange={() => handleSelectStudent(student.id)}
                      className="w-4 h-4"
                    />
                    {student.first_name} {student.last_name}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-field"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="input-field"
              >
                <option value="announcement">Announcement</option>
                <option value="alert">Alert</option>
                <option value="due_reminder">Due Reminder</option>
                <option value="approval_update">Approval Update</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center gap-2 justify-center">
              <Send size={18} /> Send Notification
            </button>
          </form>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="space-y-3">
              {history.map((notif) => (
                <div key={notif.id} className="border-l-4 border-blue-500 bg-gray-50 p-4">
                  <h3 className="font-semibold text-gray-800">{notif.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(notif.created_at).toLocaleString()} • {notif.type}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
