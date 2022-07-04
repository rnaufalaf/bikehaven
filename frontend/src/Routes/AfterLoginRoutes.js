import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  SearchedHomePage,
  EditProfile,
  ProfileUser,
  ProductDetailsUser,
  ShoppingCartPage,
  OrdersPage,
  FilteredOrdersPage,
  OrderDetailsPage,
} from "../pages/User";

function AfterLoginRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/home/:query" element={<SearchedHomePage />}></Route>
      <Route path="/edit" element={<EditProfile />}></Route>
      <Route path="/profile" element={<ProfileUser />}></Route>
      <Route path="/details/:id" element={<ProductDetailsUser />}></Route>
      <Route
        path="/cart"
        element={<ShoppingCartPage></ShoppingCartPage>}
      ></Route>
      <Route path="/orders" element={<OrdersPage />}></Route>
      <Route path="/orders/:query" element={<FilteredOrdersPage />}></Route>
      <Route path="/orderDetail/:id" element={<OrderDetailsPage />}></Route>
    </Routes>
  );
}

export default AfterLoginRoutes;
