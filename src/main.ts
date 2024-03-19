import { createApp } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
