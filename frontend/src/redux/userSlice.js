import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: false,
  listUser: [],
  message: ''
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    getAllUser: (state) => {
      state.loading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.listUser = action.payload;
    },
    getAllUserFail: (state, action) => {
      state.loading = false;
      state.error = true;
    },

    deleteUser: (state, action) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = true;
      state.message = action.payload;
    }
  },
});

export const userActions = userSlice.actions;
export const selectAllUser = (state) => state?.user?.listUser;
export const selectMessageErr = (state) => state?.user?.message;

const userReducer = userSlice.reducer;
export default userReducer;
