import { defineStore } from 'pinia';
import { IToDoState } from '@/types';
import { privateApi } from '@/services/api';

const useToDoStore = defineStore('todo', {
  state: (): IToDoState => ({
    toDoList: [],
  }),
  actions: {
    async getToDoList() {
      try {
        await privateApi.get('/todo-list');
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default useToDoStore;
