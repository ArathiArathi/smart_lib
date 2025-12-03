import { useEffect, useState } from 'react'
import { libraryCardApi, studentApi } from '../api'
import { Plus, Printer, RotateCcw } from 'lucide-react'

export default function LibraryCardManagement() {
  const [students, setStudents] = useState([])
  const [cards, setCards] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const response = await studentApi.getStudents({ search: '', page: 1 })
      setStudents(response.data.data || response.data)
      loadCards(response.data.data || response.data)
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCards = async (studentList) => {
    const cardsMap = {}
    for (const student of studentList) {
      try {
        const response = await libraryCardApi.getCard(student.id)
        cardsMap[student.id] = response.data
      } catch (error) {
        cardsMap[student.id] = null
      }
    }
    setCards(cardsMap)
  }

  const handleGenerateCard = async (studentId) => {
    try {
      await libraryCardApi.generateCard(studentId)
      fetchStudents()
    } catch (error) {
      alert(error.response?.data?.message || 'Error generating card')
    }
  }

  const handleReissueCard = async (studentId) => {
    try {
      await libraryCardApi.reissueCard(studentId)
      fetchStudents()
    } catch (error) {
      alert('Error reissuing card')
    }
  }

  const handlePrintCard = async (studentId) => {
    try {
      await libraryCardApi.printCard(studentId)
      alert('Card ready for printing')
    } catch (error) {
      alert('Error preparing card for print')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Library Card Management</h1>

      <div className="card">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Registration</th>
                  <th>Card Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const card = cards[student.id]
                  return (
                    <tr key={student.id}>
                      <td>{student.first_name} {student.last_name}</td>
                      <td>{student.registration_number}</td>
                      <td>{card?.card_number || 'N/A'}</td>
                      <td>
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          card?.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {card?.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {!card ? (
                            <button
                              onClick={() => handleGenerateCard(student.id)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Generate Card"
                            >
                              <Plus size={18} />
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleReissueCard(student.id)}
                                className="text-orange-600 hover:text-orange-800"
                                title="Reissue Card"
                              >
                                <RotateCcw size={18} />
                              </button>
                              <button
                                onClick={() => handlePrintCard(student.id)}
                                className="text-green-600 hover:text-green-800"
                                title="Print Card"
                              >
                                <Printer size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
