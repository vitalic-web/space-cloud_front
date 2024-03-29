<template>
  <div class="home">
    <h1>Space Cloud TODO List</h1>
    <h2 v-if="!authStore.checkAuth()">To use the service,
      please <router-link :to="{ name: 'Register' }">register</router-link>
      or <router-link :to="{ name: 'Login' }">log in</router-link>.
    </h2>
    <div class="home-user" v-else>
      <h2>Hello, {{ username }}!</h2>
      <router-link :to="{ name: 'ToDo' }">Check your todos</router-link>
      <button
        v-if="authStore.checkAuth()"
        class="home-user__log-out"
        @click="authStore.clearAuthData()"
      >
        Log Out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { username } = storeToRefs(authStore);
</script>

<style lang="scss">
.home-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__log-out {
    margin-top: 20px;
  }
}
</style>
