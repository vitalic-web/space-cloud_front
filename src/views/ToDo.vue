<template>
  <div id="todo" class="todo-page">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <h1 class="todo-page__title">ToDoList</h1>
    <el-pagination
      class="todo-page__pagination"
      background
      layout="prev, pager, next"
      :hide-on-single-page="!totalCount"
      :page-size="pageSize"
      :total="totalCount"
      :current-page="currentPage"
      @current-change="togglePagination"
    />
    <h2>Not completed</h2>
    <div v-if="toDoList.notCompleted.length" class="todo-list-not-completed">
      <el-card class="todo-item" v-for="todo in toDoList.notCompleted" :key="todo._id">
        <h3 class="todo-item__header">{{ todo.title }}</h3>
        <div class="todo-item__main">
          <p class="todo-item__description">{{ todo.description }}</p>
          <p class="todo-item__comment">
            <span class="todo-item__comment-title">comment: </span>
            {{ todo.comment }}
          </p>
        </div>
        <div class="todo-item__footer">
          <hr class="todo-item__footer-line" />
          <div class="todo-item__footer-buttons">
            <el-switch v-model="todo.completed" @change="updateToDo(todo)" />
            <el-button type="primary" :icon="Edit" circle @click="openEditDialog(todo)" />
          </div>
        </div>
      </el-card>
    </div>
    <div v-else>
      Your uncompleted tasks will be displayed here
    </div>
    <div class="todo-page__line" />
    <h2>Completed</h2>
    <div v-if="toDoList.completed.length" class="todo-list-completed">
      <el-card class="todo-item-completed" v-for="todo in toDoList.completed" :key="todo._id">
        <h3 class="todo-item__header todo-item__header_completed">{{ todo.title }}</h3>
        <el-switch v-model="todo.completed" @change="updateToDo(todo)" />
      </el-card>
    </div>
    <div v-else>
      Your completed tasks will be displayed here
    </div>
    <h2>Add new TODO</h2>
    <el-form
      style="width: 50%"
      :model="newToDoItem"
      status-icon
      label-width="auto"
    >
      <el-form-item label="Title" prop="title">
        <el-input v-model="newToDoItem.title" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="newToDoItem.description" type="textarea" />
      </el-form-item>
      <el-form-item label="Comment" prop="comment">
        <el-input v-model="newToDoItem.comment" />
      </el-form-item>
      <el-form-item id="todo-buttons">
        <el-button type="primary" @click="postToDo()">Add</el-button>
        <el-button @click="clearToDo()">Clear</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="isOpenDialog">
      <el-form
        style="width: 100%; margin-top: 10px;"
        :model="currentEditingTodo"
        status-icon
        label-width="auto"
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="currentEditingTodo.title" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="currentEditingTodo.description" type="textarea" />
        </el-form-item>
        <el-form-item label="Comment" prop="comment">
          <el-input v-model="currentEditingTodo.comment" />
        </el-form-item>
        <el-form-item id="todo-buttons">
          <el-button type="primary" @click="editToDo">Update</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button type="danger" @click="toDoStore.deleteAllToDos">Delete All ToDos</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useToDoStore from '@/stores/todo';
import { Edit } from '@element-plus/icons-vue';
import { IToDoItem } from '@/types';

const toDoStore = useToDoStore();
const {
  toDoList, pageSize, totalCount, currentPage,
} = storeToRefs(toDoStore);

const newToDoItem = reactive({
  title: '',
  description: '',
  completed: false,
  comment: '',
  files: [],
});

const isOpenDialog = ref(false);

let currentEditingTodo = reactive<IToDoItem>({
  title: '',
  description: '',
  completed: false,
  comment: '',
  files: [],
});

const clearToDo = () => {
  newToDoItem.title = '';
  newToDoItem.description = '';
  newToDoItem.completed = false;
  newToDoItem.files = [];
  newToDoItem.comment = '';
};

const postToDo = async () => {
  try {
    await toDoStore.postToDo(newToDoItem);
    clearToDo();
  } catch (err) {
    console.log(err);
  }
};

const updateToDo = async (todo: IToDoItem) => {
  try {
    await toDoStore.editToDo(todo);
  } catch (err) {
    console.log(err);
  }
};

const openEditDialog = (todo: IToDoItem) => {
  currentEditingTodo = reactive(JSON.parse(JSON.stringify(todo)));
  isOpenDialog.value = true;
};

const editToDo = async () => {
  try {
    await toDoStore.editToDo(currentEditingTodo);
    isOpenDialog.value = false;
  } catch (err) {
    console.log(err);
  }
};

const togglePagination = (num: number) => {
  toDoStore.setCurrentPage(num);
  toDoStore.getToDoList();
};

onMounted(() => {
  toDoStore.getToDoList();
});
</script>

<style lang="scss">
.todo-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    margin: 10px 0 0;
  }
  &__line {
    border-bottom: 1px dotted gray;
    width: 80%;
    margin-top: 20px;
  }
  &__pagination {
    margin-top: 10px;
  }
}

.todo-list-not-completed {
  display: grid;
  grid-template-columns: repeat(2, 480px);
  gap: 10px;
  margin-bottom: 30px;
}

.todo-list-completed {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;
}

.todo-item {
  &__header {
    font-size: 25px;
    margin: 0;
    &_completed {
      text-decoration: line-through;
    }
  }
  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  &__description {
    font-size: 20px;
    margin: 5px 0;
  }
  &__comment {
    font-style: italic;
    margin: 0;
  }
  &__comment-title {
    font-weight: bold;
  }
  &__footer {
    display: flex;
    flex-direction: column;
  }
  &__footer-line {
    width: 100%;
  }
  &__footer-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.todo-item-completed .el-card__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row !important;
}

#todo-buttons {
  .el-form-item__content {
    justify-content: center;
  }
}

#todo {
  .el-card__body {
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    box-sizing: border-box;
  }
}
</style>
