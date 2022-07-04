import React from "react";
import AfterLoginRoutes from "../Routes/AfterLoginRoutes";
import HeaderUser from "./HeaderUser";
import Footer from "./Footer";

const ShoppingCart = () => {
  return (
    <div className="flex">
      <main className="w-full h-full">
        <div className="sticky top-0 z-[2]">
          <HeaderUser />
        </div>
        <div className="sticky z-[1]  ">
          <AfterLoginRoutes />
        </div>
        <div className="sticky bottom-0 z-[2]">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;
