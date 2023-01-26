import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layout/Auth";
import RootLayout from "../Layout/Root";
import {
  Home,
  Product,
  Cart,
  Login,
  Register,
  Profile,
  Shipping,
  Payment,
  PlaceOrder,
  Order,
  UsersList,
  UserEdit,
  ProductsList,
  ProductEdit,
  ProductCreate,
  Shop,
  OrderList,
  NotFound
} from "../screens";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "search", element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "shipping", element: <Shipping /> },
      { path: "payment", element: <Payment /> },
      { path: "placeorder", element: <PlaceOrder /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:id", element: <Product /> },
      { path: "order/:id", element: <Order /> },
      { path: "cart/:id?", element: <Cart /> },
      {
        path: "admin",
        children: [
          {
            path: "orderlist",
            element: <OrderList />,
          },
          {
            path: "productlist",
            element: <ProductsList />,
          },
          {
            path: "userlist",
            element: <UsersList />,
          },
          {
            path: "product",
            children: [
              { path: "create", element: <ProductCreate /> },
              { path: ":id", element: <ProductEdit /> },
            ],
          },
          {
            path: "user/:id",
            element: <UserEdit />,
          }
         
        ],
      },
      {
        path: "*",
        element: <NotFound/>
      }
    ],
  },
  
]);
