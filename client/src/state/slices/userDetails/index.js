import { createSlice } from "@reduxjs/toolkit";
import userDetails from "./async";
import { logout } from "../auth/index";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  extraReducers: {
    [userDetails.pending]: (state) => {
      state.loading = true;
    },
    [userDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [userDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [logout]: (state) => {
      state.user = null;
    },
  },
});

export default userDetailsSlice.reducer;
