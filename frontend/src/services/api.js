import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5075/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor — unwrap data
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message
      || error.response?.data?.message
      || error.message
      || 'Terjadi kesalahan pada server';
    return Promise.reject(new Error(message));
  }
);

export default api;
