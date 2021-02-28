import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'https://vue-project-a3e9a-default-rtdb.firebaseio.com',
  timeout: 1000
});

const axiosAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  timeout: 1000
});

export default {
  axiosBase,
  axiosAuth
};
