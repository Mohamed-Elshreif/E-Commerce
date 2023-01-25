import { createSlice } from "@reduxjs/toolkit";


const mode = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
export const changeTheme = (data) => {
  data === 'light' ?  localStorage.setItem('theme', 'light'):  localStorage.setItem('theme', 'dark')
  return data
}
export const themeSlice = createSlice({
  name: "theme",
  initialState: {mode},
  extraReducers: {
    changeTheme: (state,{payload}) => {
      state.mode = payload === state.mode ? "dark" : "light";
    },
  },
});

export default themeSlice.reducer;
