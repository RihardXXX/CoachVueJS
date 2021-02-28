import axios from '@/services/axios';

const { axiosBase } = axios;

const addRequest = (coachId, requestCoach) =>
  axiosBase.post(`/requests/${coachId}.json`, requestCoach);

const getRequests = coachId => axiosBase.get(`/requests/${coachId}.json`);

export default {
  addRequest,
  getRequests
};
