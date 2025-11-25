import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

const API_URL = 'https://localhost:7178/api';
const USER_KEY = 'kanbanUser';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem(USER_KEY)) || null,
    authStatus: null, 
    authError: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => state.user,
  },

  actions: {
    async registerUser(userData) {
      this.authStatus = 'loading'; 
      this.authError = null;
      try {
        const payload = {
          id: 0,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          tasks: [],
          taskHistories: [],
        };

        await axios.post(`${API_URL}/User`, payload);
        
      } catch (error) {
        this.authStatus = 'error';
        this.authError = 'Falha ao registrar. O e-mail pode já estar em uso.';
        console.error('❌ Erro no Registro:', error.response?.data || error);
        throw new Error(this.authError);
      } finally {
        this.authStatus = null;
      }
    },

    async loginUser(credentials) {
      this.authStatus = 'loading';
      this.authError = null;
      try {
        const response = await axios.post(`${API_URL}/User/login`, {
          email: credentials.email,
          password: credentials.password,
        });

        const user = response.data;

        this.user = user;
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.authStatus = 'success';
        router.push('/kanban');
      } catch (error) {
        this.authStatus = 'error';
        this.authError = 'Email ou senha inválidos. Tente novamente.';
        console.error('❌ Erro no Login:', error.response?.data || error);
        throw new Error(this.authError);
      } finally {
        if (this.authStatus !== 'success') {
          this.authStatus = null;
        }
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem(USER_KEY);
      router.push('/');
    },
  },
});