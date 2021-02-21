import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    user: {},
  },
  reducers: {
    setAuth: (state, action) => {
      state.authenticated = true;
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.authenticated = false;
      state.user = {};
    },
  },
});

export const {setAuth, clearAuth} = authSlice.actions;

export const authReducer = authSlice.reducer;
