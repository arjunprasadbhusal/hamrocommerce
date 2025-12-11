import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { API_ENDPOINTS } from '../../../src/constant/api';

const initialNotification = { show: false, message: '', type: 'success' };
const initialDeleteState = { show: false, id: null, title: '' };

export default function VedioList() {
  const [vedios, setVedios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(initialNotification);
  const [deleteConfirm, setDeleteConfirm] = useState(initialDeleteState);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchVedios();
  }, []);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification(initialNotification), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        show: true,
        message: location.state.message,
        type: location.state.type || 'success',
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

  const fetchVedios = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.VEDIOS, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      const data = await response.json();
      setVedios(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load videos');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = currentStatus === 'show' ? 'hide' : 'show';
      
      const response = await fetch(API_ENDPOINTS.VEDIO_UPDATE_STATUS(id), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        setNotification({ show: true, message: 'Video status updated successfully!', type: 'success' });
        fetchVedios();
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (err) {
      setNotification({
        show: true,
        message: err.message || 'Failed to update status',
        type: 'error',
      });
    }
  };

  const handleDeleteRequest = (id, title) => {
    setDeleteConfirm({ show: true, id, title });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.VEDIO_BY_ID(deleteConfirm.id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        }
      });

      const data = await response.json();

      if (data.success) {
        setNotification({ show: true, message: 'Video deleted successfully!', type: 'success' });
        fetchVedios();
      } else {
        throw new Error(data.message || 'Failed to delete video');
      }
    } catch (err) {
      setNotification({
        show: true,
        message: err.message || 'Failed to delete video',
        type: 'error',
      });
      console.error('Error deleting video:', err);
    } finally {
      setDeleteConfirm(initialDeleteState);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(initialDeleteState);
  };

  const handleAddNew = () => {
    navigate('/admin/vedios/add');
  };

  const handleEdit = (id) => {
    navigate(`/admin/vedios/${id}/edit`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <div className="bg-red-100 text-red-800 p-4 rounded">
            <p>Error: {error}</p>
            <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded" onClick={fetchVedios}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
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

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Videos</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={handleAddNew}>
            + Add Video
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Video</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {vedios.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                    No videos found
                  </td>
                </tr>
              ) : (
                vedios.map((vedio) => (
                  <tr key={vedio.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {vedio.vedio_full_url ? (
                        <video width="120" height="80" controls className="rounded">
                          <source src={vedio.vedio_full_url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center">🎥</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{vedio.vedio_url || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{vedio.priority}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(vedio.id, vedio.status)}
                        className={`px-3 py-1 text-xs rounded-full ${
                          vedio.status === 'show'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {vedio.status === 'show' ? 'Visible' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => handleEdit(vedio.id)}>
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700" onClick={() => handleDeleteRequest(vedio.id, vedio.title)}>
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
                <p className="mb-2">Are you sure you want to delete <strong>{deleteConfirm.title}</strong>?</p>
                <p className="text-red-600 text-sm">This action cannot be undone and will delete the video file.</p>
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
  );
}
