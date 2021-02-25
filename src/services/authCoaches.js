import axios from '@/services/axios';

const register = (newId, coachData) =>
  axios.put(`/coaches/${newId}.json`, coachData);

const getAllCoaches = () => axios.get('/coaches.json');

export default {
  register,
  getAllCoaches
};
