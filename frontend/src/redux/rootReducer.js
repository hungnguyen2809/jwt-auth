import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';

export const rootReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
});
