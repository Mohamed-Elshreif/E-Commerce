import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";

const registerUser = createAsyncThunk(
  "register/registerUser",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { API, name, email, password } = arg;
      const { data } = await axios.post(
        `${API}/api/users`,
        { name, email, password },
        config()
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export default registerUser;
