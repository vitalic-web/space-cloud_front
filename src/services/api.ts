import axios, { InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '@/stores/auth';

const API_BASE_URL = 'http://localhost:3000/';

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

const privateApi = axios.create({
  baseURL: API_BASE_URL,
});

// Интерсептор для добавления токена в заголовки авторизованных запросов
privateApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const authStore = useAuthStore();
    const { token } = authStore;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export { privateApi };
