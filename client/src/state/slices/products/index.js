import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  listTop,
  listLatest,
  listSale,
  listRelated,
  listSortByPrice,
  listShop,
  filterListShop,
} from "./async";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      const { products, page, pages, count } = payload;
      state.loading = false;
      state.products = products;
      state.page = page;
      state.pages = pages;
      state.count = count;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const TopRatedSlice = createSlice({
  name: "productsTopRated",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  extraReducers: {
    [listTop.pending]: (state) => {
      state.loading = true;
    },
    [listTop.fulfilled]: (state, { payload }) => {
      const { products, page, pages, count } = payload;
      state.loading = false;
      state.products = products;
      state.page = page;
      state.pages = pages;
      state.count = count;
    },
    [listTop.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const LatestSlice = createSlice({
  name: "productsLatest",
  initialState: {
    loading: false,
    products: [],
    error: null,
    count: null,
  },
  extraReducers: {
    [listLatest.pending]: (state) => {
      state.loading = true;
    },
    [listLatest.fulfilled]: (state, { payload }) => {
      const { products, page, pages, count } = payload;
      state.loading = false;
      state.products = products;
      state.page = page;
      state.pages = pages;
      state.count = count;
    },
    [listLatest.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const productSaleSlice = createSlice({
  name: "productSale",
  initialState: {
    loading: false,
    products: [],
    error: null,
    count: null,
  },
  extraReducers: {
    [listSale.pending]: (state) => {
      state.loading = true;
    },
    [listSale.fulfilled]: (state, { payload }) => {
      const { products, page, pages, count } = payload;
      state.loading = false;
      state.products = products;
      state.page = page;
      state.pages = pages;
      state.count = count;
    },
    [listSale.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const relatedSlice = createSlice({
  name: "productsRelated",
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  extraReducers: {
    [listRelated.pending]: (state) => {
      state.loading = true;
    },
    [listRelated.fulfilled]: (state, { payload }) => {
      const { products, page, pages } = payload;
      state.loading = false;
      state.products = products;
      state.page = page;
      state.pages = pages;
    },
    [listRelated.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const SortByPriceSlice = createSlice({
  name: "SortByPrice",
  initialState: {
    loading: false,
    products: [],
    error: null,
    count: null,
  },
  extraReducers: {
    [listSortByPrice.pending]: (state) => {
      state.loading = true;
    },
    [listSortByPrice.fulfilled]: (state, { payload }) => {
      const { products, page, pages, count } = payload;
      state.loading = false;
      state.products = products;
      state.page = page;
      state.pages = pages;
      state.count = count;
    },
    [listSortByPrice.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const productShopSlice = createSlice({
  name: "productShop",
  initialState: {
    loading: false,
    products: [],
    tempProducts: [],
    page: 1,
    pages: 1,
    error: null,
    count: null,
  },
  extraReducers: {
    [listShop.pending]: (state) => {
      state.loading = true;
    },
    [listShop.fulfilled]: (state, { payload }) => {
      const { page, pages, products, count } = payload.data;
      state.loading = false;
      state.products = products;
      state.page = page;
      state.pages = pages;
      state.count = count;
      state.tempProducts = products;
    },
    [listShop.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
    [filterListShop.pending]: (state) => {
      state.loading = true;
    },
    [filterListShop.fulfilled]: (state, { payload }) => {
      state.loading = false;
      payload ? (state.products = payload) : (state.products =  state.tempProducts );
    },
    [filterListShop.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const products = productsSlice.reducer;
export const TopRated = TopRatedSlice.reducer;
export const Latest = LatestSlice.reducer;
export const productSale = productSaleSlice.reducer;
export const related = relatedSlice.reducer;
export const SortByPrice = SortByPriceSlice.reducer;
export const productShop = productShopSlice.reducer;
