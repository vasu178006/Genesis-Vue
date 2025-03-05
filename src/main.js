// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './firebase'; // Ensure Firebase is correctly imported
import './assets/main.css'; // Ensure styles are loaded

const app = createApp(App);

app.use(router);

app.mount('#app');
