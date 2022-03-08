import axios from 'axios';
import jwtDecode from 'jwt-decode';
import merge from 'lodash/merge';
import { authActions } from '../redux/authSlice';
import { store } from '../redux/store';

export const axiosNonAuth = axios.create({
  baseURL: 'http://localhost:8088/api',
});

const axiosClient = axios.create({
  baseURL: 'http://localhost:8088/api',
});

const configure = async (config) => {
  let token = store.getState().auth?.login?.currentUser?.token;
  const decodeToken = jwtDecode(token);
  const expiresToken = Date.now() / 1000 >= decodeToken.exp;

  if(expiresToken){
    const {data: response} = await axiosNonAuth.get('/auth/refreshToken');

    token = response?.data?.token;
    store.dispatch(authActions.loginSuccess({...store.getState().auth.login.currentUser, token }));
  }

  const targetConfig = {
    headers: { 'Auth-DTLO': `Bearer ${token}`, },
  };
  return merge(config, targetConfig);
};

axiosClient.interceptors.request.use(
  async (config) => {
    return await configure(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
