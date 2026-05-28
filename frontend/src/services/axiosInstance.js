import axios from 'axios'
import toast from 'react-hot-toast'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor: attach JWT ──────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    // Read token from redux-persist storage key
    try {
      const persisted = localStorage.getItem('babafly')
      if (persisted) {
        const { auth } = JSON.parse(persisted)
        if (auth?.token) {
          config.headers.Authorization = `Bearer ${auth.token}`
        }
      }
    } catch (_) {}
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor: handle errors globally ─────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired → clear local storage & reload
      localStorage.removeItem('babafly')
      if (window.location.pathname !== '/login') {
        toast.error('Session expired. Please login again.')
        window.location.href = '/login'
      }
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (!error.response) {
      toast.error('Network error. Is the backend running?')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance