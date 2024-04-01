import axios, { InternalAxiosRequestConfig } from 'axios';
import useAuthStore from '@/stores/auth';

const API_BASE_URL = 'http://localhost:3000/';

const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

const privateApi = axios.create({
  baseURL: API_BASE_URL,
});

// Интерсептор для добавления токена в заголовки авторизованных запросов
privateApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const authStore = useAuthStore();
    const { accessToken } = authStore;
    if (accessToken && config.headers) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Интерсептор для обновления токена
privateApi.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  // на бэке если токен невалидный, отправляем статус 403
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    const authStore = useAuthStore();
    try {
      // Запрос на обновление токена
      const res = await publicApi.post('/token', { refreshToken: authStore.refreshToken });
      if (res.status === 200) {
        authStore.setAccessToken(res.data.accessToken);
        // Установкак нового токена и повтор запроса
        originalRequest.headers.authorization = `Bearer ${res.data.accessToken}`;
        return privateApi(originalRequest);
      }
    } catch (e) {
      authStore.clearAuthData();
      return Promise.reject(e);
    }
  }
  return Promise.reject(error);
});

export { publicApi, privateApi };
