import { createSlice } from "@reduxjs/toolkit";
import updateUser from "./async";

const initialState = {
  loading: false,
  error: null,
  user: null,
  success: false,
};

const updateUsersSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    userUpdateRest: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: {
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userUpdateRest } = updateUsersSlice.actions;
export default updateUsersSlice.reducer;
