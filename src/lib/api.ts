import axios from 'axios';

const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the admin password
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add a response interceptor to handle 401 errors (invalid/expired tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't redirect if it's the login request itself failing
      if (error.config.url === '/auth/login' || error.config.url === '/api/auth/login') {
        return Promise.reject(error);
      }

      const adminSlug = import.meta.env.VITE_ADMIN_SLUG || "admin";
      // Only redirect if we are in an admin route to avoid breaking public forms
      if (window.location.pathname.startsWith(`/${adminSlug}`)) {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_role");
        localStorage.removeItem("admin_user");
        window.location.href = `/${adminSlug}`; // Redirect to admin login
      }
    }
    return Promise.reject(error);
  }
);


export const authApi = {
  login: (credentials: any) => api.post("/auth/login", credentials),
};

export const shipmentApi = {
  get: (id: string) => api.get(`/shipments/${id}`),
  getAll: () => api.get('/shipments'),
  create: (data: any) => api.post('/shipments', data),
  update: (id: string, data: any) => api.put(`/shipments/${id}`, data),
  delete: (id: string) => api.delete(`/shipments/${id}`),
  addUpdate: (id: string, data: any) => api.post(`/shipments/${id}/updates`, data),
  communicate: (id: string, data: any) => api.post(`/shipments/${id}/communicate`, data),
  sendInvoice: (id: string, data: any) => api.post(`/shipments/${id}/invoice`, data),
};

export const leadApi = {
  create: (data: any) => api.post('/leads', data),
  getAll: () => api.get('/leads'),
};

export const driverApi = {
  getAll: () => api.get('/drivers'),
  create: (data: any) => api.post('/drivers', data),
  update: (id: string, data: any) => api.put(`/drivers/${id}`, data),
  delete: (id: string) => api.delete(`/drivers/${id}`),
};

export const invoiceApi = {
  getAll: () => api.get('/invoices'),
  create: (data: any) => api.post('/invoices', data),
  update: (id: string, data: any) => api.put(`/invoices/${id}`, data),
  delete: (id: string) => api.delete(`/invoices/${id}`),
};

export const messageApi = {
  getAll: () => api.get('/messages'),
  getByUser: (userId: string) => api.get(`/messages/user/${userId}`),
  create: (data: any) => api.post('/messages', data),
  markAsRead: (id: string) => api.patch(`/messages/${id}/read`),
  delete: (id: string) => api.delete(`/messages/${id}`),
};

export const userApi = {
  getAll: () => api.get('/users'),
  create: (data: any) => api.post('/users', data),
  update: (id: string, data: any) => api.put(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};

export const settingsApi = {
  get: (key: string) => api.get(`/settings/${key}`),
  update: (key: string, data: any) => api.post(`/settings/${key}`, data),
};
