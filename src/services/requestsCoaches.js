import axios from '@/services/axios';

const addRequest = (coachId, requestCoach) =>
  axios.post(`/requests/${coachId}.json`, requestCoach);

const getRequests = coachId => axios.get(`/requests/${coachId}.json`);

export default {
  addRequest,
  getRequests
};
