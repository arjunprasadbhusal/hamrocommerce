import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { API_ENDPOINTS } from '../../../src/constant/api';

const initialFormData = {
  vedio_file: null,
  existing_vedio_url: '',
  priority: '0',
  status: 'show',
};

const initialNotification = { show: false, message: '', type: 'success' };

export default function EditVedio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(initialNotification);

  useEffect(() => {
    loadVideo();
  }, [id]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(initialNotification), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const loadVideo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.VEDIO_BY_ID(id), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });
      const data = await response.json();

      if (data.success) {
        const vedio = data.data;
        setFormData({
          vedio_file: null,
          existing_vedio_url: vedio.vedio_url || '',
          priority: vedio.priority || '0',
          status: vedio.status || 'show',
        });
      } else {
        setNotification({ show: true, message: 'Failed to load video', type: 'error' });
      }
    } catch (err) {
      setNotification({ show: true, message: 'Failed to load video', type: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'vedio_file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');

      const formDataToSend = new FormData();
      if (formData.vedio_file) {
        formDataToSend.append('vedio_file', formData.vedio_file);
      }
      formDataToSend.append('priority', formData.priority);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('_method', 'PUT');

      const response = await fetch(API_ENDPOINTS.VEDIO_BY_ID(id), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        navigate('/admin/vedios', {
          state: { message: 'Video updated successfully!', type: 'success' }
        });
      } else {
        throw new Error(data.message || 'Failed to update video');
      }
    } catch (err) {
      setNotification({ show: true, message: err.message || 'Failed to update video', type: 'error' });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

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
          <h2 className="text-2xl font-bold mb-6">Edit Video</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Current Video</label>
                {formData.existing_vedio_url ? (
                  <div className="mb-2 p-3 bg-gray-50 rounded border">
                    <p className="text-sm text-gray-600 break-all">{formData.existing_vedio_url}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-2">No video uploaded</p>
                )}
                <label className="block text-sm font-medium mb-1 mt-3">Upload New Video (Optional)</label>
                <input
                  type="file"
                  name="vedio_file"
                  onChange={handleChange}
                  accept="video/mp4,video/mov,video/avi,video/wmv,video/x-flv,video/x-matroska"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Supported formats: MP4, MOV, AVI, WMV, FLV, MKV (Max: 100MB)</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Priority *</label>
                <input
                  type="number"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Lower number = higher priority</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="show">Visible</option>
                  <option value="hide">Hidden</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/vedios')}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Updating...' : 'Update Video'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
