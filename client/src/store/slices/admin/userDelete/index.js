import { createSlice } from "@reduxjs/toolkit";
import deleteUser from "./async";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: "",
};

export const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  extraReducers: {
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.message = payload;
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default deleteUserSlice.reducer;
