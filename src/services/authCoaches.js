import axios from '@/services/axios';

const { axiosAuth } = axios;

const apiKey = 'AIzaSyBDdZ6jcgv413MMw0Li3zp4iGFwRnyg6Ow';

const signUp = credentials =>
  axiosAuth.post(`/accounts:signUp?key=${apiKey}`, {
    email: credentials.email,
    password: credentials.password,
    returnSecureToken: true
  });

export default {
  signUp
};
