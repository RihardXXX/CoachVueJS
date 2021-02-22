import { createRouter, createWebHistory } from 'vue-router';

import CoachRegistration from '@/pages/coaches/CoachRegistration';
import CoachList from '@/pages/coaches/CoachList';
import CoachDetail from '@/pages/coaches/CoachDetail';
import ContactCoach from '@/pages/requests/ContactCoach';
import RequestReceived from '@/pages/requests/RequestReceive';
import NotFound from './NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      name: 'coaches',
      component: CoachList
    },
    {
      path: '/coaches/:id',
      name: 'coachesID',
      component: CoachDetail,
      children: [{ path: 'contact', name: 'contact', component: ContactCoach }] // '/coaches/d2/contact'
    },
    {
      path: '/register',
      name: 'register',
      component: CoachRegistration
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestReceived
    },
    { path: '/:notFound(.*)', name: 'notFound', component: NotFound }
  ]
});

export default router;
