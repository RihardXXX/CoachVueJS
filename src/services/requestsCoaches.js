import axios from '@/services/axios';
import localStorageFunc from '@/helpers/persistanceStorage';

const token = localStorageFunc.getItem('token');

const { axiosBase } = axios;

const addRequest = (coachId, requestCoach) =>
  axiosBase.post(`/requests/${coachId}.json`, requestCoach);

const getRequests = coachId =>
  axiosBase.get(`/requests/${coachId}.json?auth=${token}`);

export default {
  addRequest,
  getRequests
};
