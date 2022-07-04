import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BsFillPlusCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { ImCross } from "react-icons/im";
import CardContainerCMS from "../../components/CardContainerCMS";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const CMSSearchedDashboard = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div>
      <h1 className="text-4xl font-bold py-2">Search Results</h1>
      <div className="flex py-2">
        <button
          className="flex flex-col text-2xl font-semibold p-3 hover:text-midColor"
          onClick={() => navigate("/cms/")}
        >
          <BsFillArrowLeftCircleFill className="text-2xl" />
        </button>
        <h2 className="flex flex-col text-lg font-semibold py-2">
          Your Products
        </h2>
      </div>
      <hr />
      <div className="p-3">
        <div className="flex flex-wrap space-x-2 p-3 rounded w-fit">
          <button
            className={` ${
              query === "parts"
                ? "bg-midColor text-darkColor hover:bg-darkColor hover:text-lightColor"
                : "hover:bg-midColor hover:text-darkColor bg-darkColor text-lightColor"
            } w-36 p-2 text-lg rounded-md font-semibold`}
            onClick={() => {
              query === "parts"
                ? navigate(`/cms/dashboard`)
                : navigate(`/cms/dashboard/parts`);
            }}
          >
            Parts
          </button>

          <button
            className={` ${
              query === "apparels"
                ? "bg-midColor text-darkColor hover:bg-darkColor hover:text-lightColor"
                : "hover:bg-midColor hover:text-darkColor bg-darkColor text-lightColor"
            } w-36 p-2 text-lg rounded-md font-semibold`}
            onClick={() => {
              query === "apparels"
                ? navigate(`/cms/dashboard`)
                : navigate(`/cms/dashboard/apparels`);
            }}
          >
            Apparels
          </button>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" &&
        status === "data" &&
        (query === "parts" || query === "apparels") ? (
          <CardContainerCMS
            data={data.filter((product) => product.category.includes(query))}
          />
        ) : action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerCMS
            data={data.filter((product) =>
              product.name.toLowerCase().includes(query.toLowerCase())
            )}
          />
        ) : (
          "loading"
        )}
      </div>
      {/* <div align="right">
        <button onClick={() => navigate("/cms/add")}>
          <BsFillPlusCircleFill size={50} className="text-darkColor" />
        </button>
      </div> */}
    </div>
  );
};

export default CMSSearchedDashboard;
