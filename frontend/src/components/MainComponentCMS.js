import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CMSRoute from "../Routes/CMSRoute";
import HeaderCMS from "../components/HeaderCMS";
import Footer from "../components/Footer";

function SideBarCMS() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("type") === "user"
    ) {
      navigate("/user/home");
    } else if (
      !localStorage.getItem("access_token") ||
      localStorage.getItem("type") !== "cms"
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <main className="mx-auto w-full">
        <div className="sticky top-0 z-[2]">
          <HeaderCMS />
        </div>
        <div className="container mx-auto">
          <CMSRoute />
        </div>
        <div className="sticky bottom-0 z-[2]">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default SideBarCMS;
