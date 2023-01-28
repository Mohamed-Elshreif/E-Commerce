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
  NotFound,
  ErrorPage
} from "../screens";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage/>
      },
      {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage/>
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage/>
      },
      { path: "search", element: <Home />,errorElement: <ErrorPage/> },
      { path: "profile", element: <Profile />,errorElement: <ErrorPage/> },
      { path: "shipping", element: <Shipping />,errorElement: <ErrorPage/> },
      { path: "payment", element: <Payment />,errorElement: <ErrorPage/> },
      { path: "placeorder", element: <PlaceOrder />,errorElement: <ErrorPage/> },
      { path: "shop", element: <Shop />,errorElement: <ErrorPage/> },
      { path: "product/:id", element: <Product />,errorElement: <ErrorPage/> },
      { path: "order/:id", element: <Order />,errorElement: <ErrorPage/> },
      { path: "cart/:id?", element: <Cart />,errorElement: <ErrorPage/> },
      {
        path: "admin",
        children: [
          {
            path: "orderlist",
            element: <OrderList />,
            errorElement: <ErrorPage/>
          },
          {
            path: "productlist",
            element: <ProductsList />,
            errorElement: <ErrorPage/>
          },
          {
            path: "userlist",
            element: <UsersList />,
            errorElement: <ErrorPage/>
          },
          {
            path: "product",
            children: [
              { path: "create", element: <ProductCreate />,errorElement: <ErrorPage/> },
              { path: ":id", element: <ProductEdit />,errorElement: <ErrorPage/> },
            ],
          },
          {
            path: "user/:id",
            element: <UserEdit />,
            errorElement: <ErrorPage/>
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
