import { defineStore } from 'pinia';
import { IAuthState } from '@/types';

const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('authToken', token);
    },
    setUsername(username: string) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    logOut() {
      this.token = null;
      localStorage.removeItem('authToken');
      this.username = null;
      localStorage.removeItem('username');
    },
    checkAuth(): boolean {
      this.token = localStorage.getItem('authToken');
      return !!this.token;
    },
  },
});

export default useAuthStore;
