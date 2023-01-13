import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categories: [],
    brands: [],
    sizes: [],
    searchTerm: "",
  },
  reducer: {
    addSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    removeSearchTerm: (state) => {
      state = _omit(state, "searchTerm");
    },
    addRangePrice: (state, { payload }) => {
      state.priceMax = payload.priceMax;
      state.priceMin = payload.priceMin;
    },
    removeRangePrice: (state, { payload }) => {
      state =
        payload === "min"
          ? _omit(state, ["priceMin"])
          : _omit(state, ["priceMax"]);
    },
    addCategories: (state, { payload }) => {
      state.categories.indexOf(payload) < 0
        ? state.categories.push(payload)
        : state;
    },
    removeCategory: (state, { payload }) => {
      state.categories.filter((category) => category !== payload);
    },
    addSize: (state, { payload }) => {
      state.size = payload;
    },
    removeSize: (state) => {
      _omit(state, "size");
    },
    addBrands: (state, { payload }) => {
      state.brands.indexOf(payload) < 0 ? state.brands.push(payload) : state;
    },
    removeBrand: (state, { payload }) => {
      state.brands.filter((brand) => brand !== payload);
    },
    filterClearAll: (state) => {
      state = {};
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
export default cartSlice.reducer;
