import { defineStore } from 'pinia';
import { IToDoState, IToDoItem } from '@/types';
import { privateApi } from '@/services/api';
import { ElNotification } from 'element-plus';

const useToDoStore = defineStore('todo', {
  state: (): IToDoState => ({
    toDoList: {
      completed: [],
      notCompleted: [],
    },
    pageSize: 2,
    totalCount: 0,
    currentPage: 1,
  }),
  actions: {
    setCurrentPage(value: number) {
      this.currentPage = value;
    },
    async getToDoList() {
      try {
        const todoList = await privateApi.get('/todo-list', {
          params: {
            pageSize: this.pageSize,
            page: this.currentPage,
          },
        });
        this.toDoList = todoList.data.todos;
        this.totalCount = todoList.data.totalCount;
      } catch (err) {
        console.log(err);
      }
    },
    async postToDo(toDoItem: IToDoItem) {
      try {
        const toDoInfo = await privateApi.post('/todos', {
          ...toDoItem,
          paginationInfo: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          },
        });
        const { isLoadLastPage, pageNumber } = toDoInfo.data.paginationInfo;
        if (isLoadLastPage) {
          this.setCurrentPage(pageNumber);
        }
        await this.getToDoList();
      } catch (err) {
        console.log(err);
      }
    },
    async editToDo(toDoItem: IToDoItem) {
      try {
        await privateApi.patch(`/todos/${toDoItem._id}`, {
          ...toDoItem,
        });
        await this.getToDoList();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteAllToDos() {
      try {
        const deletedToDosCount = await privateApi.delete('/todos');
        await this.getToDoList();
        ElNotification({
          title: 'Success',
          message: deletedToDosCount.data.message,
          type: 'success',
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default useToDoStore;
