import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { API_ENDPOINTS } from '../../../src/constant/api';

const initialFormData = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category_id: '',
  subcategory_id: '',
}

const initialNotification = { show: false, message: '', type: 'success' }

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [filteredSubcategories, setFilteredSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [notification, setNotification] = useState(initialNotification)

  useEffect(() => {
    fetchCategoriesAndSubcategories()
    loadProduct()
  }, [id])

  useEffect(() => {
    if (formData.category_id) {
      const filtered = subcategories.filter(sub => sub.category_id === parseInt(formData.category_id))
      console.log('Selected category:', formData.category_id)
      console.log('Filtered subcategories:', filtered)
      setFilteredSubcategories(filtered)
    } else {
      setFilteredSubcategories([])
    }
  }, [formData.category_id, subcategories])

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(initialNotification), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  const fetchCategoriesAndSubcategories = async () => {
    try {
      const token = localStorage.getItem('token')
      const [catResponse, subCatResponse] = await Promise.all([
        fetch(API_ENDPOINTS.CATEGORIES, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        }),
        fetch(API_ENDPOINTS.SUBCATEGORIES, {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        })
      ])
      const catData = await catResponse.json()
      const subCatData = await subCatResponse.json()
      console.log('Categories:', catData.data)
      console.log('Subcategories:', subCatData.data)
      setCategories(catData.data || [])
      setSubcategories(subCatData.data || [])
    } catch (err) {
      console.error('Failed to load categories/subcategories:', err)
    }
  }

  const loadProduct = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      })
      const data = await response.json()

      if (data.success) {
        const product = data.data
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          stock: product.stock || '',
          category_id: product.category_id || '',
          subcategory_id: product.subcategory_id || '',
        })
        setPhotoPreview(product.photo_url || '')
      } else {
        setNotification({ show: true, message: 'Failed to load product', type: 'error' })
      }
    } catch (err) {
      setNotification({ show: true, message: 'Failed to load product', type: 'error' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === "category_id") {
      setFormData({ ...formData, category_id: value, subcategory_id: '' })
      return
    }
    
    setFormData({ ...formData, [name]: value })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      return setNotification({ show: true, message: 'Please upload a valid image', type: 'error' })
    }

    if (file.size > 2048 * 1024) {
      return setNotification({ show: true, message: 'Image must be smaller than 2MB', type: 'error' })
    }

    const url = URL.createObjectURL(file)
    setPhotoFile(file)
    setPhotoPreview(url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      return setNotification({ show: true, message: 'Product name is required', type: 'error' })
    }

    if (!formData.price || formData.price < 0) {
      return setNotification({ show: true, message: 'Valid price is required', type: 'error' })
    }

    if (!formData.stock || formData.stock < 0) {
      return setNotification({ show: true, message: 'Valid stock is required', type: 'error' })
    }

    setSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      const form = new FormData()
      form.append('name', formData.name)
      form.append('description', formData.description || '')
      form.append('price', formData.price)
      form.append('stock', formData.stock)
      if (formData.category_id) form.append('category_id', formData.category_id)
      if (formData.subcategory_id) form.append('subcategory_id', formData.subcategory_id)
      if (photoFile) form.append('photopath', photoFile)
      form.append('_method', 'PUT')

      const response = await fetch(API_ENDPOINTS.PRODUCT_BY_ID(id), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: form
      })

      const data = await response.json()

      if (data.success) {
        navigate('/admin/products', {
          state: { message: 'Product updated successfully!', type: 'success' }
        })
      } else {
        throw new Error(data.message || 'Failed to update product')
      }
    } catch (err) {
      setNotification({ show: true, message: err.message || 'Failed to update product', type: 'error' })
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
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price *</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stock *</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select name="subcategory_id" value={formData.subcategory_id} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={!formData.category_id}>
                  <option value="">{formData.category_id ? 'Select Subcategory' : 'Select Category First'}</option>
                  {filteredSubcategories.map(subcat => <option key={subcat.id} value={subcat.id}>{subcat.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Image (Max 2MB)</label>
                <input type="file" name="photopath" accept="image/*" onChange={handlePhotoChange} className="w-full px-3 py-2 border rounded-lg" />
                {photoPreview && <img src={photoPreview} alt="Product" className="mt-2 w-20 h-20 object-cover rounded" />}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => navigate('/admin/products')} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {submitting ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
