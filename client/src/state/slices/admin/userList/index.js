import { createSlice } from "@reduxjs/toolkit";
import getListUsers from "./async";

const initialState = {
  loading: false,
  error: null,
  users: [],
};

export const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    userListRest: (state) => {
      state = {};
    },
  },
  extraReducers: {
    [getListUsers.pending]: (state) => {
      state.loading = true;
    },
    [getListUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      console.log(payload)
    },
    [getListUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { userListRest } = usersListSlice.actions;
export default usersListSlice.reducer;
