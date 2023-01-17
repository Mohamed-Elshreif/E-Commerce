import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {mode : 'light'},
  reducers: {
    changeTheme: (state,{payload}) => {
      state.mode = payload === state.mode ? "dark" : "light";
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
