import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";

const API = process.env.REACT_APP_API_URL;

const registerUser = createAsyncThunk(
  "register/registerUser",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { name, email, password } = arg;
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
