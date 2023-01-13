// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import {
  AuthTokenSlice,
  userDetailsSlice,
  updateProfileSlice,
  registerSlice,
  productsSlice,
  productDetails,
  productCreateReview,
  createOrders,
  orderPay,
  orderDetails,
  UserOrders,
  deleteProductS,
  updateProductS,
  createProductS,
  cartSlice,
  authSlice,
  allOrders,
  orderDeliver,
  deleteUserSlice,
  usersListSlice,
  updateUsersSlice,
} from "./slices/index";

export const storeToolkit = configureStore({
  reducer: {
    productList: productsSlice,
    productDetails: productDetails,
    productCreate: createProductS, // for admin user only
    productDelete: deleteProductS, // for admin user only
    productUpdate: updateProductS, // for admin user only
    productCreateReview: productCreateReview,
    cart: cartSlice,
    userLogin: authSlice,
    userRegister: registerSlice,
    userDetails: userDetailsSlice,
    userUpdateProfile: updateProfileSlice,
    userAuthToken: AuthTokenSlice,
    userList: usersListSlice, // for admin user only
    userDelete: deleteUserSlice, // for admin user only
    userUpdate: updateUsersSlice, // for admin user only
    order: createOrders,
    orderDetails: orderDetails,
    orderPay: orderPay,
    myOrders: UserOrders,
    allOrders: allOrders, // for admin user only
    orderDeliver: orderDeliver, // for admin user only
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default storeToolkit;
