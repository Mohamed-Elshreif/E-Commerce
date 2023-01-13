import { createSlice } from "@reduxjs/toolkit";
import { listAllOrders, deliverOrder } from "./async";

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: { loading: false, orders: [], error: null },
  extraReducers: {
    [listAllOrders.pending]: (state) => {
      state.loading = true;
    },
    [listAllOrders.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
    },
    [listAllOrders.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    orderDeliverRest: (state) => {
      state = {};
    },
  },
  extraReducers: {
    [deliverOrder.pending]: (state) => {
      state.loading = true;
    },
    [deliverOrder.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [deliverOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { orderDeliverRest } = orderDeliverSlice.actions;
export const allOrders = allOrdersSlice.reducer;
export const orderDeliver = orderDeliverSlice.reducer;
