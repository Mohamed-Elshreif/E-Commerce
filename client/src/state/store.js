import { configureStore } from "@reduxjs/toolkit";
import {
  AuthTokenSlice,
  userDetailsSlice,
  updateProfileSlice,
  registerSlice,
  productDetails,
  productCreateReview,
  createOrders,
  orderPay,
  orderDetails,
  UserOrders,
  deleteProductS,
  updateProductS,
  createProductS,
  cart,
  authSlice,
  allOrders,
  orderDeliver,
  deleteUserSlice,
  usersListSlice,
  updateUsersSlice,
  products,
  TopRated,
  Latest,
  productSale,
  related,
  cartDrawer,
  SortByPrice,
  snackBar,
  productShop,
  filter,
  theme
} from "./slices/index";

const storeToolkit = configureStore({
  reducer: {
    productList: products,
    productDetails: productDetails,
    productCreate: createProductS, // for admin user only
    productDelete: deleteProductS, // for admin user only
    productUpdate: updateProductS, // for admin user only
    productReviewCreate: productCreateReview,
    cart: cart,
    userLogin: authSlice,
    userRegister: registerSlice,
    userDetails: userDetailsSlice,
    userUpdateProfile: updateProfileSlice,
    userAuthToken: AuthTokenSlice,
    userList: usersListSlice, // for admin user only
    userDelete: deleteUserSlice, // for admin user only
    userUpdate: updateUsersSlice, // for admin user only
    orderCreate: createOrders,
    orderDetails: orderDetails,
    orderPay: orderPay,
    orderListMy: UserOrders,
    orderList: allOrders, // for admin user only
    orderDeliver: orderDeliver, // for admin user only
    productTopRated: TopRated,
    productLatest: Latest,
    productSale: productSale,
    productRelated: related,
    productSortByPrice: SortByPrice,
    productShop: productShop,
    cartOpenDrawer: cartDrawer,
    snackbarState: snackBar,
    filter: filter,
    theme:theme
  },
  devTools: process.env.NODE_ENV !== "production",
});
// productShop /
//   productList /
//   productDetails /
//   productDelete /
//   productCreate /
//   productUpdate /
//   productReviewCreate;
// productTopRated;
// productLatest;
// productSale;
// productRelated;
// productSortByPrice / cart;
// cartOpenDrawer /
//   userLogin /
//   userRegister /
//   userDetails /
//   userUpdateProfile /
//   userList /
//   userDelete /
//   userUpdate /
//   orderCreate /
//   orderDetails /
//   orderPay /
//   orderDeliver /
//   orderListMy /
//   orderList;
// snackbarState;
// filter;
export default storeToolkit;
