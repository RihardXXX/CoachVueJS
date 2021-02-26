import apiRequest from '@/services/requestsCoaches';

const state = {
  requests: null,
  isLoading: false,
  errors: null
};

export const mutationsTypes = {
  addRequestStart: '[requestsModule] addRequestStart',
  addRequestSuccess: '[requestsModule] addRequestSuccess',
  addRequestFailure: '[requestsModule] addRequestFailure',

  getRequestsStart: '[requestModule] getRequestsStart',
  getRequestsSuccess: '[requestModule] getRequestsSuccess',
  getRequestsFailure: '[requestModule] getRequestsFailure'
};

export const actionsTypes = {
  addRequest: '[requestsModule] addRequest',
  getRequests: '[requestsModule] getRequests'
};

const mutations = {
  [mutationsTypes.addRequestStart](state) {
    state.isLoading = true;
    state.errors = null;
  },
  [mutationsTypes.addRequestSuccess](state) {
    state.isLoading = false;
  },
  [mutationsTypes.addRequestFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },

  [mutationsTypes.getRequestsStart](state) {
    state.isLoading = true;
  },
  [mutationsTypes.getRequestsSuccess](state, payload) {
    state.isLoading = false;
    state.requests = payload;
  },
  [mutationsTypes.getRequestsFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  }
};

const actions = {
  [actionsTypes.addRequest](context, credentials) {
    return new Promise(() => {
      context.commit(mutationsTypes.addRequestStart);
      const { coachId, requestCoach } = credentials;
      apiRequest
        .addRequest(coachId, requestCoach)
        .then(() => {
          context.commit(mutationsTypes.addRequestSuccess);
        })
        .catch(err => {
          context.commit(mutationsTypes.addRequestFailure, err);
        });
    });
  },
  [actionsTypes.getRequests](context, credentials) {
    return new Promise(() => {
      context.commit(mutationsTypes.getRequestsStart);
      const coachId = credentials;
      apiRequest
        .getRequests(coachId)
        .then(response => {
          const requests = [];
          // console.log(response.data);
          for (const key in response.data) {
            const request = response.data[key];
            // console.log(request);
            const newRequest = {
              id: key,
              coachId: coachId,
              email: request.email,
              message: request.message
            };
            requests.push(newRequest);
          }

          context.commit(mutationsTypes.getRequestsSuccess, requests);
        })
        .catch(err => {
          context.commit(mutationsTypes.getRequestsFailure, err);
        });
    });
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
