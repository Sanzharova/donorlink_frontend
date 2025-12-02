import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'

import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App);

app.use(PrimeVue);
app.use(createPinia());
app.use(router);

app.mount('#app');
