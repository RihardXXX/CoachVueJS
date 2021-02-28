import axios from '@/services/axios';

const { axiosBase } = axios;

const register = (newId, coachData) =>
  axiosBase.put(`/coaches/${newId}.json`, coachData);

const getAllCoaches = () => axiosBase.get('/coaches.json');

export default {
  register,
  getAllCoaches
};
