import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../../utilites/errorhandlers";
import { config } from "../../utilites/configHeader";

const API =process.env.REACT_APP_API_URL


const updateUsers = createAsyncThunk(
  "updateUsers/updateUsers",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { user, userId } = arg;
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.put(
        `${API}/api/users/${userId}`,
        user,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export default updateUsers;
