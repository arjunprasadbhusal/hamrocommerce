
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { API_ENDPOINTS } from '../../../src/constant/api';

const initialFormData = {
  name: '',
  priority: 0,
}

const initialNotification = { show: false, message: '', type: 'success' }

export default function EditCategory() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notification, setNotification] = useState(initialNotification)

  useEffect(() => {
    loadCategory()
  }, [id])

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(initialNotification), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  const loadCategory = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.CATEGORY_BY_ID(id), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      })
      const data = await response.json()

      if (data.success) {
        const category = data.data
        setFormData({
          name: category.name || '',
          priority: category.priority || 0,
        })
      } else {
        setNotification({ show: true, message: 'Failed to load category', type: 'error' })
      }
    } catch (err) {
      setNotification({ show: true, message: 'Failed to load category', type: 'error' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      return setNotification({ show: true, message: 'Category name is required', type: 'error' })
    }

    setSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      const form = new FormData()
      form.append('name', formData.name)
      form.append('priority', formData.priority)
      form.append('_method', 'PUT')

      const response = await fetch(API_ENDPOINTS.CATEGORY_BY_ID(id), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: form
      })

      const data = await response.json()

      if (data.success) {
        navigate('/admin/categories', {
          state: { message: 'Category updated successfully!', type: 'success' }
        })
      } else {
        throw new Error(data.message || 'Failed to update category')
      }
    } catch (err) {
      setNotification({ show: true, message: err.message || 'Failed to update category', type: 'error' })
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        {notification.show && (
          <div className={`mb-4 p-4 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Category</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <input type="number" name="priority" value={formData.priority} onChange={handleChange} min="0" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              <p className="text-sm text-gray-500 mt-1">Higher priority categories appear first (default: 0)</p>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => navigate('/admin/categories')} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {submitting ? 'Updating...' : 'Update Category'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}