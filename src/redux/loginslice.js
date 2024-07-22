import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isAuthenticated: false,
    user: {},
    error: null,
    role: null,
    isEnableLogin: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; 
      state.currenttheme = action.payload.theme || 'light';
      state.error = null;
      state.role = action.payload.role;
      action.payload.deletedAccount === false && action.payload.flag === true ? state.isEnableLogin = true : state.isEnableLogin = false; 
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload; 
      state.role = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.role = null;
    }
  }
});

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer;