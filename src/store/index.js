import { createStore } from 'vuex';
import requestsModule from '@/store/modules/requestsModule';
import coachesModule from '@/store/modules/coachesModule';

const store = createStore({
  modules: {
    requestsModule,
    coachesModule
  },
  state: {
    userId: 'c1' // this is main id for show request
  },
  mutations: {},
  actions: {},
  getters: {
    getUserId(state) {
      return state.userId;
    }
  }
});

export default store;
