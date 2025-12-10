import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { API_ENDPOINTS } from '../../../src/constant/api'

const initialFormData = {
  name: '',
  priority: 1,
}

const initialNotification = { show: false, message: '', type: 'success' }

export default function AddBrand() {
  const [formData, setFormData] = useState(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [notification, setNotification] = useState(initialNotification)

  const navigate = useNavigate()

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification(initialNotification)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name.trim()) {
      setNotification({ show: true, message: 'Brand name is required', type: 'error' })
      return
    }

    setSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.BRANDS, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          priority: parseInt(formData.priority) || 1,
        })
      })

      const data = await response.json()

      if (data.success) {
        navigate('/admin/brands', {
          state: { message: 'Brand added successfully!', type: 'success' },
        })
      } else {
        throw new Error(data.message || 'Failed to add brand')
      }
    } catch (err) {
      setNotification({ show: true, message: err.message || 'Failed to add brand', type: 'error' })
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => navigate('/admin/brands')

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
          <h2 className="text-2xl font-bold mb-6">Add New Brand</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
           <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <input 
                type="number" 
                name="priority" 
                value={formData.priority} 
                onChange={handleChange} 
                min="0" 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                placeholder="0"
              />
              <p className="text-sm text-gray-500 mt-1">Higher priority brands appear first (default: 0)</p>
            </div>
           
            <div>
              <label className="block text-sm font-medium mb-1">Brand Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" 
                placeholder="Enter Brand name"
              />
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
                {submitting ? 'Adding...' : 'Add Brand'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
