import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";

const API = process.env.REACT_APP_API_URL;

const loginUser = createAsyncThunk("auth/authUser", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const { email, password } = arg;
    const { data } = await axios.post(
      `${API}/api/users/login`,
      { email, password },
      config()
    );
    
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    return rejectWithValue(errors(error));
  }
});


export default loginUser;
