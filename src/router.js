import { createRouter, createWebHistory } from 'vue-router';

import CoachRegistration from '@/pages/coaches/CoachRegistration';
import CoachList from '@/pages/coaches/CoachList';
import CoachDetail from '@/pages/coaches/CoachDetail';
import ContactCoach from '@/pages/requests/ContactCoach';
import RequestReceived from '@/pages/requests/RequestReceive';
import UserAuth from '@/pages/auth/UserAuth';
import NotFound from './NotFound.vue';
import store from '@/store/modules/authModule';

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
      props: true,
      component: CoachDetail,
      children: [{ path: 'contact', name: 'contact', component: ContactCoach }] // '/coaches/d2/contact'
    },
    {
      path: '/register',
      name: 'register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      name: 'requests',
      component: RequestReceived,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth,
      meta: { requiresUnAuth: true }
    },
    { path: '/:notFound(.*)', name: 'notFound', component: NotFound }
  ]
});

router.beforeEach((to, _, next) => {
  // console.log(store.state.isLoggedIn);
  if (to.meta.requiresAuth && !store.state.isLoggedIn) {
    next({ name: 'auth' });
  } else if (to.meta.requiresUnAuth && store.state.isLoggedIn) {
    next({ name: 'coaches' });
  } else {
    next();
  }
});

export default router;
