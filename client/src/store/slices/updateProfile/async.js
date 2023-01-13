import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";

const updateProfile = createAsyncThunk(
  "updateProfile/profile",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { user } = arg;
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.put(
        `${API}/api/users/profile`,
        user,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export default updateProfile;
