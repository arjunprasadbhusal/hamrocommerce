import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { API_ENDPOINTS } from '../../../src/constant/api'

const initialFormData = {
  name: '',
  category_id: '',
  status: 'Active',
}

const initialNotification = { show: false, message: '', type: 'success' }

export default function AddSubcategory() {
  const [formData, setFormData] = useState(initialFormData)
  const [categories, setCategories] = useState([])
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [notification, setNotification] = useState(initialNotification)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    fetchCategories()
    const categoryId = searchParams.get('category')
    if (categoryId) {
      setFormData(prev => ({ ...prev, category_id: categoryId }))
    }
  }, [])

  useEffect(() => {
    if (formData.category_id && categories.length > 0) {
      const category = categories.find(cat => cat.id == formData.category_id)
      if (category) {
        setSelectedCategoryName(category.name)
      }
    }
  }, [formData.category_id, categories])

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification(initialNotification)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.CATEGORIES, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      })
      const data = await response.json()
      if (data.success) {
        setCategories(data.categories || [])
      } else if (data.data) {
        setCategories(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setNotification({ show: true, message: 'Failed to load categories', type: 'error' })
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      setNotification({ show: true, message: 'Subcategory name is required', type: 'error' })
      return
    }

    if (!formData.category_id) {
      setNotification({ show: true, message: 'Please select a category', type: 'error' })
      return
    }

    setSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.SUBCATEGORIES, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          category_id: parseInt(formData.category_id),
          status: formData.status,
        })
      })

      const data = await response.json()

      if (data.success) {
        navigate('/admin/subcategories', {
          state: { message: 'Subcategory added successfully!', type: 'success' },
        })
      } else {
        throw new Error(data.message || 'Failed to add subcategory')
      }
    } catch (err) {
      setNotification({ show: true, message: err.message || 'Failed to add subcategory', type: 'error' })
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => navigate('/admin/subcategories')

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8">
        {notification.show && (
          <div className={`mb-4 p-4 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Add New Subcategory</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
           

            <div>
              <label className="block text-sm font-medium mb-1">Subcategory Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter subcategory name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={handleCancel} 
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={submitting} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Subcategory'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
