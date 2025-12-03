import { useEffect, useState } from 'react'
import { academicCalendarApi } from '../api'
import { Plus, Trash2 } from 'lucide-react'

export default function AcademicCalendar() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    end_date: '',
    type: 'event',
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await academicCalendarApi.getEvents({})
      setEvents(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvent = async (e) => {
    e.preventDefault()
    try {
      await academicCalendarApi.createEvent(formData)
      setFormData({
        title: '',
        description: '',
        event_date: '',
        end_date: '',
        type: 'event',
      })
      setShowForm(false)
      fetchEvents()
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating event')
    }
  }

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Delete this event?')) {
      try {
        await academicCalendarApi.deleteEvent(id)
        fetchEvents()
      } catch (error) {
        alert('Error deleting event')
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Academic Calendar</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Event'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Add Calendar Event</h2>
          <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="input-field"
            >
              <option value="event">Event</option>
              <option value="holiday">Holiday</option>
              <option value="exam">Exam</option>
              <option value="library_closed">Library Closed</option>
            </select>
            <input
              type="date"
              value={formData.event_date}
              onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field md:col-span-2"
              rows="3"
            />
            <button type="submit" className="btn-primary md:col-span-2">
              Create Event
            </button>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {event.type}
                      </span>
                    </td>
                    <td>{new Date(event.event_date).toLocaleDateString()}</td>
                    <td>{event.end_date ? new Date(event.end_date).toLocaleDateString() : 'N/A'}</td>
                    <td>{event.description?.substring(0, 50)}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
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
