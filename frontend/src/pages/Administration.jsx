import { useEffect, useState } from 'react'
import { adminApi } from '../api'
import { Plus, Trash2, Shield } from 'lucide-react'

export default function Administration() {
  const [activeTab, setActiveTab] = useState('admins')
  const [admins, setAdmins] = useState([])
  const [roles, setRoles] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role_id: '',
  })

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'admins') {
        const response = await adminApi.listAdmins({})
        setAdmins(response.data.data || response.data)
      } else if (activeTab === 'roles') {
        const response = await adminApi.listRoles()
        setRoles(response.data || response.data)
      } else if (activeTab === 'settings') {
        const response = await adminApi.getSettings()
        setSettings(response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    try {
      await adminApi.createAdmin(formData)
      setFormData({ name: '', email: '', password: '', role_id: '' })
      setShowForm(false)
      fetchData()
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating admin')
    }
  }

  const handleDeleteAdmin = async (id) => {
    if (window.confirm('Remove this admin?')) {
      try {
        await adminApi.toggleAdminStatus(id)
        fetchData()
      } catch (error) {
        alert('Error removing admin')
      }
    }
  }

  const handleUpdateSettings = async (key, value) => {
    try {
      await adminApi.updateSettings({ [key]: value })
      alert('Settings updated successfully')
      fetchData()
    } catch (error) {
      alert('Error updating settings')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">System Administration</h1>

      <div className="flex gap-2 border-b flex-wrap">
        <button
          onClick={() => setActiveTab('admins')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'admins'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          Administrators
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'roles'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          Roles & Permissions
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === 'settings'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          Settings
        </button>
      </div>

      {activeTab === 'admins' && (
        <div className="space-y-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} /> Add Admin
          </button>

          {showForm && (
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
              <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field"
                  required
                />
                <select
                  value={formData.role_id}
                  onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <button type="submit" className="btn-primary md:col-span-2">
                  Create Admin
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id}>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.role?.name}</td>
                        <td>
                          <span className={`px-3 py-1 rounded text-sm ${
                            admin.is_admin ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                          }`}>
                            {admin.is_admin ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
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
      )}

      {activeTab === 'roles' && (
        <div className="card">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="border rounded p-4">
                  <div className="flex items-center gap-2">
                    <Shield size={20} className="text-blue-600" />
                    <div>
                      <h3 className="font-semibold">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                      {role.permissions && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {role.permissions.map((perm) => (
                            <span
                              key={perm.id}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {perm.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="card">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Max Books Per Student
                </label>
                <input
                  type="number"
                  value={settings?.max_books_per_student || 5}
                  onChange={(e) =>
                    handleUpdateSettings('max_books_per_student', e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Max Loan Days</label>
                <input
                  type="number"
                  value={settings?.max_loan_days || 14}
                  onChange={(e) => handleUpdateSettings('max_loan_days', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Fine Per Day (₹)</label>
                <input
                  type="number"
                  value={settings?.fine_per_day || 10}
                  onChange={(e) => handleUpdateSettings('fine_per_day', e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Auto Reminder Days
                </label>
                <input
                  type="number"
                  value={settings?.auto_reminder_days || 3}
                  onChange={(e) => handleUpdateSettings('auto_reminder_days', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
