import { defineStore } from 'pinia';
import { IAuthState } from '@/types';

const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    token: null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('authToken', token);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem('authToken');
    },
    checkAuth(): boolean {
      this.token = localStorage.getItem('authToken');
      return !!this.token;
    },
  },
});

export default useAuthStore;
