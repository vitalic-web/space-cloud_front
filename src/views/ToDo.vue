<template>
  <div id="todo" class="todo-page">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <h1>ToDo</h1>
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
      <el-form-item label="Completed" prop="completed">
        <el-switch v-model="newToDoItem.completed" />
      </el-form-item>
      <el-form-item id="todo-buttons">
        <el-button type="primary" @click="postToDo()">Add</el-button>
        <el-button @click="clearToDo()">Clear</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import useToDoStore from '@/stores/todo';

const toDoStore = useToDoStore();

const newToDoItem = reactive({
  title: '',
  description: '',
  completed: false,
  comment: '',
  files: [],
});

const postToDo = () => {
  console.log('newToDoItem', newToDoItem);
  toDoStore.postToDo(newToDoItem);
};

const clearToDo = () => {
  newToDoItem.title = '';
  newToDoItem.description = '';
  newToDoItem.completed = false;
  newToDoItem.files = [];
  newToDoItem.comments = '';
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
}

#todo-buttons {
  .el-form-item__content {
    justify-content: center;
  }
}
</style>
