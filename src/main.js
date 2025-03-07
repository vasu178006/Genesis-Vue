// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './firebase'; // Ensure Firebase is correctly imported
import './assets/main.css'; // Ensure styles are loaded

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');
