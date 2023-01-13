import { createSlice } from "@reduxjs/toolkit";
import checkUserAuthToken from "./async";

const initialState = {
  loading: false,
  error: null,
  success: null,
};

export const AuthTokenSlice = createSlice({
  name: "AuthToken",
  initialState,
  reducers: {
    userRestToken: (state) => {
      state = {};
    },
  },
  extraReducers: {
    [checkUserAuthToken.pending]: (state, action) => {
      state.loading = true;
    },
    [checkUserAuthToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    [checkUserAuthToken.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userRestToken } = AuthTokenSlice.actions;
export default AuthTokenSlice.reducer;
