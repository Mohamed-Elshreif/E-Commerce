import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { errors } from "../utilites/errorhandlers";

const API =process.env.REACT_APP_API_URL

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { id, qty = 1, size = 'md' } = arg;
      const { data } = await axios.get(`${API}/api/products/${id}`);
      const payload = {
        name: data.name,
        qty: qty,
        sizeSelected: size,
        size: data.size,
        images: data.images,
        price: data.price,
        sale: data.sale,
        priceSale: data.price * (1 - data.sale / 100),
        product: data._id,
        countInStock: data.countInStock,
      };
      const pervState = getState().cart.cartItems
    
      localStorage.setItem(
        "cartItems",
        JSON.stringify(pervState)
      );
      return payload;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (arg, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { id } = arg;
      // Adding to localStorage after removing particular product
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
      return id;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

///   SAVE SHIPPING ADDRESS   ///
export const addShippingAddress = createAsyncThunk(
  "cart/addShippingAddress",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      localStorage.setItem("shippingAddress", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

///   SAVE PAYMENT METHOD   ///
export const addPaymentMethod = createAsyncThunk(
  "cart/addPaymentMethod",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      localStorage.setItem("paymentMethod", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(errors(error));
    }
  }
);

///   RESET CART ITEMS   ///
export const emptyCart = () => {
  try {
    localStorage.removeItem("cartItems");
    return;
  } catch (error) {
    return errors(error);
  }
};

export const setOpenCartDrawer = (isOpen) => {
  return isOpen;
};
