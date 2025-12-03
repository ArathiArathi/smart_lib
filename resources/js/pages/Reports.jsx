import { useEffect, useState } from 'react'
import { reportApi } from '../api'
import { Download } from 'lucide-react'

export default function Reports() {
  const [activeReport, setActiveReport] = useState('issued')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    start_date: '',
    end_date: '',
  })

  useEffect(() => {
    fetchReport()
  }, [activeReport])

  const fetchReport = async () => {
    setLoading(true)
    try {
      let response
      switch (activeReport) {
        case 'issued':
          response = await reportApi.getIssuedBooks(filters)
          break
        case 'returned':
          response = await reportApi.getReturnedBooks(filters)
          break
        case 'overdue':
          response = await reportApi.getOverdueList()
          break
        case 'fine':
          response = await reportApi.getFineCollection({ period: 'monthly' })
          break
        default:
          response = { data: [] }
      }
      setData(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching report:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCSV = async () => {
    try {
      const response = await reportApi.getIssuedBooks(filters)
      const csv = response.data.csv || generateCSV(data)
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv))
      element.setAttribute('download', `report-${activeReport}.csv`)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      alert('Error downloading report')
    }
  }

  const generateCSV = (items) => {
    if (!items || items.length === 0) return ''
    const keys = Object.keys(items[0])
    const header = keys.join(',')
    const rows = items.map((item) => keys.map((key) => item[key]).join(','))
    return [header, ...rows].join('\n')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
        <button onClick={handleDownloadCSV} className="btn-primary flex items-center gap-2">
          <Download size={18} /> Download CSV
        </button>
      </div>

      <div className="card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <button
            onClick={() => setActiveReport('issued')}
            className={`px-4 py-2 rounded ${
              activeReport === 'issued'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Issued Books
          </button>
          <button
            onClick={() => setActiveReport('returned')}
            className={`px-4 py-2 rounded ${
              activeReport === 'returned'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Returned Books
          </button>
          <button
            onClick={() => setActiveReport('overdue')}
            className={`px-4 py-2 rounded ${
              activeReport === 'overdue'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Overdue List
          </button>
          <button
            onClick={() => setActiveReport('fine')}
            className={`px-4 py-2 rounded ${
              activeReport === 'fine'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Fine Collection
          </button>
        </div>

        {(activeReport === 'issued' || activeReport === 'returned') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <input
              type="date"
              value={filters.start_date}
              onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
              className="input-field"
            />
            <input
              type="date"
              value={filters.end_date}
              onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
              className="input-field"
            />
            <button onClick={fetchReport} className="btn-primary">
              Filter
            </button>
          </div>
        )}
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0]).map((key) => (
                      <th key={key}>{key.replace(/_/g, ' ').toUpperCase()}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>
                        {typeof value === 'object'
                          ? JSON.stringify(value)
                          : String(value).substring(0, 50)}
                      </td>
                    ))}
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
