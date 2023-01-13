import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth";
import registerUser from "./async";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;

      state.userInfo = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },
    [logout]: (state) => {
      state = {};
    },
  },
});

export default registerSlice.reducer;
