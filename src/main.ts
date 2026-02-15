import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import './style.css';

import { createPinia } from 'pinia';
import router from './router';
import { ToastService, Tooltip } from "primevue";

const app = createApp(App);

const BloodPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}'
    }
  }
});

app.use(PrimeVue, {
  theme: {
    preset: BloodPreset,
    options: {
      prefix: 'p',
      darkModeSelector: 'none',
      cssLayer: false
    }
  }
});

app.directive('tooltip', Tooltip);
app.use(ToastService);
app.use(createPinia());
app.use(router);

app.mount('#app');
