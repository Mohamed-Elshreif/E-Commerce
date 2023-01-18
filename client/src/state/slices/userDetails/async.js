import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";


const API =process.env.REACT_APP_API_URL

const usersDetails = createAsyncThunk(
  "userDetails/details",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { id } = arg;
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.get(`${API}/api/users/${id}`, config(token));
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export default usersDetails;
