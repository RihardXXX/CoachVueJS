import { createStore } from 'vuex';
import requestsModule from '@/store/modules/requestsModule';
import coachesModule from '@/store/modules/coachesModule';
import authModule from '@/store/modules/authModule';

const store = createStore({
  modules: {
    requestsModule,
    coachesModule,
    authModule
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
});

export default store;
