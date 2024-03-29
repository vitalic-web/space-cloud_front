import { defineStore } from 'pinia';
import { IToDoState, IToDoItem } from '@/types';
import { privateApi } from '@/services/api';

const useToDoStore = defineStore('todo', {
  state: (): IToDoState => ({
    toDoList: [],
  }),
  actions: {
    async postToDo(toDoItem: IToDoItem) {
      try {
        await privateApi.post('/todos', {
          ...toDoItem,
        });
      } catch (err) {
        console.log(err);
      }
    },
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
