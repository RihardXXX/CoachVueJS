const state = {
  coaches: [
    {
      id: 'c1',
      firstName: 'Maximilian',
      lastName: 'Schwarzmüller',
      areas: ['frontend', 'backend', 'career'],
      description:
        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30
    },
    {
      id: 'c2',
      firstName: 'Julie',
      lastName: 'Jones',
      areas: ['frontend', 'career'],
      description:
        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      hourlyRate: 30
    }
  ]
};

export const mutationsTypes = {
  registerCoachStart: '[coachModule] registerCoachStart',
  registerCoachSuccess: '[coachModule] registerCoacnSuccess',
  registerCoachFailure: '[coachModule] registerCoachFailure'
};

export const actionsTypes = {
  registerCoach: '[coachModule] registerCoach'
};

const mutations = {
  [mutationsTypes.registerCoachStart]() {},
  [mutationsTypes.registerCoachSuccess](state, payload) {
    state.coaches.push(payload);
  },
  [mutationsTypes.registerCoachFailure]() {}
};

const actions = {
  [actionsTypes.registerCoach](context, data) {
    context.commit(mutationsTypes.registerCoachStart);
    // const id = context.state.userId;
    const coachData = {
      id: 'c3',
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    context.commit(mutationsTypes.registerCoachSuccess, coachData);

    context.commit(mutationsTypes.registerCoachFailure);
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
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
