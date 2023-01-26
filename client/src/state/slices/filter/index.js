import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categories: [],
    brands: [],
    sizes: [],
    searchTerm: "",
    priceMax: null,
    priceMin: null
  },
  reducers: {
    addSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    removeSearchTerm: (state) => {
      state.searchTerm = '';
    },
    addRangePrice: (state, { payload }) => {
      state.priceMax = payload.priceMax;
      state.priceMin = payload.priceMin;
    },
    removeRangePrice: (state, { payload }) => {
        payload === "min" ? state.priceMin = null : state.priceMax = null;
    },
    addCategories: (state, { payload }) => {
      state.categories.indexOf(payload) && state.categories.push(payload)
    },
    removeCategory: (state, { payload }) => {
      state.categories = state.categories.filter((category) => category !== payload);
    },
    addSize: (state, { payload }) => {
      state.sizes = payload;
    },
    removeSize: (state) => {
      state.sizes = []
    },
    addBrands: (state, { payload }) => {
      state.brands.indexOf(payload) && state.brands.push(payload);
    },
    removeBrand: (state, { payload }) => {
      state.brands = state.brands.filter((brand) => brand !== payload);
    },
    filterClearAll: (state) => {
      state.searchTerm = '';
      state.categories = [];
      state.brands = [];
      state.sizes = [];
      state.priceMax = null;
      state.priceMin = null;
    },
  },
});

export const {
  addSearchTerm,
  removeSearchTerm,
  addRangePrice,
  removeRangePrice,
  addCategories,
  removeCategory,
  addSize,
  removeSize,
  addBrands,
  removeBrand,
  filterClearAll,
} = filterSlice.actions;
export default filterSlice.reducer;
