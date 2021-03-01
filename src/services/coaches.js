import axios from '@/services/axios';
import localStorageFunc from '@/helpers/persistanceStorage';

const token = localStorageFunc.getItem('accessToken');

const { axiosBase } = axios;

const register = (newId, coachData) =>
  axiosBase.put(`/coaches/${newId}.json?auth=${token}`, coachData);

const getAllCoaches = () => axiosBase.get('/coaches.json');

export default {
  register,
  getAllCoaches
};
