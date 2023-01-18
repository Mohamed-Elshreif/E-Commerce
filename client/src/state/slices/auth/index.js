import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import loginUser from "./async";

// GET user info from local Storage
const userInfo = secureLocalStorage.getItem("userInfo")
  ? JSON.parse(secureLocalStorage.getItem("userInfo"))
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
      state.isAuth = false;
      state.userInfo = null;
      secureLocalStorage.removeItem('userInfo')
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
