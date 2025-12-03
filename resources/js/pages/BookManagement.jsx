import { useEffect, useState } from 'react'
import { bookApi } from '../api'
import { Search, Plus, Edit2, Trash2, RotateCcw } from 'lucide-react'

export default function BookManagement() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    author: '',
    edition: '',
    publisher: '',
    category: '',
    rack_location: '',
    shelf_location: '',
    course: '',
    semester: '',
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [search])

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await bookApi.getBooks({ search })
      setBooks(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveBook = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await bookApi.updateBook(editingId, formData)
      } else {
        await bookApi.createBook(formData)
      }
      setFormData({
        isbn: '',
        title: '',
        author: '',
        edition: '',
        publisher: '',
        category: '',
        rack_location: '',
        shelf_location: '',
        course: '',
        semester: '',
      })
      setShowForm(false)
      setEditingId(null)
      fetchBooks()
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving book')
    }
  }

  const handleDeleteBook = async (id) => {
    if (window.confirm('Archive this book?')) {
      try {
        await bookApi.deleteBook(id)
        fetchBooks()
      } catch (error) {
        alert('Error deleting book')
      }
    }
  }

  const handleRestoreBook = async (id) => {
    try {
      await bookApi.restoreBook(id)
      fetchBooks()
    } catch (error) {
      alert('Error restoring book')
    }
  }

  const handleEditBook = (book) => {
    setFormData(book)
    setEditingId(book.id)
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Book Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Book'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Book' : 'Add New Book'}</h2>
          <form onSubmit={handleSaveBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
              className="input-field"
              required
              disabled={!!editingId}
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Edition"
              value={formData.edition}
              onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Publisher"
              value={formData.publisher}
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Rack Location"
              value={formData.rack_location}
              onChange={(e) => setFormData({ ...formData, rack_location: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Shelf Location"
              value={formData.shelf_location}
              onChange={(e) => setFormData({ ...formData, shelf_location: e.target.value })}
              className="input-field"
            />
            <button type="submit" className="btn-primary md:col-span-2">
              {editingId ? 'Update Book' : 'Create Book'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
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
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Copies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.copies?.length || 0}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBook(book)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                        {book.deleted_at && (
                          <button
                            onClick={() => handleRestoreBook(book.id)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <RotateCcw size={18} />
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
