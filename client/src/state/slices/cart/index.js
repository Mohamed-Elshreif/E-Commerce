import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../orders/async";
import _omit from "lodash.omit";
import {
  addToCart,
  removeFromCart,
  addShippingAddress,
  addPaymentMethod,
  emptyCart,
} from "./async";

// GET all cart Items from local Storage
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// GET shipping Address from local Storage
const shippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// GET payment Method from local Storage
const paymentMethod = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod")).method
  : "";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems,
    shippingAddress,
    paymentMethod,
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, { payload }) => {
      const existItem = state.cartItems.find(
        (x) => x.product === payload.product
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.product === existItem.product ? payload : item
        );
      } else {
        state.cartItems.push(payload);
      }
    },
    [removeFromCart.fulfilled]: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((p) => p.product !== payload);
    },
    [addShippingAddress.fulfilled]: (state, { payload }) => {
      state.shippingAddress = payload;
    },
    [addPaymentMethod.fulfilled]: (state, { payload }) => {
      state.paymentMethod = payload;
    },
    [emptyCart]: (state) => {
      state.cartItems = [];
    },
    [createOrder.fulfilled]: (state) => {
      state.cartItems = [];
    },
  },
});

const cartDrawerSlice = createSlice({
  name: "cartDrawer",
  initialState: false,
  reducer:{
    cartOpenDrawer: (state,{payload}) => {
      state = payload
    }
  }
})



export const {cartOpenDrawer} = cartDrawerSlice.actions
export const cartDrawer = cartDrawerSlice.reducer
export const cart = cartSlice.reducer;
