import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/index";
import {
  createOrder,
  getOrderDetails,
  payOrder,
  listUserOrders,
} from "./async";

const createOrdersSlice = createSlice({
  name: "createOrder",
  initialState: { loading: false, success: false, error: null, order: {} },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loading = true;
    },
    [createOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.order = payload;
    },
    [createOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    loading: true,
    orderItems: [],
    shippingAddress: {},
    error: null,
  },
  reducers: {
    detailsOrderRest: (state) => {
      state = {};
    },
  },
  extraReducers: {
    [getOrderDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.orderItems = action.payload;
    },
    [getOrderDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    orderPayRest: (state) => {
      state = {};
    },
  },
  extraReducers: {
    [payOrder.pending]: (state) => {
      state.loading = true;
    },
    [payOrder.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [payOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const listUserOrdersSlice = createSlice({
  name: "listUserOrders",
  initialState: { loading: false, orders: [], error: null },
  extraReducers: {
    [listUserOrders.pending]: (state, action) => {
      state.loading = true;
    },
    [listUserOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [listUserOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [logout]: (state) => {
      state.orders = [];
    },
  },
});

export const { createOrderRest } = createOrdersSlice.actions;
export const { detailsOrderRest } = orderDetailsSlice.actions;
export const { orderPayRest } = orderPaySlice.actions;

export const createOrders = createOrdersSlice.reducer;
export const orderPay = orderPaySlice.reducer;
export const orderDetails = orderDetailsSlice.reducer;
export const UserOrders = listUserOrdersSlice.reducer;
