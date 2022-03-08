import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    currentUser: null,
    loading: false,
    error: false,
  },
  register: {
    error: false,
    loading: false,
  },
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    //Login
    loginUser: (state, action) => {
      state.login.loading = true;
    },
    loginSuccess: (state, action) => {
      state.login.error = false;
      state.login.loading = false;
      state.login.currentUser = action.payload;
    },
    loginFail: (state, action) => {
      state.login.error = true;
      state.login.loading = false;
    },
    // Register
    registerUser: (state, action) => {
      state.register.loading = true;
    },
    registerSuccess: (state, action) => {
      state.register.error = false;
      state.register.loading = false;
    },
    registerFail: (state, action) => {
      state.register.error = true;
      state.register.loading = false;
    },
  },
});

export const authActions = authSlice.actions;
export const selectAuthUser = (state) => state?.auth?.login?.currentUser;

const authReducer = authSlice.reducer;
export default authReducer;
