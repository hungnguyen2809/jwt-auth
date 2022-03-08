import { authActions } from '../redux/authSlice';
import { axiosNonAuth } from './axiosClient';

const authApi = {
  loginUser: async (user, dispatch, navigate) => {
    try {
      dispatch(authActions.loginUser());
      const { data: response } = await axiosNonAuth.post('/auth/login', user);
      dispatch(authActions.loginSuccess(response.data));
      navigate('/');
    } catch (error) {
      dispatch(authActions.loginFail());
    }
  },
  registerUser: async (user, dispatch, navigate) => {
    try {
      dispatch(authActions.registerUser());
      const { data: response } = await axiosNonAuth.post('/auth/register', user);
      dispatch(authActions.registerSuccess(response.data));
      navigate('/login');
    } catch (error) {
      dispatch(authActions.registerFail());
    }
  },
};

export default authApi;
