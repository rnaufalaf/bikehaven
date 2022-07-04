import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import CMSRoute from "../Routes/CMSRoute";
import HeaderCMS from "../components/HeaderCMS";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

function SideBarCMS() {
  const [showDashboard, setShowDashboard] = useState(false);
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
