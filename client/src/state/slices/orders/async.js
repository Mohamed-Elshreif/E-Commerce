import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";

const API =process.env.REACT_APP_API_URL

export const createOrder = createAsyncThunk(
  " createOrder/createOrder",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { order } = arg;
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.post(
        `${API}/api/orders`,
        order,
        config(token)
      );
      localStorage.removeItem("cartItems");
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

// Order Details
export const getOrderDetails = createAsyncThunk(
  "products/getOrderDetails",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { id } = arg;

      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.get(
        `${API}/api/orders/${id}`,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

//   PAY ORDER AND UPDATE ORDER TO PAID
export const payOrder = createAsyncThunk(
  "products/payOrder",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { orderId, paymentResult } = arg;
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.put(
        `${API}/api/orders/${orderId}/pay`,
        paymentResult,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

///    LIST MY ORDERS (PARTICULAR USER)    ///
export const listUserOrders = createAsyncThunk(
  "products/listUserOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.get(
        `${API}/api/orders/myorders`,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);
