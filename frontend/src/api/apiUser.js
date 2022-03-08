import { userActions } from '../redux/userSlice';
import axiosClient from './axiosClient';

const userApi = {
  getAllUser: async (dispatch, navigate) => {
    try {
      dispatch(userActions.getAllUser());
      const { data: response } = await axiosClient.get('/user');
      dispatch(userActions.getAllUserSuccess(response.data));
    } catch (error) {
      dispatch(userActions.getAllUserFail());
    }
  },
  deleteUser: async (id, dispatch) => {
    try {
      dispatch(userActions.deleteUser());
      const { data: response } = await axiosClient.delete(`/user/${id}`);
      dispatch(userActions.deleteUserSuccess(response.message));
    } catch (error) {
      const messageErr = error?.response?.data?.message;
      dispatch(userActions.deleteUserFail(messageErr));
    }
  },
};

export default userApi;
