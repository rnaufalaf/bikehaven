import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarouselComponent from "../../components/CarouselComponent";
import CardContainerUser from "../../components/CardContainerUser";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const SearchedHomePage = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="mx-auto md:container">
      <div className="py-3">
        <CarouselComponent />
      </div>
      <div>
        <div>
          <h1 className="font-bold text-xl mt-3">Search Results</h1>
        </div>
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
                  ? navigate(`/user/home`)
                  : navigate(`/user/home/parts`);
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
                  ? navigate(`/user/home`)
                  : navigate(`/user/home/apparels`);
              }}
            >
              Apparels
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" &&
        status === "data" &&
        (query === "parts" || query === "apparels") ? (
          <CardContainerUser
            data={data.filter((product) => product.category.includes(query))}
          />
        ) : action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerUser
            data={data.filter((product) =>
              product.name.toLowerCase().includes(query.toLowerCase())
            )}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default SearchedHomePage;
