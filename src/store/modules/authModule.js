import apiAuth from '@/services/authCoaches';
import localStorageFunc from '@/helpers/persistanceStorage';

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
    state.token = payload.idToken;
    state.userId = payload.localId;
    state.tokenExpiration = payload.expiresIn;
    state.isLoggedIn = true;
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
  },
  [mutationsTypes.signUpFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  }
};

const actions = {
  [actionsTypes.signIn](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.signInStart);

      apiAuth
        .signIn(credentials)
        .then(response => {
          console.log(response.data);

          context.commit(mutationsTypes.signInSuccess, response.data);

          localStorageFunc.setItem('accessToken', response.data.idToken);

          const message = 'you success sign in';
          resolve(message);
        })
        .catch(err => {
          context.commit(mutationsTypes.signInFailure, err);
        });
    });
  },
  [actionsTypes.signUp](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.signUpStart);
      apiAuth
        .signUp(credentials)
        .then(response => {
          // console.log(response.data);
          context.commit(mutationsTypes.signUpSuccess, response.data);
          const message = 'you success sign up';
          resolve(message);
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
  },
  token(state) {
    return state.token;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
