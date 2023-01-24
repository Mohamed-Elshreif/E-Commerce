import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";

const checkUserAuthToken = createAsyncThunk(
  "AuthToken/userAuth",
  async (API, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.get(`${API}/user/auth`, config(token));
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export default checkUserAuthToken;
