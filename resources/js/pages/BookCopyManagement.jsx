import { useEffect, useState } from 'react'
import { bookCopyApi, bookApi } from '../api'
import { Plus, Printer } from 'lucide-react'

export default function BookCopyManagement() {
  const [copies, setCopies] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    book_id: '',
    quantity: 1,
  })

  useEffect(() => {
    fetchCopies()
    fetchBooks()
  }, [])

  const fetchCopies = async () => {
    setLoading(true)
    try {
      const response = await bookCopyApi.getCopies({})
      setCopies(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching copies:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBooks = async () => {
    try {
      const response = await bookApi.getBooks({})
      setBooks(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const handleAddCopies = async (e) => {
    e.preventDefault()
    try {
      await bookCopyApi.createCopies(formData)
      setFormData({ book_id: '', quantity: 1 })
      setShowForm(false)
      fetchCopies()
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating copies')
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      await bookCopyApi.updateStatus(id, status)
      fetchCopies()
    } catch (error) {
      alert('Error updating status')
    }
  }

  const handlePrintBarcodes = async (bookId) => {
    try {
      await bookCopyApi.printBarcodes(bookId)
      alert('Barcodes ready for printing')
    } catch (error) {
      alert('Error preparing barcodes')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Book Copies & Inventory</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Copies'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Add Book Copies</h2>
          <form onSubmit={handleAddCopies} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={formData.book_id}
              onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              className="input-field"
              required
            />
            <button type="submit" className="btn-primary">
              Create Copies
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
                  <th>Copy Code</th>
                  <th>Barcode</th>
                  <th>Book</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {copies.map((copy) => (
                  <tr key={copy.id}>
                    <td>{copy.copy_code}</td>
                    <td>{copy.barcode}</td>
                    <td>{copy.book?.title}</td>
                    <td>
                      <select
                        value={copy.status}
                        onChange={(e) => handleUpdateStatus(copy.id, e.target.value)}
                        className="input-field text-sm p-1"
                      >
                        <option value="available">Available</option>
                        <option value="issued">Issued</option>
                        <option value="lost">Lost</option>
                        <option value="damaged">Damaged</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handlePrintBarcodes(copy.book_id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Printer size={18} />
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
