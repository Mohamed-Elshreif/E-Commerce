import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  link: { hasLink: false },
};

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    openSnackbar: (state, { payload }) => {
      state.isOpen = true;
      state.message = payload.message;
      state.variant = payload.variant;
      state.link = payload.link || { hasLink: false };
    },
    clearSnackbar: (state) => {
      state.isOpen = false;
    },
  },
});

export const {openSnackbar,clearSnackbar} = snackBarSlice.actions
export default snackBarSlice.reducer;
