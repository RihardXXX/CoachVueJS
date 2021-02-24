const state = {
  requests: []
};

export const mutationsTypes = {
  addRequestStart: '[requestsModule] addRequestStart',
  addRequestSuccess: '[requestsModule] addRequestSuccess',
  addRequestFailure: '[requestsModule] addRequestFailure'
};

export const actionsTypes = {
  addRequest: '[requestsModule] addRequest'
};

const mutations = {
  [mutationsTypes.addRequestStart]() {},
  [mutationsTypes.addRequestSuccess](state, payload) {
    state.requests.unshift(payload);
  },
  [mutationsTypes.addRequestFailure]() {}
};

const actions = {
  [actionsTypes.addRequest](context, request) {
    try {
      context.commit(mutationsTypes.addRequestStart);
      const newRequest = {
        id: new Date().toISOString(),
        coachId: request.coachId,
        email: request.email,
        message: request.message
      };
      context.commit(mutationsTypes.addRequestSuccess, newRequest);
    } catch (error) {
      context.commit(mutationsTypes.addRequestFailure);
    }
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
