import { createSlice } from "@reduxjs/toolkit";
import { listProductDetails, createProductReview } from "./async";

const productDetailsSlice = createSlice({
  name: " productDetails",
  initialState: { loading: false, product: { reviews: [] }, error: null },
  extraReducers: {
    [listProductDetails.pending]: (state) => {
      state.loading = true;
    },
    [listProductDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    },
    [listProductDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

const productCreateReviewSlice = createSlice({
  name: "productCreateReview",
  initialState: { loading: false, success: false, error: null },
  reducers: {
    productReviewRest: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null
    },
  },
  extraReducers: {
    [createProductReview.pending]: (state) => {
      state.loading = true;
    },
    [createProductReview.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [createProductReview.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { productReviewRest } = productCreateReviewSlice.actions;

export const productDetails = productDetailsSlice.reducer;
export const productCreateReview = productCreateReviewSlice.reducer;
