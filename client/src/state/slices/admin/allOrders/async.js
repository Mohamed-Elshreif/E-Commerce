import { createAsyncThunk } from "@reduxjs/toolkit";
import { errors } from "../../utilites/errorhandlers";
import { config } from "../../utilites/configHeader";
import axios from "axios";

const API =process.env.REACT_APP_API_URL


///    LIST ALL ORDERS   ///
export const listAllOrders = createAsyncThunk(
  "createOrder/listAllOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.get(`${API}/api/orders`, config(token));
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const deliverOrder = createAsyncThunk(
  "createOrder/deliverOrder",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { orderId } = arg;
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const data = await axios.put(
        `${API}/api/orders/${orderId}/deliver`,
        {},
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);
