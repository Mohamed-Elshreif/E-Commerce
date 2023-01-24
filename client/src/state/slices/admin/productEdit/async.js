import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../../utilites/errorhandlers";
import { config } from "../../utilites/configHeader";

const API =process.env.REACT_APP_API_URL


export const deleteProduct = createAsyncThunk(
  "productDetails/deleteProduct",
  async ({ id }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const data = await axios.delete(
        `${API}/api/products/${id}`,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const updateProduct = createAsyncThunk(
  "productDetails/updateProduct",
  async ({ product }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.put(
        `${API}/api/products/${product._id}`,
        product,
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const createProduct = createAsyncThunk(
  "productDetails/createProduct",
  async ({ product }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const token = userInfo && userInfo.token;
      const { data } = await axios.post(
        `${API}/api/products`,
        { product },
        config(token)
      );
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);
