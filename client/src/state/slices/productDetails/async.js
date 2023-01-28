import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";
import { config } from "../utilites/configHeader";
const API =process.env.REACT_APP_API_URL

export const listProductDetails = createAsyncThunk(
  "productDetails/listProductDetails",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { id } = arg;
      const { data } = await axios.get(`${API}/api/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const createProductReview = createAsyncThunk(
  "productCreateReview/createProductReview",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { productId, review } = arg;
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const data = await axios.post(
        `${API}/api/products/${productId}/reviews`,
        review,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);
