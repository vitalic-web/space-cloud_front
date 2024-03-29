import { defineStore } from 'pinia';
import { IAuthState } from '@/types';

const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    username: localStorage.getItem('username') || null,
  }),
  actions: {
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken;
      localStorage.setItem('refreshToken', refreshToken);
    },
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    clearAuthData() {
      this.accessToken = null;
      localStorage.removeItem('accessToken');
      this.refreshToken = null;
      localStorage.removeItem('refreshToken');
      this.username = null;
      localStorage.removeItem('username');
    },
    checkAuth(): boolean {
      this.accessToken = localStorage.getItem('accessToken');
      return !!this.accessToken;
    },
  },
});

export default useAuthStore;
