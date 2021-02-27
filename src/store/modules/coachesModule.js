import apiAuth from '@/services/authCoaches';

const state = {
  lastFetch: null,
  errors: null,
  isLoading: false,
  coaches: null,
  isLoggedIn: false
};

export const mutationsTypes = {
  registerCoachStart: '[coachModule] registerCoachStart',
  registerCoachSuccess: '[coachModule] registerCoacnSuccess',
  registerCoachFailure: '[coachModule] registerCoachFailure',

  getAllCoachesStart: '[coachModule] getAllCoachesStart',
  getAllCoachesSuccess: '[coachModule] getAllCoachesSuccess',
  getAllCoachesFailure: '[coachModule] getAllCoachesFailure'
};

export const actionsTypes = {
  registerCoach: '[coachModule] registerCoach',
  getAllCoaches: '[coachModule] getAllCoaches'
};

const mutations = {
  [mutationsTypes.registerCoachStart](state) {
    state.errors = null;
    state.isLoading = true;
  },
  [mutationsTypes.registerCoachSuccess](state) {
    state.errors = null;
    state.isLoading = false;
  },
  [mutationsTypes.registerCoachFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },

  [mutationsTypes.getAllCoachesStart](state) {
    state.isLoading = true;
  },
  [mutationsTypes.getAllCoachesSuccess](state, payload) {
    state.isLoading = false;
    state.coaches = payload;
  },
  [mutationsTypes.getAllCoachesFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },

  setTimeStampFetch(state) {
    state.lastFetch = new Date().getTime();
  }
};

const actions = {
  [actionsTypes.registerCoach](context, coachData) {
    return new Promise(() => {
      context.commit(mutationsTypes.registerCoachStart);

      const newId = context.getters.getUserId;

      apiAuth
        .register(newId, coachData)
        .then(() => {
          context.commit(mutationsTypes.registerCoachSuccess);
        })
        .catch(result => {
          context.commit(
            mutationsTypes.registerCoachFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionsTypes.getAllCoaches](context, payload) {
    return new Promise(() => {
      // start cash
      if (!context.getters.shouldUpdate && !payload.refresh) {
        return;
      }

      context.commit(mutationsTypes.getAllCoachesStart);

      apiAuth
        .getAllCoaches()
        .then(response => {
          // console.log(response.data);

          const coaches = [];

          for (const key in response.data) {
            let value = response.data[key];

            const coach = {
              id: key,
              firstName: value.firstName,
              lastName: value.lastName,
              areas: value.areas,
              hourlyRate: value.hourlyRate,
              description: value.description
            };
            // console.log(coach);
            coaches.push(coach);
          }
          context.commit(mutationsTypes.getAllCoachesSuccess, coaches);
          context.commit('setTimeStampFetch');
        })
        .catch(err => context.commit(mutationsTypes.getAllCoachesFailure, err));
    });
  }
};

const getters = {
  coachesName(state) {
    return state.coaches.reduce((cur, acum) => {
      return (cur = cur + ', ' + acum.firstName);
    }, '');
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
