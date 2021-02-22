import { createStore } from 'vuex';
import requestsModule from '@/store/modules/requestsModule';
import coachesModule from '@/store/modules/coachesModule';

const store = createStore({
  modules: {
    requestsModule,
    coachesModule
  },
  state() {},
  mutations: {},
  actions: {},
  getters: {}
});

export default store;
