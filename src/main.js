import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//createApp(App).mount('#app')

import router from './router'; // اضافه کردن router

const app = createApp(App);
app.use(router); // استفاده از router
app.mount('#app');