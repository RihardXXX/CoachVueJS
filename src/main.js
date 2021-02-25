import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import BaseCard from '@/components/ui/BaseCard';
import BaseButton from '@/components/ui/BaseButton';
import BaseBadge from '@/components/ui/BaseBadge';
import BaseSpinner from '@/components/ui/BaseSpinner';

const app = createApp(App);

app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseBadge', BaseBadge);
app.component('BaseSpinner', BaseSpinner);

app.use(store);
app.use(router);
app.mount('#app');
