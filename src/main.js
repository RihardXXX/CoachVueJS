import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import BaseCard from '@/components/ui/BaseCard';

const app = createApp(App);

app.component('BaseCard', BaseCard);

app.use(store);
app.use(router);
app.mount('#app');
