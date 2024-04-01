<template>
  <div id="todo" class="todo-page">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <h1>ToDoList</h1>
    <div class="todo-list">
      <el-card class="todo-item" v-for="todo in toDoList" :key="todo._id">
        <h3 class="todo-item__title">{{ todo.title }}</h3>
        <p class="todo-item__description">{{ todo.description }}</p>
        <hr />
        <p class="todo-item__comment">
          <span class="todo-item__comment-title">comment: </span>
          {{ todo.comment }}
        </p>
        <el-switch v-model="todo.completed" />
      </el-card>
    </div>
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
import { storeToRefs } from 'pinia';
import useToDoStore from '@/stores/todo';

const toDoStore = useToDoStore();
const { toDoList } = storeToRefs(toDoStore);

const newToDoItem = reactive({
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

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

.todo-item {
  width: 480px;
  &__title {
    font-size: 25px;
  }
  &__description {
    font-size: 20px;
  }
  &__comment {
    font-style: italic;
  }
  &__comment-title {
    font-weight: bold;
  }
}

#todo-buttons {
  .el-form-item__content {
    justify-content: center;
  }
}
</style>
