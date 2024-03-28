<template>
  <router-link :to="{ name: 'Home' }">Home</router-link>
  <h1>ToDo</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useToDoStore from '@/stores/todo';

const toDoStore = useToDoStore();

onMounted(() => {
  toDoStore.getToDoList();
});
</script>
