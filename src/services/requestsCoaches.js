import axios from '@/services/axios';

import storeAuthModule from '@/store/modules/authModule';

const token = storeAuthModule.state.token;

// console.log(token);

const { axiosBase } = axios;

const addRequest = (coachId, requestCoach) =>
  axiosBase.post(`/requests/${coachId}.json`, requestCoach);

const getRequests = coachId =>
  axiosBase.get(`/requests/${coachId}.json?auth=${token}`);

export default {
  addRequest,
  getRequests
};
