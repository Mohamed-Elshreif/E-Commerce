import { createSlice } from "@reduxjs/toolkit";
import loginUser from "./async";

// GET user info from local Storage
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  isAuth: false,
  loading: false,
  userInfo,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.isAuth = false;
      state.userInfo = null;
      localStorage.removeItem('userInfo')
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.isAuth = true;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
