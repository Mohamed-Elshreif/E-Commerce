import { createSlice } from "@reduxjs/toolkit";
import { deleteProduct, updateProduct, createProduct } from "./async";

const deleteProductsSlice = createSlice({
  name: " deleteProduct",
  initialState: { loading: false, success: false, error: null },
  extraReducers: {
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const updateProductSlice = createSlice({
  name: " updateProduct",
  initialState: { loading: false, success: false, product: {}, error: null },
  reducers: {
    updateProductRest: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.product = {};    },
  },
  extraReducers: {
    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const createProductSlice = createSlice({
  name: " createProduct",
  initialState: { loading: false, success: false, product: {}, error: null },
  reducers: {
    createProductRest: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.product = {};
    },
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createProductRest } = createProductSlice.actions;
export const { updateProductRest } = updateProductSlice.actions;

export const deleteProductS = deleteProductsSlice.reducer;
export const updateProductS = updateProductSlice.reducer;
export const createProductS = createProductSlice.reducer;
