import axios from 'axios';

/**
 * Centeralized API Instance
 * Handles baseURL, headers, and token injection automatically.
 */
const isDevelopment = window.location.hostname === 'localhost';
const BACKEND_URL = isDevelopment 
  ? 'http://localhost:5000' 
  : 'https://hackathon-project-micro-fiverr-backend.onrender.app'; // Replace with your actual Render URL

const api = axios.create({
  baseURL: isDevelopment ? '/api' : `${BACKEND_URL}/api`,
  timeout: 10000,   // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject JWT token if it exists In localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('⚠️ Unauthorized access! Clearing local storage...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Optional: Redirect to login
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;
