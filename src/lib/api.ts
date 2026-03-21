import axios from 'axios';

const API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const shipmentApi = {
  get: (id: string) => api.get(`/shipments/${id}`),
  getAll: () => api.get('/shipments'),
  create: (data: any) => api.post('/shipments', data),
  addUpdate: (id: string, data: any) => api.post(`/shipments/${id}/updates`, data),
  communicate: (id: string, data: any) => api.post(`/shipments/${id}/communicate`, data),
};

export const leadApi = {
  create: (data: any) => api.post('/leads', data),
  getAll: () => api.get('/leads'),
};
