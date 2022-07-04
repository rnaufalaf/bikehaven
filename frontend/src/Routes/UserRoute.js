import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainComponentUser from "../components/MainComponentUser";
import { CheckoutPage } from "../pages/User";

const UserRoute = () => {
  return (
    // <div class="container mx-auto">
    <Routes>
      <Route path="/" element={<Navigate replace to="/user/home" />} />
      <Route path="/*" element={<MainComponentUser />}></Route>
      <Route path="/checkout/:id" element={<CheckoutPage />}></Route>
    </Routes>
    // </div>
  );
};

export default UserRoute;
