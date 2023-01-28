import { createSlice } from "@reduxjs/toolkit";
import updateProfile from "./async";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

export const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {
    userUpdateRest: (state) => {
      state.success = false;
      state.loading = false;
      state.userInfo = null;
      state.error = null
    },
  },
  extraReducers: {
    [updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userUpdateRest } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
