import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const mode = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";
export const changeTheme = createAsyncThunk("theme/changeTheme", async(data,thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    localStorage.setItem("theme", data);
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const themeSlice = createSlice({
  name: "theme",
  initialState: { mode },
  extraReducers: {
    [changeTheme.fulfilled]: (state, { payload }) => {
      state.mode = payload 
    },
  },
});

export default themeSlice.reducer;
