<template>
  <div id="todo" class="todo-page">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <h1 class="todo-page__title">ToDoList</h1>
    <h2>Not completed</h2>
    <div class="todo-list-not-completed">
      <el-card class="todo-item" v-for="todo in toDoList.notCompleted" :key="todo._id">
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
    <h2>Completed</h2>
    <div class="todo-list-completed">
      <el-card class="todo-item-completed" v-for="todo in toDoList.completed" :key="todo._id">
        <h3 class="todo-item__title todo-item__title_completed">{{ todo.title }}</h3>
        <el-switch v-model="todo.completed" />
      </el-card>
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
  &__title {
    margin: 10px 0 0;
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
  //width: 480px;
  &__title {
    font-size: 25px;
    margin: 0;
    &_completed {
      text-decoration: line-through;
    }
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
}

.todo-item-completed .el-card__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#todo-buttons {
  .el-form-item__content {
    justify-content: center;
  }
}

#todo {
  .el-card__body {
    padding: 10px;
  }
}
</style>
