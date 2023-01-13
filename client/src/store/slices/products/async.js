import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { keyword = "", pageNumber = "", option = "" } = arg;
      const { data } = await axios.get(
        `${API}/api/products?keyword=${keyword}&pageNumber=${pageNumber}&option=${option}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const listTop = createAsyncThunk(
  "products/listTopProducts",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { pageNumber = "", perPage = "" } = arg;
      const { data } = await axios.get(
        `${API}/api/products/top?pageNumber=${pageNumber}&perPage=${perPage}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const listLatest = createAsyncThunk(
  "products/listLatestProducts",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { pageNumber = "" } = arg;
      const { data } = await axios.get(
        `${API}/api/products/latest?pageNumber=${pageNumber}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const listSale = createAsyncThunk(
  "products/getProducts",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { pageNumber = "" } = arg;
      const { data } = await axios.get(
        `${API}/api/products/sale?pageNumber=${pageNumber}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const listRelated = createAsyncThunk(
  "products/listRelatedProducts",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { category } = arg;
      const { data } = await axios.get(
        `${API}/api/products/related?category=${category}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const listSortByPrice = createAsyncThunk(
  "products/listSortByPriceProducts",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { sortBy, pageNumber = "" } = arg;
      const { data } = await axios.get(
        `${API}/api/products/price?sortBy=${sortBy}&pageNumber=${pageNumber}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

const listShopFunction = async (
  type,
  pageNumber,
  keyword,
  getState,
  dispatch
) => {
  let payload = {};
  let error = null;
  if (keyword) {
    await dispatch(listProducts(keyword, pageNumber));
    payload = getState().productList;
    error = getState().productList.error;
  } else {
    switch (type) {
      case "default":
        await dispatch(listProducts("", pageNumber));
        payload = getState().productList;
        error = getState().productList.error;
        break;
      case "latest":
        await dispatch(listLatestProducts(pageNumber));
        payload = getState().productLatest;
        error = getState().productLatest.error;
        break;
      case "rating":
        await dispatch(listTopProducts(pageNumber));
        payload = getState().productTopRated;
        error = getState().productTopRated.error;
        break;
      case "sale":
        await dispatch(listSaleProducts(pageNumber));
        payload = getState().productSale;
        error = getState().productSale.error;
        break;
      case "priceAsc":
        await dispatch(listSortByPriceProducts("asc", pageNumber));
        payload = getState().productSortByPrice;
        error = getState().productSortByPrice.error;
        break;
      case "priceDesc":
        await dispatch(listSortByPriceProducts("desc", pageNumber));
        payload = getState().productSortByPrice;
        error = getState().productSortByPrice.error;
        break;
      default:
        break;
    }
  }
  return { payload, error };
};

export const listShop = createAsyncThunk(
  "products/listShopProduct",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      const { type, pageNumber, keyword } = arg;
      return listShopFunction(type, pageNumber, keyword, getState, dispatch);
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const filterListShop = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      let filteredProducts = [];
      const filter = getState().filter;
      let { products } = getState().productShop;
      const { categories, brands, size, priceMax, priceMin } = filter;
      products = products.map((p) => ({
        ...p,
        priceSale: p.price * (1 - p.sale / 100),
      }));

      if (
        !categories.length &&
        !brands.length &&
        !size &&
        !priceMax &&
        !priceMin
      ) {
        return null;
      }
      if (priceMax && priceMin) {
        filteredProducts = products.filter(
          (p) => p.priceSale >= priceMin && p.priceSale <= priceMax
        );
      } else if (priceMax) {
        filteredProducts = products.filter((p) => p.priceSale <= priceMax);
      } else if (priceMin) {
        filteredProducts = products.filter((p) => p.priceSale >= priceMin);
      }
      if (categories.length) {
        filteredProducts = products.filter(
          (p) => categories.indexOf(p.category) >= 0
        );
      }
      if (size) {
        filteredProducts = products.filter((p) => {
          const availableSizes = Object.keys(p.size).filter(
            (sizeItem) => p.size[sizeItem] > 0
          );
          return availableSizes.indexOf(size) >= 0;
        });
      }
      if (brands.length) {
        filteredProducts = products.filter((p) => brands.indexOf(p.brand) >= 0);
      }
      return filteredProducts;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);
