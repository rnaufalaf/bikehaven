import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import CardContainerCMS from "../../components/CardContainerCMS";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const CMSDashboard = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [query, setQuery] = useState("");
  const [queryDone, setQueryDone] = useState(false);

  useEffect(() => {
    navigate(`/cms/dashboard/${query}`);
  }, [queryDone]);

  return (
    <div className="pt-4">
      <h1 className="text-4xl font-bold">Welcome, Admin!</h1>
      <div className="flex py-2">
        <h2 className="flex flex-col text-lg font-semibold py-2">
          Your Products
        </h2>
      </div>
      <hr />
      <div className="p-3">
        <div className="flex flex-wrap space-x-2 p-3 rounded w-fit">
          <button
            className="hover:bg-midColor hover:text-darkColor w-36 p-2 text-lg rounded-md bg-darkColor text-lightColor font-semibold"
            onClick={() => {
              navigate(`/cms/dashboard/parts`);
            }}
          >
            Parts
          </button>

          <button
            className="hover:bg-midColor hover:text-darkColor w-36 p-2 text-lg rounded-md bg-darkColor text-lightColor font-semibold"
            onClick={() => {
              navigate(`/cms/dashboard/apparels`);
            }}
          >
            Apparels
          </button>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerCMS data={data} />
        ) : (
          "loading"
        )}
      </div>
      <div align="right" className="sticky bottom-4 z-[1]">
        <button onClick={() => navigate("/cms/add")}>
          <BsFillPlusCircleFill
            size={50}
            className="text-darkColor hover:text-midColor"
          />
        </button>
      </div>
    </div>
  );
};

export default CMSDashboard;
