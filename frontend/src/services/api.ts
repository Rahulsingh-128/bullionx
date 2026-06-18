import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // swap for cookie/memory in Phase 2
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handling
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Will hook into authStore in Phase 2
      console.warn("Unauthorized — redirect to login");
    }
    return Promise.reject(error);
  },
);

export default api;
