import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  link: { hasLink: false },
};

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducer: {
    openSnackbar: (state, { payload }) => {
      state.isOpen = true;
      state.message = payload.message;
      state.variant = payload.variant;
      state.link = payload.link;
    },
    clearSnackbar: (state) => {
      state.isOpen = false;
    },
  },
});

export default snackBarSlice.reducer;
