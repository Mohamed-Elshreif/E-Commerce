import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../../utilites/errorhandlers";
import { config } from "../../utilites/configHeader";

const API =process.env.REACT_APP_API_URL


const getListUsers = createAsyncThunk(
  "usersList/getListUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.get(`${API}/api/users`, config(token));
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export default getListUsers;
