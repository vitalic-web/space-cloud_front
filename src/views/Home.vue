<template>
  <div class="home">
    <h1>Space Cloud TODO List</h1>
    <h2 v-if="!authStore.checkAuth()">To use the service,
      please <router-link :to="{ name: 'Register' }">register</router-link>
      or <router-link :to="{ name: 'Login' }">log in</router-link>.
    </h2>
    <h2 v-else>
      Hello, {{ username }}!
    </h2>
    <button v-if="authStore.checkAuth()" @click="authStore.logOut()">Log Out</button>
  </div>
</template>

<script setup lang="ts">
import useAuthStore from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { username } = storeToRefs(authStore);
</script>
