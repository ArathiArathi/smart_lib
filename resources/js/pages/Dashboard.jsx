import { useEffect, useState } from 'react'
import { dashboardApi } from '../api'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Book, Truck, AlertCircle } from 'lucide-react'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card flex items-center gap-4">
    <div className={`p-4 rounded-lg ${color}`}>
      <Icon size={32} className="text-white" />
    </div>
    <div>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
)

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [metricsRes, analyticsRes] = await Promise.all([
        dashboardApi.getMetrics(),
        dashboardApi.getAnalytics(),
      ])
      setMetrics(metricsRes.data)
      setAnalytics(analyticsRes.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Students"
          value={metrics?.total_students || 0}
          color="bg-blue-500"
        />
        <StatCard
          icon={AlertCircle}
          label="Pending Approvals"
          value={metrics?.pending_approvals || 0}
          color="bg-yellow-500"
        />
        <StatCard
          icon={Book}
          label="Total Books"
          value={metrics?.total_books || 0}
          color="bg-green-500"
        />
        <StatCard
          icon={Truck}
          label="Books Issued Today"
          value={metrics?.books_issued_today || 0}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Daily Issuance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics?.daily_issuance || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Monthly Borrowing</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics?.monthly_borrowing || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Category-wise Usage</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {analytics?.category_usage?.map((item) => (
                <tr key={item.category}>
                  <td>{item.category}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
