import apiAuth from '@/services/authCoaches';

const state = {
  isLoggedIn: false,
  isLoading: false,
  errors: null,
  userId: null,
  token: null,
  tokenExpiration: null
};

export const mutationsTypes = {
  signInStart: '[authModule] signInStart',
  signInSuccess: '[authModule] signInSuccess',
  signInFailure: '[authModule] signInFailure',

  signUpStart: '[authNodule] signUpStart',
  signUpSuccess: '[authNodule] signUpSuccess',
  signUpFailure: '[authNodule] signUpFailure'
};

export const actionsTypes = {
  signIn: '[authModule] signIn',
  signUp: '[authModule] signUp'
};

const mutations = {
  [mutationsTypes.signInStart](state) {
    state.isLoading = true;
  },
  [mutationsTypes.signInSuccess](state, payload) {
    state.isLoading = false;
    state.isLoading = true;
    state.auth = payload;
  },
  [mutationsTypes.signInFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },

  [mutationsTypes.signUpStart](state) {
    state.isLoading = true;
  },
  [mutationsTypes.signUpSuccess](state, payload) {
    state.isLoading = false;
    state.token = payload.idToken;
    state.userId = payload.localId;
    state.tokenExpiration = payload.expiresIn;
    // state.isLoggedIn = true;
  },
  [mutationsTypes.signUpFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  }
};

const actions = {
  // [actionsTypes.signIn](context, credentials) {
  //   return new Promise(() => {});
  // },
  [actionsTypes.signUp](context, credentials) {
    return new Promise(() => {
      context.commit(mutationsTypes.signUpStart);
      apiAuth
        .signUp(credentials)
        .then(response => {
          // console.log(response.data);
          context.commit(mutationsTypes.signUpSuccess, response.data);
        })
        .catch(err => {
          context.commit(mutationsTypes.signUpFailure, err);
        });
    });
  }
};

const getters = {
  getUserId(state) {
    return state.userId;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
