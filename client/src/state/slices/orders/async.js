import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";

const API = process.env.REACT_APP_API_URL;

export const createOrder = createAsyncThunk(
  " createOrder/createOrder",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const {
        userLogin: { userInfo },calcOrder:{items}
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.post(
        `${API}/api/orders`,
        items,
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
  "orderDetails/getOrderDetails",
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
  "orderPay/payOrder",
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
  "listUserOrders/listUserOrders",
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

export const calculateOrber = createAsyncThunk(
  "calcOrderSlice/calculateOrber",
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    try {
      const { cart } = getState();
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };
      const itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.priceSale * item.qty, 0)
      );
      const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
      const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
      const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
      ).toFixed(2);
      const order = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      };
      return order;
    } catch (err) {
      return rejectWithValue(errors(err));
    }
  }
);
