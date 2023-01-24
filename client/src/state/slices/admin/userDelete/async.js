import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../../utilites/errorhandlers";
import { config } from "../../utilites/configHeader";

const API =process.env.REACT_APP_API_URL


const deleteUser = createAsyncThunk(
  "deleteUser/deleteUser",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { userId } = arg;
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const data = await axios.delete(
        `${API}/api/users/${userId}`,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export default deleteUser;
