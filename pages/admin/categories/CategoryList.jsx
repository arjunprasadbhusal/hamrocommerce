import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { API_ENDPOINTS } from '../../../src/constant/api'

const initialNotification = { show: false, message: '', type: 'success' }
const initialDeleteState = { show: false, id: null, name: '' }

export default function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(initialNotification)
  const [deleteConfirm, setDeleteConfirm] = useState(initialDeleteState)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(initialNotification), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        show: true,
        message: location.state.message,
        type: location.state.type || 'success',
      })
      navigate(location.pathname, { replace: true })
    }
  }, [location.pathname, location.state, navigate])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.CATEGORIES, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      })

      const data = await response.json()
      const sortedCategories = (data.data || []).sort((a, b) => b.priority - a.priority)
      setCategories(sortedCategories)
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load categories')
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRequest = (id, name) => {
    setDeleteConfirm({ show: true, id, name })
  }

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.CATEGORY_BY_ID(deleteConfirm.id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      })

      const data = await response.json()

      if (data.success) {
        setNotification({ show: true, message: 'Category deleted successfully!', type: 'success' })
        fetchCategories()
      } else {
        throw new Error(data.message || 'Failed to delete category')
      }
    } catch (err) {
      setNotification({
        show: true,
        message: err.message || 'Failed to delete category',
        type: 'error',
      })
      console.error('Error deleting product:', err)
    } finally {
      setDeleteConfirm(initialDeleteState)
    }
  }

  const cancelDelete = () => {
    setDeleteConfirm(initialDeleteState)
  }

  const handleAddNew = () => {
    navigate('/admin/categories/add')
  }

  const handleEdit = (id) => {
    navigate(`/admin/categories/${id}/edit`)
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-64 p-8 flex items-center justify-center">
          <div className="text-xl">Loading categories...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-64 p-8">
          <div className="bg-red-100 text-red-800 p-4 rounded">
            <p>Error: {error}</p>
            <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded" onClick={fetchCategories}>
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto ml-64 p-8">
        {notification.show && (
          <div className={`mb-4 p-4 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Categories</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleAddNew}>
            + Add Category
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{category.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {category.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(category.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => handleEdit(category.id)}>
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700" onClick={() => handleDeleteRequest(category.id, category.name)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={cancelDelete}>
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Confirm Delete</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={cancelDelete}>×</button>
              </div>
              <div className="mb-6">
                <p className="mb-2">Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?</p>
                <p className="text-red-600 text-sm">This action cannot be undone.</p>
              </div>
              <div className="flex gap-3 justify-end">
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50" onClick={cancelDelete}>Cancel</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
