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
  signUpFailure: '[authNodule] signUpFailure',

  logoutStart: '[authModule] logoutStart'
};

export const actionsTypes = {
  signIn: '[authModule] signIn',
  signUp: '[authModule] signUp',
  logout: '[authModule] logout',
  trySignIn: '[authModule] trySignIn'
};

const mutations = {
  [mutationsTypes.signInStart](state) {
    state.isLoading = true;
  },
  [mutationsTypes.signInSuccess](state, payload) {
    state.isLoading = false;
    state.token = payload.idToken;
    state.userId = payload.localId;
    state.isLoggedIn = true;
  },
  changeTimeTokenExpiration(state, payload) {
    state.tokenExpiration = payload;
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
  },

  [mutationsTypes.logoutStart](state) {
    state.token = null;
    state.userId = null;
    state.tokenExpiration = null;
    state.isLoggedIn = false;
  }
};

const actions = {
  [actionsTypes.signIn](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.signInStart);

      apiAuth
        .signIn(credentials)
        .then(response => {
          // console.log(response.data);

          context.commit(mutationsTypes.signInSuccess, response.data);

          const expiresIn = +response.data.expiresIn * 1000;
          const expirationDate = new Date().getTime() + expiresIn;

          localStorageFunc.setItem('token', response.data.idToken);
          localStorageFunc.setItem('userId', response.data.idToken);
          localStorageFunc.setItem('tokenExpiration', expirationDate);

          context.commit('changeTimeTokenExpiration', expirationDate);

          const message = 'you success sign in';
          resolve(message);
        })
        .catch(err => {
          context.commit(mutationsTypes.signInFailure, err);
        });
    });
  },
  [actionsTypes.trySignIn](context) {
    const token = localStorageFunc.getItem('token');
    const userId = localStorageFunc.getItem('userId');
    const tokenExpiration = localStorageFunc.getItem('tokenExpiration');

    // const expiresIn = +tokenExpiration - new Date().getTime();

    if (token && userId) {
      context.commit(mutationsTypes.signInSuccess, {
        token: token,
        userId: userId,
        tokenExpiration: tokenExpiration
      });
    }
  },
  [actionsTypes.signUp](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.signUpStart);
      apiAuth
        .signUp(credentials)
        .then(response => {
          // console.log(response.data);
          context.commit(mutationsTypes.signUpSuccess, response.data);
          const message = 'you success sign up, please sign in';
          resolve(message);
        })
        .catch(err => {
          context.commit(mutationsTypes.signUpFailure, err);
        });
    });
  },
  [actionsTypes.logout](context) {
    return new Promise(resolve => {
      localStorageFunc.setItem('token', '');
      localStorageFunc.setItem('userId', '');
      localStorageFunc.setItem('tokenExpiration', '');
      context.commit(mutationsTypes.logoutStart);
      resolve('your logout');
    });
  }
};

const getters = {
  getUserId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  getIsloggedIn(state) {
    return state.isLoggedIn;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
